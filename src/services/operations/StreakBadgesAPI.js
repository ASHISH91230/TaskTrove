import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { StreakEndPointWithBadges } from "../apis"

const{
    GET_USER_STREAK_DATA_API,
  GET_USER_BADGES_DATA_API,
   CREATE_USER_BADGES_DATA_API,
   RESET_USER_STREAK_DATA_API,
}=StreakEndPointWithBadges



export async function getStreakDetails(userId,token){
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("POST",  GET_USER_STREAK_DATA_API,
       {userId},{
       Authorization: `Bearer ${token}`,
        })
        console.log("GET_STREAK_DETAILS_API API RESPONSE............", response)
        result = response?.data
        } catch (error) {
          console.log("GET_STREAK_DETAILS_API API ERROR............", error)
          toast.error("Could Not Get Streak Details")
          }
          toast.dismiss(toastId)
          return result
  }
  
  export async function getUserBadges(userId,token){
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("POST", GET_USER_BADGES_DATA_API,   {userId}, {
        Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_BADGES_API API RESPONSE............", response)
        result = response?.data
        } catch (error) {
          console.log("GET_USER_BADGES_API API ERROR............", error)
          toast.error("Could Not Get User Badges")
          }
          toast.dismiss(toastId)
          return result
  }


  export async function createBadge(token){
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("POST", CREATE_USER_BADGES_DATA_API, null, {
        Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_USER_BADGES_DATA_API API RESPONSE............", response)
        result = response?.data
        } catch (error) {
          console.log("CREATE_USER_BADGES_DATA_API API ERROR............", error)
          toast.error("Could Not Get User Badges")
          }
          toast.dismiss(toastId)
          return result
  }