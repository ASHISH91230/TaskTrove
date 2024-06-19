import React, { useState } from 'react';
import TemplateSelector from '../Post/TemplateSelector';
import PostEditor from '../Post/PostEditor';
import PostPreview from '../Post/PostPreview';
import { RxCross2 } from "react-icons/rx"

const Post = ({ setPostModal }) => {
  const [templates, setTemplates] = useState([
    { id: 1, content: "🎉 I just completed [TASK_NAME]! Feeling accomplished and ready for the next challenge! #Productivity #TaskTrove" },
    { id: 2, content: "🚀 Making great progress on [TASK_NAME] today. [PROGRESS]% done! #KeepGoing #Motivation" },
    { id: 3, content: "📅 Weekly Wrap-Up: Completed [NUMBER_OF_TASKS] tasks this week. Looking forward to another productive week ahead! #WeeklyGoals #TaskTrove" },
    { id: 4, content: "📈 Setting new goals for the month: [GOAL_1], [GOAL_2], [GOAL_3]. Ready to achieve great things! #MonthlyGoals" },
    { id: 5, content: "🔥 Day [DAY_NUMBER] of the 75-Day Challenge: Completed [TASK_NAME]. [PROGRESS]% through the challenge! #ChallengeAccepted #TaskTrove" },
    { id: 6, content: "🏅 Reached a new milestone: [MILESTONE_DESCRIPTION]. Feeling proud of the progress! #Milestone #TaskTrove" },
    { id: 7, content: "💧 Stay hydrated! I've completed [DAYS_COMPLETED] days of my [TOTAL_DAYS] days drinking water challenge. #HealthyLiving #StayHydrated" },
    { id: 8, content: "📝 Today's To-Do List: [TASK_NAME]. Let's get it done! #DailyGoals #TaskTrove" },
    { id: 9, content: "🏋️‍♂️ Progress Update: I have lost [WEIGHT_LOST] lbs in [WEEKS_COMPLETED] weeks! Only [REMAINING_WEEKS] weeks to go in my [TOTAL_WEEKS] weeks weight loss challenge. #FitnessJourney #WeightLoss" },
    { id: 10, content: "🎯 Breaking down [TASK_NAME] into smaller tasks. First step: [FIRST_STEP]. On my way! #TaskManagement" }
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Create Post</p>
          <button
            onClick={() => setPostModal(false)}
          >
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        <div>
          <div className='p-6'>
            <TemplateSelector
              templates={templates}
              setSelectedTemplate={setSelectedTemplate}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <PostEditor
              selectedTemplate={selectedTemplate}
              setPostContent={setPostContent}
              setSelectedTemplate={setSelectedTemplate}
              setSelectedOption={setSelectedOption}
            />
            <PostPreview postContent={postContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;