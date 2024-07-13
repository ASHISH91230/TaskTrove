import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useState, useEffect } from "react"
import { getUserBadges, getStreakDetails } from "../../../services/operations/StreakBadgesAPI"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const { width, height } = useWindowSize()
  const [images, setImages] = useState([]);
  const { token } = useSelector((state) => state.auth)
  const [userstreak, setUserStreak] = useState([]);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const result = await getStreakDetails(user._id, token);
        setUserStreak(result)
        if (userstreak.message === 'Welcome Back') {
          setIsConfettiActive(true)
          const timer = setTimeout(() => {
            setIsConfettiActive(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }
      catch (error) {
        console.log("Error In Fetching Streak");
      }
    }
    fetchStreak()
  }, [userstreak.message]);

  useEffect(() => {
    const fetchBadges = async () => {
      const imageArray = await getUserBadges(user._id, token)
      setImages(imageArray);
    }
    fetchBadges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <>
      <div>
        {isConfettiActive && <Confetti height={height} width={width} />}
      </div>
      <h1 className="mb-5 text-3xl font-medium text-richblack-500">
        My Profile
      </h1>
      <div className="flex flex-wrap gap-5">
        {images.map((badge, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <img src={badge.badge.Image} alt="Badge" className="h-[100px] w-[100px] object-cover rounded-[50%]" />
            <div className="mt-2 text-lg font-bold">{Math.ceil((badge.count) / 2)}</div>
          </div>
        ))}
      </div>

      <div>
        <img src={user?.Image}></img>
      </div>

      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${user?.additionalDetails?.about
            ? "text-richblack-5"
            : "text-richblack-400"
            } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}