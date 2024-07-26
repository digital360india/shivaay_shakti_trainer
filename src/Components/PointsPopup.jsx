import axios from 'axios';
import React from 'react'
import Popup from 'reactjs-popup';
import { format } from 'date-fns'

function PointsPopup({data,setToggle2,value}) {
  
// console.log(data);
    async function handlepoints()
    {
        setToggle2({...data,message:"loading"});
        if(data?.point!="")
        {
          console.log(value?._id)
            try{
                // const response=await axios.put(`https://shivaay-shakti-backend-1.onrender.com/api/purchase/points/${value?._id}`,
                const response=await axios.put(`https://shivaay-shakti-backend-vm3k.onrender.com/api/purchase/points/${value?._id}`,
                {date1:"2024-01-13",point:parseInt(data?.point)},{ headers:{
                  Authorization:localStorage.getItem('jwt')
                }});
                console.log(response)
                if(response.status===200)
                { setToggle2({...data,message:"",toggle2:false,index:null,point:0});
                  }
                 }
                  catch(e)
                  {
                    console.log(e)
                     if(e?.response?.status===400)
                    {
                      setToggle2({...data,message:"Already Submitted"});
                    }
                    else
                    setToggle2({...data,message:"server error"});
              console.log(e);
                  }
        }
        else{
            setToggle2({...data,message:"*Select Points"}); 
        }
    
    }
  return (
    <>
    <Popup
     open={data?.toggle2}
     closeOnDocumentClick={false}
     closeOnEscape={false}
     contentStyle={{
       width: "20vw",
       height: "30vh",
       overflow: "hidden",
       padding: "30px",
       backdropFilter: "blur(5px)",
       backgroundColor: "gray",
       position:"relative"
     }}
     position="center center"
   >
    <button onClick={()=>setToggle2({...data,toggle2:false})} className=' text-xl font-bold absolute top-5 right-10'>X</button>
<div className='space-x-5'>
    <span className=' underline text-2xl font-bold'>Add Points</span>
    <div className='flex flex-col mt-5  gap-y-5'>
   <div  >
    <div className='flex  gap-6'>
   <label className=' text-xl' htmlFor="">{format(new Date(),'yyyy-MM-dd')} </label>
   <select  value={data?.point} onChange={(e)=>{setToggle2({...data,point:parseInt(e.target.value)})}}>
    <option value="">select</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
   </select>
   </div>
   <div className=' flex justify-center mt-5'>
   <button onClick={handlepoints} className=' hover:text-blue-700 underline  font-bold ' >Add</button>
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

export default PointsPopup
