import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"

const SubsectionDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("")
    const [subsectionBarActive, setSubsectionBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const { sectionId, subSectionId } = useParams()
    const {
        taskSectionData,
        taskEntireData,
        totalNoOfSubsections,
        completedSubsections } = useSelector((state) => state.viewTask)

    useEffect(() => {
        const setActiveFlags = () => {
            if (!taskSectionData.length)
                return
            const currentSectionIndex = taskSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = taskSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = taskSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
            setActiveStatus(taskSectionData?.[currentSectionIndex]?._id)
            setSubsectionBarActive(activeSubSectionId)
        }
        setActiveFlags()
    }, [taskSectionData, taskEntireData, location.pathname])

    return (
        <>
            <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
                {/* buttons and headings */}
                <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                    {/* buttons */}
                    <div className="flex w-full items-center justify-between">
                        <div onClick={() => {
                            navigate("/dashboard/enrolled-challenges")
                        }}
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                            title="Back"
                        >
                            <IoIosArrowBack size={30} cursor={`pointer`} />
                        </div>
                        <div>
                            <IconBtn text="Add Review"
                                customClasses="ml-auto"
                                onclick={() => setReviewModal(true)}></IconBtn>
                        </div>
                    </div>
                    {/* heading */}
                    <div className="flex flex-col">
                        <p>{taskEntireData?.taskName}</p>
                        <p className="text-sm font-semibold text-richblack-500">{completedSubsections?.length}/{totalNoOfSubsections}</p>
                    </div>
                </div>
                {/* sections and subsections */}
                <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {
                        taskSectionData.map((section, index) => (
                            <div className="mt-2 cursor-pointer text-sm text-richblack-5"
                                onClick={() => setActiveStatus(section?._id)}
                                key={index}>
                                {/* section */}
                                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                                    <div className="w-[70%] font-semibold">
                                        {section?.sectionName}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`${activeStatus === section?._id
                                                    ? "rotate-180"
                                                    : "rotate-0"
                                                } transition-all duration-500`}
                                        >
                                            <BsChevronDown />
                                        </span>
                                    </div>
                                </div>
                                {/* subsections */}
                                {
                                    activeStatus === section?._id && (
                                        <div className="transition-[height] duration-500 ease-in-out">
                                            {
                                                section.subSection.map((subsection, index) => (
                                                    <div className={`flex gap-3 px-5 py-2 ${subsectionBarActive === subsection._id ? "bg-yellow-200 font-semibold text-richblack-800"
                                                        : "hover:bg-richblack-900"
                                                        }`}
                                                        key={index}
                                                        onClick={() => {
                                                            navigate(`/view-challenge/${taskEntireData?._id}/section/${section?._id}/sub-section/${subsection?._id}`)
                                                            setSubsectionBarActive(subsection?._id)
                                                        }}>
                                                        <input type='checkbox'
                                                            checked={completedSubsections.includes(subsection?._id)}
                                                            onChange={() => { }} />
                                                        <span>
                                                            {subsection.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default SubsectionDetailsSidebar