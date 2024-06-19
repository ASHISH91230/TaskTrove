import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie, Bar } from "react-chartjs-2"

Chart.register(...registerables)

export default function StudentChart({ tasks }) {
    // State to keep track of the currently selected chart
    const [currChart, setCurrChart] = useState("complete")
    // Function to generate random colors for the chart
    const generateRandomColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }

    // Data for the chart displaying completion information
    const chartDataStudents = {
        labels: ["Completed", "Yet To Start", "In Progress"],
        datasets: [
            {
                data: [tasks.completedTasks, tasks.incompletedTasks, tasks.partialTasks],
                backgroundColor: generateRandomColors(3),
            },
        ],
    }

    //   Data for the chart displaying progress information
    const chartProgressData = {
        labels: tasks.taskDetails.map((task) => task.taskName),
        datasets: [
            {
                data: tasks.progress,
                backgroundColor: generateRandomColors(tasks.taskDetails.length),
            },
        ],
    }

    // Options for the chart
    const options1 = {
        maintainAspectRatio: false,
    }

    const options2 = {
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Visualize</p>
            <div className="space-x-4 font-semibold">
                {/* Button to switch to the "completion" chart */}
                <button
                    onClick={() => setCurrChart("complete")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "complete"
                        ? "bg-richblack-700 text-yellow-50"
                        : "text-yellow-400"
                        }`}
                >
                    Completion
                </button>
                {/* Button to switch to the "progress" chart */}
                <button
                    onClick={() => setCurrChart("progress")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "progress"
                        ? "bg-richblack-700 text-yellow-50"
                        : "text-yellow-400"
                        }`}
                >
                    Progress
                </button>
            </div>
            <div className="relative mx-auto aspect-square h-full w-full">
                {/* Render the pie chart based on the selected chart */}
                {currChart === "complete" ? (<Pie
                    data={chartDataStudents}
                    options={options1}
                />) : (<Bar
                    data={chartProgressData}
                    options={options2} />)}
            </div>
        </div>
    )
}
