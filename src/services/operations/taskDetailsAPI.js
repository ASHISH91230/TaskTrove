import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import {taskEndpoints} from "../apis"
const {
    TASK_DETAILS_API,
    TASK_CATEGORIES_API,
    GET_ALL_TASK_API,
    CREATE_TASK_API,
    EDIT_TASK_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_STUDENT_TASK_API,
    DELETE_TASK_API,
    GET_FULL_TASK_DETAILS_AUTHENTICATED,
    CREATE_CATEGORY_TASK,
    CREATE_RATING_API,
    SUBSECTION_COMPLETION_API,
} = taskEndpoints



export const getAllTask = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_TASK_API)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch The Task")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_TASK_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}



export const fetchTaskDetails = async (taskId) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
      const response = await apiConnector("POST", TASK_DETAILS_API, {
        taskId,
      })
      console.log("TASK_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("TASK_DETAILS_API API ERROR............", error)
      result = error.response.data
    }
    toast.dismiss(toastId)
    return result
  }


  // fetching the available task categories
  export const fetchTaskCategories = async () => {
    let result = []
    try {
      const response = await apiConnector("GET", TASK_CATEGORIES_API)
      console.log("TASK_CATEGORIES_API API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Task Categories")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("TASK_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
  }
  
// add the task details
  export const addTaskDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_TASK_API, data, {
        "Content-Type": "multipart/form-data",
       
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE TASK API RESPONSE............", response)
      
      if (!response?.data?.success) {
        throw new Error("Could Not Add Task Details")
      }
      toast.success("Task Details Added Successfully")
      result = response?.data?.data
    } catch (error) {
     
      console.log("CREATE TASK API ERROR............", error)
      toast.error("This Is Error Message For AddTaskDetail",error.message)
    }
    toast.dismiss(toastId)
    return result

  }
  

// edit the task details
  export const editTaskDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", EDIT_TASK_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT TASK API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Task Details")
      }
      toast.success("Task Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("EDIT TASK API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  } 



  // create a section
export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Section")
      }
      toast.success("Task Section Created")
      result = response?.data?.updatedTask
    } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  

  
// create a subsection
export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Subsection")
      }
      toast.success("Subsection Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }



// update a section
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
      }
      toast.success("Task Section Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // update a subsection
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Subsection")
      }
      toast.success("Subsection Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  
// delete a section
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Task Section Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  // delete a subsection
export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Subsection")
      }
      toast.success("Subsection Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  

  
// fetching all taskes under a specific user
export const fetchInstructorTaskes = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_STUDENT_TASK_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("STUDENT TASK API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Student Task")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("Instructor Task API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  // delete a task
export const deleteTask = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_TASK_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE TASK API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Task")
      }
      toast.success("Task Deleted")
    } catch (error) {
      console.log("DELETE TASK API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }
  
  
// get full details of a task
export const getFullDetailsOfTask = async (taskId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        GET_FULL_TASK_DETAILS_AUTHENTICATED,
        {
          taskId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("TASK_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("TASK_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
    }
    toast.dismiss(toastId)
    return result
  }
  
//add category task
export const addCategoryTask = async (taskId, token,navigate) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "POST",
      CREATE_CATEGORY_TASK,
      {
        taskId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("CREATE_CATEORY_TASK_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Task Added")
    navigate("/dashboard/enrolled-challenges")
  } catch (error) {
    console.log("CREATE_CATEGORY_TASK_API API ERROR............", error)
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
}
  
// mark a subsection as complete
export const markSubsectionAsComplete = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", SUBSECTION_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_SUBSECTION_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Subsection Completed")
      result = true
    } catch (error) {
      console.log("MARK_SUBSECTION_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }

  
// create a rating for task
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }