import { useEffect, useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import ConfirmationModal from "../../common/ConfirmationModal"
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"
import { FaFireAlt } from "react-icons/fa";
import { getStreakDetails } from "../../../services/operations/StreakBadgesAPI"
const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth);
  const [userstreak, setUserStreak] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  useOnClickOutside(ref, () => setOpen(false))

  useEffect(() => {
    setLoading(true)
    const fetchStreak = async () => {
      try {
        const result = await getStreakDetails(user._id, token);
        setUserStreak(result)
      }
      catch (error) {
        console.log("Error In Fetching Streak");
      }
    }
    fetchStreak()
    setLoading(false)
  }, [])

  if (!user) return null;

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        {/* streak icon by ------------->AKG */}
        <div className=" ">
          <FaFireAlt color=" orange" className=" m-auto w-8 h-6 mr-4" />
          <div className=" text-white  bg-gray-400  m-2 absolute translate-x-5 -translate-y-10 ">
            {loading ? 'Loading...' : `${userstreak?.streak?.currentStreak || 0} `}
          </div>
        </div>

        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              setConfirmationModal({
                text1: "Are You Sure?",
                text2: "You Will Be Logged Out Of Your Account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </button>
  )
}
export default ProfileDropdown