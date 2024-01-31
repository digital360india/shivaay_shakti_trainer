import axios from 'axios';
import React from 'react'
import Popup from 'reactjs-popup';

function RemarksPopup({data,setToggle1,value}) {
// console.log(data);
    async function handleremarks()
    {
        setToggle1({...data,message:"loading"});
        if(data?.remarks!="")
        {
            try{
                // const response=await axios.get("https://shivaay-shakti-backend-1.onrender.com/api/purchase/trainer",{ headers:{
                const response=await axios.put(`http://localhost:5000/api/purchase/remarks/${value?._id}`,{
                    remarks:data?.remarks},{ headers:{
                  Authorization:localStorage.getItem('jwt')
                }});
                console.log(response)
                if(response.status===200)
                 setToggle1({...data,message:"",toggle1:false,index:null,remarks:""});
                  }
                  catch(e)
                  {
                    console.log(e)
                    setToggle1({...data,message:"server error"});
              console.log(e);
                  }
        }
        else{
            setToggle1({...data,message:"*Enter Remarks"}); 
        }
    
    }
  return (
    <>
    <Popup
     open={data?.toggle1}
     closeOnDocumentClick={false}
     closeOnEscape={false}
     contentStyle={{
       width: "40vw",
       height: "45vh",
       overflow: "hidden",
       padding: "30px",
       backdropFilter: "blur(5px)",
       backgroundColor: "gray",
       position:"relative"
     }}
     position="center center"
   >
    <button onClick={()=>setToggle1({...data,toggle1:false})} className=' text-xl font-bold absolute top-5 right-10'>X</button>
<div className='space-x-5'>
    <span className=' underline text-2xl font-bold'>Add Remarks</span>
    <div className='flex flex-col mt-5  gap-y-5'>
   <div  >
    <div className='flex  gap-6'>
   <label className=' text-xl' htmlFor="">Remarks</label>
   <textarea rows={4} value={data?.remarks} onChange={(e)=>{setToggle1({...data,remarks:e.target.value})}} type="text" className=' p-2 border border-black flex-1'/>
   </div>
   <div className=' flex justify-center mt-3'>
   <button onClick={handleremarks} className=' hover:text-blue-700 underline  font-bold ' >Add</button>
   </div></div>
   </div>
   <div className='font-bold text-center mt-5 text-red-800'>
   {data?.message}
   </div>
   </div>


   </Popup>
    </>
  )
}

export default RemarksPopup
