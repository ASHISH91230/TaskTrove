import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Footer from "../components/common/Footer"
import Task_Slider from "../components/core/Catalog/Task_Slider"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/categoryAPI"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  // Fetch All Categories
  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could Not Fetch Categories.", error)
      }
    })()
  }, [catalogName])
  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-richblack-500">Tasks To Get You Started</div>
        
          {catalogPageData?.data?.selectedCategory?.Taskes.length>0?(
            <div className="py-8">
            <Task_Slider
            Tasks={catalogPageData?.data?.selectedCategory?.Taskes}
          />
          </div>
          ):(<div className="mt-1 text-center text-lg font-semibold text-yellow-500">No Tasks Found Currently For This Category
            </div>)}
      </div>
      {/* Section 2 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-richblack-500">
          Top Tasks In {catalogPageData?.data?.differentCategory?.name}
        </div>
        {catalogPageData?.data?.differentCategory?.Taskes.length>0?(
            <div className="py-8">
            <Task_Slider
            Tasks={catalogPageData?.data?.differentCategory?.Taskes}
          />
          </div>
          ):(<div className="mt-1 text-center text-lg font-semibold text-yellow-500">No Tasks Found Currently For This Category
            </div>)}
      </div>
      <Footer />
    </>
  )
}

export default Catalog