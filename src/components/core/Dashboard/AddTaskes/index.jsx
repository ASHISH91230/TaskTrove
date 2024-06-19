import RenderSteps from "./RenderSteps"

export default function AddTaskes() {
  return (
    <>
      <div className="flex  w-full items-start gap-x-6 ">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-500">
            Add Task
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Task Upload Tips */}
        <div className="top-10 max-w-[400px] flex-1 rounded-md border-white-[1px] backdrop-blur-sm bg-white/30 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-200">⚡ Task Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-500">
            <li>Task Information Controls The Task Overview.</li>
            <li>Task Builder Is Where You Create & Organize A Task.</li>
            <li>
              Add Topics In The Task Builder Section To Create Day-Wise Plans And Goals.
            </li>
            <li>Add Task Benefits To Help Others In The Community.</li>
            <li>Add Atleast 5 Sections In Task To Get It Displayed In The Catalog.</li>
          </ul>
        </div>
      </div>
    </>
  )
}