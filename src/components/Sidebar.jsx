import React from 'react'
import logoBlack from '../images/logoBlack.svg'
import { btnData } from '../config/Constants'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[300px] shadow-md h-full gap-[20px] border p-[10px] rounded-md  flex flex-col '>
       <div className="h-[60px] w-full border-b-[1px] border-gray-300 flex items-center justify-center  py-[20px]">
        <img src={logoBlack} alt="" />
       </div> 
        <div className="flex flex-col items-center gap-[10px]">
           {
            btnData.map(item=>(
              <Link key={item.id} to={item.path} className='w-full'>
              <div className="w-full flex gap-[10px] items-center justify-center rounded-md p-[5px] border border-black text-black font-medium text-[18px] hover:bg-gray-100 active:scale-95 ">
                 {item.icon()}
                 <span>{item.title}</span>
              </div>
              </Link>
            ))
           }
        </div>
    </div>
  )
}

export default Sidebar