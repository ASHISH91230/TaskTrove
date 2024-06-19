import React, { useEffect, useState } from "react"
// Import Swiper React Components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper Styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
// Import Required Modules
import { Navigation, Autoplay } from "swiper"
import Task_Card from "./Task_Card"

function Task_Slider({ Tasks }) {
  return (
    <>
      {Tasks?.length ? (
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className=""
      >
          {Tasks?.map((task, i) => (
            <SwiperSlide key={i}>
              <Task_Card task={task}/>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Task Found</p>
      )}
    </>
  )
}

export default Task_Slider
