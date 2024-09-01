import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleModalAlert } from '../../store/slices/pageSlice'
import { CgClose } from 'react-icons/cg'

const ModalAlert = ({children, title}) => {
    const dispatch=useDispatch()
  return (
    <div onClick={(e)=>{
        if(e.target.classList.contains("fixed")){
            dispatch(toggleModalAlert())
        }
    }} className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex items-center justify-center '>
       <div className="p-[10px] rounded-md bg-white shadow-md w-[400px] ">
            <div className="flex justify-between ">
                <span className="text-[18px] font-semibold">{title}</span>
                <button onClick={()=>dispatch(toggleModalAlert())} className="p-[5px] rounded-md hover:bg-gray-100 text-[20px] cursor-pointer active:scale-95"><CgClose /></button>
            </div>
            <div className="">{children}</div>
        </div>
    </div>
  )
}

export default ModalAlert