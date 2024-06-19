import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { FaShareSquare } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function TaskDetailsCard({ task, handleAddTask }) {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link Copied To Clipboard")
  }

  return (
    <>
      <div
        className={`flex flex-col m-2 mr-10 gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        <div className="px-4">
          <div className="flex flex-col">
            <button
              className="mt-2 hover:text-richblack-100 "
              onClick={
                user && task?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-challenges")
                  : handleAddTask
              }
            >
              {user && task?.studentsEnrolled.includes(user?._id)
                ? "Go To Task"
                : "Add Now"}
            </button>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-3 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskDetailsCard