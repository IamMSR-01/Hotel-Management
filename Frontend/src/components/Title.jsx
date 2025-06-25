import React from 'react'

function Title({ title, subTitle, align, font }) {
  return (
    <div className={`flex flex-col ${align === "left" && "md:items-start md:text-left"} justify-center text-center items-center`}>
        <h1 className={`text-4xl md:text-[40px] ${font}`}>{title}</h1>
        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>{subTitle}</p>
    </div>
  )
}

export default Title