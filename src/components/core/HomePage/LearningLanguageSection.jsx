import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import daylogo from "../../../assets/Images/daylogo.jpg"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
    return (
        <div className='mt-[100px] mb-16'>
            <div className='flex flex-col gap-5 items-center'>

                <div className='text-4xl font-semibold text-center'>
                    Your Swiss Knife For
                    <HighlightText text={" Managing Any Task"} />
                </div>

                <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                    Making Managing Multiple Tasks Easy With Community Support, Progress Tracking And More
                </div>

                <div className='flex flex-row items-center justify-center'>
                    <img
                        src={know_your_progress}
                        alt="KnowYourProgressImage"
                        className='object-contain -mr-32 '
                    />
                    <img width={400}
                        src={daylogo}
                        alt="KnowYourProgressImage"
                        className='object-contain'
                    />
                    <img
                        src={plan_your_lesson}
                        alt="KnowYourProgressImage"
                        className='object-contain -ml-36'
                    />
                </div>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn More
                        </div>
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default LearningLanguageSection
