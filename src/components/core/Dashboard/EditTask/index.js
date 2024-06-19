import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderSteps from "../AddTaskes/RenderSteps"
import { getFullDetailsOfTask } from "../../../../services/operations/taskDetailsAPI"
import { setEditTask, setTask } from "../../../../slices/TaskSlice"

export default function EditTask() {
  const dispatch = useDispatch()
  const { taskId } = useParams()
  const { task } = useSelector((state) => state.task)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)


  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const result = await getFullDetailsOfTask(taskId, token)
      if (result?.taskDetails) {
        dispatch(setEditTask(true))
        dispatch(setTask(result?.taskDetails))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-500">
        Edit Task
      </h1>
      <div className="mx-auto max-w-[600px]">
        {task ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-300">
            Task Not Found
          </p>
        )}
      </div>
    </div>
  )
}