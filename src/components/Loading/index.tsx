"use client"
import React, { useEffect, useState } from 'react'

const Loading = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        setTimeout(() =>{
            setCount(count+1)
        },500)
    })

    useEffect(() => {
        if(count >= 4){
            setCount(0)
        }
    }, [count])
  return (
    <div className='absolute z-100 h-[87vh] w-full flex justify-center items-center bg-white/50'>
        <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 border-5 border-top-white border-black animate-spin"/>
         <span className="text-2xl font-bold text-black animate-pulse">
                        Loading{".".repeat(count)}
                    </span>
        </div>
    </div>
  )
}

export default Loading