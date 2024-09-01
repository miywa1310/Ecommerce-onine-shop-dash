import React from 'react'
import { useLocation } from 'react-router-dom'
import { btnData } from '../config/Constants'

const Header = () => {
  const { pathname } = useLocation()
  const headerData = btnData.find(item => item.path == pathname)
  return (
    <div className='shadow-md w-full h-[80px] border flex rounded-md justify-start items-center px-[20px]'>
      <div className=" flex gap-[10px] items-center text-black font-semibold text-[20px] ">
        {headerData.icon()}
        <span>{headerData.title}</span>
      </div>
    </div>
  )
}

export default Header