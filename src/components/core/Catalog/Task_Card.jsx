import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"

function Task_Card({ task }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(task.ratingAndReviews)
    setAvgReviewCount(count)
  }, [task])

  return (
    <>
      <Link to={`/tasks/${task._id}`}>
        <div>
          <div className="flex flex-col items-center gap-2 px-1 py-3">
            <p className="text-xl text-richblack-500">{task?.taskName}</p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {task?.ratingAndReviews?.length} Ratings
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Task_Card