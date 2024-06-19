import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addTaskDetails, editTaskDetails, fetchTaskCategories } from '../../../../../services/operations/taskDetailsAPI';
import { MdNavigateNext } from "react-icons/md"
import { setStep, setTask } from '../../../../../slices/TaskSlice';
import IconBtn from '../../../../common/IconBtn';
import { TASK_STATUS } from '../../../../../utils/constants';
import { toast } from 'react-hot-toast';
import bubbleimage from '../../../../../assets/Images/3d-glassy-spheric-vortex-of-pastel-light.gif'
const TaskInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { task, editTask } = useSelector((state) => state.task);
    const [loading, setLoading] = useState(false);
    const [taskCategories, setTaskCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchTaskCategories();
            if (categories.length > 0) {
                setTaskCategories(categories);
            }
            setLoading(false);
        }

        if (editTask) {
            setValue("taskTitle", task.taskName);
            setValue("taskShortDesc", task.taskDescription);
            setValue("taskBenefits", task.whatYouWillLearn);
            setValue("taskCategory", task.category);
        }

        getCategories();
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.taskTitle !== task.taskName ||
            currentValues.taskShortDesc !== task.taskDescription ||
            currentValues.taskBenefits !== task.whatYouWillLearn ||
            currentValues.taskCategory._id !== task.category._id
        )
            return true;
        else
            return false;
    }

    //handles next button click 
    const onSubmit = async (data) => {
        if (editTask) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("taskId", task._id);
                if (currentValues.taskTitle !== task.taskName) {
                    formData.append("taskName", data.taskTitle);
                }

                if (currentValues.taskShortDesc !== task.taskDescription) {
                    formData.append("taskDescription", data.taskShortDesc);
                }

                if (currentValues.taskBenefits !== task.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.taskBenefits);
                }

                if (currentValues.taskCategory._id !== task.category._id) {
                    formData.append("category", data.taskCategory);
                }

                setLoading(true);
                const result = await editTaskDetails(formData, token);

                setLoading(false);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setTask(result));
                }
            }

            else {
                toast.error("No Changes Made So Far");
            }
            return;
        }

        //create a new task
        const formData = new FormData();
        formData.append("taskName", data.taskTitle);
        formData.append("taskDescription", data.taskShortDesc);
        formData.append("whatYouWillLearn", data.taskBenefits);
        formData.append("category", data.taskCategory);
        formData.append("status", TASK_STATUS.DRAFT);

        setLoading(true);
        const result = await addTaskDetails(formData, token);
        if (result) {
            dispatch(setStep(2));
            dispatch(setTask(result));
        }
        setLoading(false);

    }

    return (
        <div className=''> <img src={bubbleimage} alt="" className='absolute z-0 translate-x-96 -translate-y-16' />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" relative space-y-8 rounded-m border-richblack-700 bg-richblack-800 p-6 backdrop-blur-sm bg-white/30"
            >
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-500" htmlFor='taskTitle'>Task Title<sup className="text-pink-200">*</sup></label>
                    <input
                        id='taskTitle'
                        placeholder='Enter Task Title'
                        {...register("taskTitle", { required: true })}
                        className="form-style w-full"
                    />
                    {
                        errors.taskTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Task Title Is Required**</span>
                        )
                    }
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-500" htmlFor='taskShortDesc'>Task Short Description<sup className="text-pink-200">*</sup></label>
                    <textarea
                        id='taskShortDesc'
                        placeholder='Enter Description'
                        {...register("taskShortDesc", { required: true })}
                        className="form-style resize-x-none min-h-[130px] w-full"
                    />
                    {
                        errors.taskShortDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                            Task Description Is Required**
                        </span>)
                    }
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-500" htmlFor='taskCategory'>Task Category <sup className="text-pink-200">*</sup></label>
                    <select
                        id='taskCategory'
                        defaultValue=""
                        {...register("taskCategory", { required: true })}
                        className="form-style w-full"
                    >
                        <option value="" disabled>Choose A Category</option>
                        {
                            !loading && taskCategories.map((category, index) => (
                                <option key={index} value={category?._id}>
                                    {category.name}
                                </option>
                            ))
                        }

                    </select>
                    {errors.taskCategory && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Task Category Is Required**
                        </span>
                    )}
                </div>

                {/* Benefits of the task */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-500">Benefits Of The Task<sup className="text-pink-200">*</sup></label>
                    <textarea
                        id='taskBenefits'
                        placeholder='Enter Benefits Of The Task'
                        {...register("taskBenefits", { required: true })}
                        className="form-style resize-x-none min-h-[130px] w-full"
                    />
                    {errors.taskBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Benefits Of The Task Is Required**
                        </span>
                    )}
                </div>
                <div className="flex justify-end gap-x-2">
                    {
                        editTask && (
                            <button
                                onClick={() => dispatch(setStep(2))}
                                disabled={loading}
                                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                            >
                                Continue Without Saving
                            </button>
                        )
                    }
                    <IconBtn
                        disabled={loading}
                        text={!editTask ? "Next" : "Save Changes"}
                    >
                        <MdNavigateNext />
                    </IconBtn>

                </div>
            </form>
        </div>
    )
}
export default TaskInformationForm