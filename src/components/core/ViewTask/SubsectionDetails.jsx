import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markSubsectionAsComplete } from '../../../services/operations/taskDetailsAPI';
import { updateCompletedSubsections } from '../../../slices/viewTaskSlice';
import { useTimer } from 'react-timer-hook';
import IconBtn from '../../common/IconBtn';
import Post from '../ViewTask/Post/Post';

const SubsectionDetails = () => {

  const { taskId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { taskSectionData, taskEntireData, completedSubsections } = useSelector((state) => state.viewTask);

  const [subsectionData, setSubsectionData] = useState([]);
  const [subsectionEnded, setSubsectionEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postModal, setPostModal] = useState(false);

  useEffect(() => {
    const setSubsectionSpecificDetails = async () => {
      if (!taskSectionData.length)
        return;
      if (!taskId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-challenges");
      }
      else {
        //if all 3 fields are present
        const filteredData = taskSectionData.filter(
          (task) => task._id === sectionId
        )

        const filteredSubsectionData = filteredData?.[0].subSection.filter(
          (data) => data._id === subSectionId
        )

        setSubsectionData(filteredSubsectionData[0]);
        setSubsectionEnded(false);
      }
    }
    setSubsectionSpecificDetails();
  }, [taskSectionData, taskEntireData, location.pathname])

  const isFirstSubsection = () => {
    const currentSectionIndex = taskSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = taskSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const isLastSubsection = () => {
    const currentSectionIndex = taskSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = taskSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = taskSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSectionIndex === taskSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1) {
      return true;
    }
    else {
      return false;
    }
  }

  const goToNextSubsection = () => {
    const currentSectionIndex = taskSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = taskSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = taskSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      //same section, next subsection
      const nextSubSectionId = taskSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      //go to next subsection
      navigate(`/view-challenge/${taskId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else {
      //different section, first subsection
      const nextSectionId = taskSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = taskSectionData[currentSectionIndex + 1].subSection[0]._id;
      ///go to this subsection 
      navigate(`/view-challenge/${taskId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevSubsection = () => {

    const currentSectionIndex = taskSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = taskSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== 0) {
      //same section , prev subsection
      const prevSubSectionId = taskSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      //go to this subsection
      navigate(`/view-challenge/${taskId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else {
      //different section , last subsection
      const prevSectionId = taskSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = taskSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = taskSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      //go to this subsection
      navigate(`/view-challenge/${taskId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleSubsectionCompletion = async () => {

    setLoading(true);
    const res = await markSubsectionAsComplete({ taskId: taskId, subSectionId: subSectionId }, token);
    //state update
    if (res) {
      dispatch(updateCompletedSubsections(subSectionId));
    }
    setLoading(false);

  }
  function MyTimer({ expiryTimestamp, autoStart }) {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, onExpire: () => setSubsectionEnded(true), autoStart });
    return (
      <div style={{ textAlign: 'center' }} className='mt-2 flex items-center justify-center flex-col'>
        <div style={{ fontSize: '100px' }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p className='font-semibold'>{isRunning ? 'Timer Is Running...' : 'Resume Your Progress!'}</p>
        <div className='flex items-center justify-center'>
          <IconBtn text="Start" onclick={start} customClasses="m-2 p-2" />
          <IconBtn text="Pause" onclick={pause} customClasses="m-2 p-2" />
          <IconBtn text="Resume" onclick={resume} customClasses="m-2 p-2" />
          <IconBtn text="Restart" onclick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + parseInt(subsectionData.timeDuration));
            restart(time)
          }} customClasses="m-2 p-2" />
          {subsectionEnded && (<div style={{
            backgroundImage:
              "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
          }} className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
            {
              !completedSubsections.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleSubsectionCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )
            }

            <IconBtn
              disabled={loading}
              onclick={
                () => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + parseInt(subsectionData.timeDuration));
                  restart(time)
                  setSubsectionEnded(false)
                }}
              text="Begin Again!"
              customClasses="text-xl max-w-max px-4 mx-auto mt-2"
            />

            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
              {!isFirstSubsection() && (
                <button
                  disabled={loading}
                  onClick={goToPrevSubsection}
                  className='blackButton'
                >
                  Prev
                </button>
              )}
              {!isLastSubsection() && (
                <button
                  disabled={loading}
                  onClick={goToNextSubsection}
                  className='blackButton'>
                  Next
                </button>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
    );
  }
  const time = new Date();
  time.setSeconds(time.getSeconds() + parseInt(subsectionData.timeDuration));
  return (

    <div>
      {
        !subsectionData ? (<div>
          No Data Found
        </div>)
          : (
            <div>
              <MyTimer expiryTimestamp={time} autoStart={false} />
            </div>
          )
      }
      <h1 className="mt-4 text-3xl font-bold">
        Title:&nbsp;{subsectionData?.title}
      </h1>
      <p className="pt-2 pb-6 font-semibold">
        Description:&nbsp;{subsectionData?.description}
      </p>
      <button onClick={() => setPostModal(true)} className='flex items-center bg-richblack-800 cursor-pointer rounded-md font-semibold text-white py-2 px-5 hover:scale-95 transition-all duration-200'>Create Post</button>
      {postModal && <Post setPostModal={setPostModal} />}
    </div>
  )
}

export default SubsectionDetails
