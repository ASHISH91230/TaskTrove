import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponent from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"

const About = () => {
  return (
    <div>
      <section>
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-richblack-200">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Your Daily Companion For
            <HighlightText text={"Success"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Elevate Your Everyday. Task Trove empowers individuals to achieve their goals, one task at a time, through personalised challenges and a supportive community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500 mb-5">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="mt-24 mb-12 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Task Trove was born out of a simple yet profound realisation: the power of small, consistent actions to transform lives. The founders, driven by personal experiences, understood the challenge of staying organized, motivated and connected in a fast-paced world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                We envisioned a tool that not only will help individuals manage their tasks, but also will inspire them to set and achieve goals while fostering a supportive community.
              </p>
            </div>

            <div>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between ">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create a world where everyone has the tool and support they need to achieve their goals and dreams. We believe in the transforming power of daily habits and challenges to create lasting change in individuals' lives.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission is to simplify and enhance the way people manage their tasks,set goals and connect with others. We are commited to providing a user-friendly platform that promotes personal growth accountability,and community support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponent />
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-8 text-richblack-300">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews From Other Users
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default About
