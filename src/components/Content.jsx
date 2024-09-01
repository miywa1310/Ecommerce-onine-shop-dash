import React from 'react'

const Content = ({children}) => {
  return (
    <div className='shadow-lg border w-full max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] overflow-y-auto rounded-md p-[10px] px-[20px]'>
      {children}
    </div>
  )
}

export default Content