import React from 'react'

const CustomButton = ({ btnType, title, handleClick, 
  styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] max-h-[0px] px-4 rounded-[10px] mr-4 ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton