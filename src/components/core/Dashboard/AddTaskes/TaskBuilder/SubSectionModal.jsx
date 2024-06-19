import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/taskDetailsAPI"
import { setTask } from "../../../../../slices/TaskSlice"
import IconBtn from "../../../../common/IconBtn"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { task } = useSelector((state) => state.task)
  const durations = ["1 min", "5 min", "10 min", "15 min", "30 min", "1 hr", "2 hr", "3 hr", "5 hr", "10 hr"]

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureDuration", modalData.timeDuration)
    }
  }, [])

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureDuration !== modalData.timeDuration
    ) {
      return true
    }
    return false
  }

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureDuration !== modalData.timeDuration) {
      formData.append("timeDuration", currentValues.lectureDuration)
    }
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      // update the structure of task
      const updatedTaskContent = task.taskContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedTask = { ...task, taskContent: updatedTaskContent }
      dispatch(setTask(updatedTask))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No Changes Made To The Form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("timeDuration", data.lectureDuration)
    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of task
      const updatedTaskContent = task.taskContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedTask = { ...task, taskContent: updatedTaskContent }
      dispatch(setTask(updatedTask))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-10 !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Subsection
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Subsection Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Subsection Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Subsection Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Subsection Title Is Required
              </span>
            )}
          </div>
          {/* Subsection Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Subsection Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Subsection Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Subsection Description Is Required
              </span>
            )}
          </div>
          {/* Subsection Duration */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDuration">
              Subsection Duration{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <select
              disabled={view || loading}
              id="lectureDuration"
              defaultValue=""
              {...register("lectureDuration", { required: true })}
              className="form-style w-full"
            >
              <option value="" disabled>Select A Duration</option>
              {
                !loading && durations.map((duration, index) => (
                  <option key={index} value={duration}>
                    {duration}
                  </option>
                ))
              }

            </select>
            {errors.lectureDuration && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Subsection Duration Is Required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}