import React from 'react'
import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import TasksTable from './InstructorTasks/TasksTable'
import IconBtn from "../../common/IconBtn"
import { fetchInstructorTaskes } from '../../../services/operations/taskDetailsAPI'
export default function MyTasks() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [taskes, setTaskes] = useState([])
  const [duration, setDuration] = useState([])
  useEffect(() => {
    const fetchTaskes = async () => {
      const result = await fetchInstructorTaskes(token)
      if (result) {
        setTaskes(result.studentTasks)
        setDuration(result.arr)
      }
    }
    fetchTaskes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-500">My Tasks</h1>
        <IconBtn
          text="Add Tasks"
          onclick={() => navigate("/dashboard/add-task")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {taskes && <TasksTable taskes={taskes} setTaskes={setTaskes} duration={duration} setDuration={setDuration} />}
    </div>
  )
}
