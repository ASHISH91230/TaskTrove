import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import  Markdown  from "react-markdown"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import TaskAccordionBar from "../components/core/Task/TaskAccordionBar"
import TaskDetailsCard from "../components/core/Task/TaskDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchTaskDetails,addCategoryTask } from "../services/operations/taskDetailsAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

function TaskDetails() {
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  // Getting taskId from url parameter
  const { taskId } = useParams()

  // Declare a state to save the task details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  useEffect(() => {
    // Calling fetchTaskDetails function to fetch the details
    ;(async () => {
      try {
        const res = await fetchTaskDetails(taskId)
        setResponse(res)
      } catch (error) {
        console.log("Could Not Fetch Task Details")
      }
    })()
  }, [taskId])

  // Calculating Avg Review Count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.taskDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

    // Collapse All
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
  }

  // Total number of subsections
  const [totalNoOfSubsections, setTotalNoOfSubsections] = useState(0)
  useEffect(() => {
    let subsections = 0
    response?.data?.taskDetails?.taskContent?.forEach((sec) => {
      subsections += sec.subSection.length || 0
    })
    setTotalNoOfSubsections(subsections)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const {
    _id:task_id,
    taskName,
    taskDescription,
    whatYouWillLearn,
    taskContent,
    ratingAndReviews,
    studentsEnrolled,
    createdAt,
  } = response.data?.taskDetails

  const handleAddTask =()=>{
    if(token){
        addCategoryTask(task_id,token,navigate)
        return
    }
    setConfirmationModal({
      text1: "You Are Not Logged In!",
      text2: "Please Login To Add Task",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {taskName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{taskDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} review(s))`}</span>
                <span>{`${studentsEnrolled.length} user(s) enrolled`}</span>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
              </div>
            </div>
          </div>
          {/* Tasks Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <TaskDetailsCard
              task={response?.data?.taskDetails}
              handleAddTask={handleAddTask}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-500 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">Benefits Of Task</p>
            <div className="mt-5">
              <Markdown>{whatYouWillLearn}</Markdown>
            </div>
          </div>

          {/* Task Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Task Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {taskContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfSubsections} {`subsection(s)`}
                  </span>
                  <span>{response.data?.totalDuration} Total Length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-300"
                    onClick={() => setIsActive([])}
                  >
                    Collapse All Sections
                  </button>
                </div>
              </div>
            </div>

            {/* Task Details Accordion */}
            <div className="py-4">
              {taskContent?.map((task, index) => (
                <TaskAccordionBar
                  task={task}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default TaskDetails
