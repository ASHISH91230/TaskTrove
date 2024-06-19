import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorTaskes } from "../../../services/operations/taskDetailsAPI"
import { getStudentData } from "../../../services/operations/profileAPI"
import StudentChart from "./StudentDashboard/StudentChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [studentData, setStudentData] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const studentApiData = await getStudentData(token)
      const result = await fetchInstructorTaskes(token)
      if (typeof studentApiData !== undefined) setStudentData(studentApiData)
      if (result) {
        setTasks(result.studentTasks)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-300">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200">
          Let's Start Something New
        </p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : tasks.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
            {/* Render chart / graph */}
            <StudentChart tasks={studentData} />
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Tasks</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {tasks.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Completed</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {studentData.completedTasks}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md bg-richblack-800 p-6">
            {/* Render 3 tasks */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Tasks</p>
              <Link to="/dashboard/my-task">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex items-start space-x-6">
              {tasks.slice(0, 3).map((task) => (
                <div key={task._id} className="w-1/3">
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {task.taskName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You Have Not Created Any Task Yet
          </p>
          <Link to="/dashboard/add-task">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create A Task
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}