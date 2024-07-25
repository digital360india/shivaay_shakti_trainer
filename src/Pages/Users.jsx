import axios from "axios";
import React, { useEffect, useState } from "react";
import RemarksPopup from "../Components/RemarksPopup";
import PointsPopup from "../Components/PointsPopup";
import { format } from "date-fns";
function Users() {
  const [data, setData] = useState({
    data: [],
    index: null,
    toggle1: false,
    toggle2: false,
    message: "",
    remarks: "",
    point: 0,
  });
  async function getdata() {
    try {
      // const response=await axios.get("https://shivaay-shakti-backend-1.onrender.com/api/purchase/trainer",{ headers:{
      const response = await axios.get(
        "http://localhost:5000/api/purchase/trainer",
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response?.data?.data);
      setData({ ...data, data: response?.data?.data });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="  w-[100vw] h-screen overflow-y-auto  pl-[18vw]  pt-[14vh]  ">
      <div className=" w-[80vw]">
        <div className="  ">
          <h1 className="  text-3xl font-semibold underline underline-offset-8  ">
            Personal Active Courses
          </h1>
          <table
            cellPadding={2}
            cellSpacing={2}
            className=" mt-8   text-left w-full   "
          >
            <tr className=" text-2xl border border-black bg-black  text-white p-2  ">
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Course Name</th>
              <th>Timing</th>
              <th>Remarks</th>
              <th>Points</th>
            </tr>
            <div className="mt-4"></div>
            {data?.data?.map((value, i) => (
              <>
                <tr className=" hover:bg-red-600 hover:text-white   text-[20px] font-semibold  border-2 border-black bg-gray-400 ">
                  <th className="   ">{i + 1}.</th>
                  <td className=" capitalize ">{value?.name}</td>
                  <td className=" capitalize ">{value?.course_name}</td>
                  <td className=" capitalize ">{value?.preferred_timing}</td>
                  {/* <td><button onClick={()=>handleremarks(value?._id)} className=' hover:text-blue-700 underline  font-bold ' >Add</button></td> */}
                  <td>
                    <button
                      onClick={() =>
                        setData({ ...data, toggle1: true, index: i })
                      }
                      className=" hover:text-blue-700 underline  font-bold "
                    >
                      Add
                    </button>
                  </td>
                  <td>
                    {value?.days?.filter(
                      (a) => a === format(new Date(), "yyyy-MM-dd")
                    )?.length === 1 ? (
                      <button
                        onClick={() =>
                          setData({ ...data, toggle2: true, index: i })
                        }
                        className=" hover:text-blue-700 underline  font-bold "
                      >
                        Add
                      </button>
                    ) : (
                      ""
                    )}
                    {/* <button
                      onClick={() =>
                        setData({ ...data, toggle2: true, index: i })
                      }
                      className=" hover:text-blue-700 underline  font-bold "
                    >
                      Add
                    </button> */}
                  </td>
                  {data?.index === i && (
                    <RemarksPopup
                      data={data}
                      value={value}
                      setToggle1={setData}
                    />
                  )}
                  {data?.index === i && (
                    <PointsPopup
                      data={data}
                      value={value}
                      setToggle2={setData}
                    />
                  )}
                </tr>
              </>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
