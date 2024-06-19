import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_CHALLENGES_API,GET_STUDENT_DATA_API, 
  // GET_USER_STREAK_DATA_API,
  // GET_USER_BADGES_DATA_API
 } = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledChallenges(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_CHALLENGES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_CHALLENGES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Challenges")
  }
  toast.dismiss(toastId)
  return result
}

export async function getStudentData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_STUDENT_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_STUDENT_DATA_API API RESPONSE............", response)
    result = response?.data?.tasks
  } catch (error) {
    console.log("GET_STUDENT_DATA_API API ERROR............", error)
    toast.error("Could Not Get Student Data")
  }
  toast.dismiss(toastId)
  return result
}
