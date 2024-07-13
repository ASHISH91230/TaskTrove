import React from 'react'
import { useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { formatDate } from '../../../../services/formatDate'

import ConfirmationModal from '../../../common/ConfirmationModal';
import { TASK_STATUS } from '../../../../utils/constants'
import { deleteTask, fetchInstructorTaskes } from '../../../../services/operations/taskDetailsAPI';
export default function TasksTable({ taskes, setTaskes, duration, setDuration }) {

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30
  let c = 0;

  const handleTaskDelete = async (taskId) => {
    setLoading(true);
    await deleteTask({ taskId: taskId }, token)
    const result = await fetchInstructorTaskes(token)
    if (result) {
      setTaskes(result.studentTasks)
      setDuration(result.arr)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-300">
              Tasks
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-300">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-300">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {taskes?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-300">
                No Tasks Found
              </Td>
            </Tr>
          ) : (
            taskes?.map((task) => (
              <Tr
                key={task._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-500">
                      {task.taskName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {task.taskDescription.split(" ").length >
                        TRUNCATE_LENGTH
                        ? task.taskDescription
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                        : task.taskDescription}
                    </p>
                    <p className="text-[12px] text-richblack-300">Created At: {formatDate(task.createdAt)}</p>
                    {task.status === TASK_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </div>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-300">
                  {duration[c++].trim()}
                </Td>
                <Td className="text-sm font-medium text-richblack-300 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-task/${task._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do You Want To Delete This Task?",
                        text2:
                          "All The Data Related To This Task Will Be Deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleTaskDelete(task._id)
                          : () => { },
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => { },
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
