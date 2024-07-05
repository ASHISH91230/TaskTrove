import React from 'react'
import MagnifyingGlass from "../assets/Images/magnifying glass gif.gif"
import CTAButton from "../components/core/HomePage/Button"

const Error = () => {

  return (
    <div className='flex justify-center items-center text-3xl text-richblack-500'>
      <div className='flex flex-col w-[40%]'>
        <div>
          The Page You're Looking For Seems To Be Missing!
        </div>
        <div className='w-[40%] mt-3'>
          <CTAButton active={true} linkto={"/"}>Back Home</CTAButton>
        </div>
      </div>
      <div>
        <img src={MagnifyingGlass} alt="Magnifying Glass" />
      </div>
    </div>
  )
}

export default Error