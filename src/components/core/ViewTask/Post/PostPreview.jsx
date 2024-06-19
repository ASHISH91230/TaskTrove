import React from 'react';
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"

const PostPreview = ({ postContent }) => {

  const handleCopy = () => {
    copy(postContent)
    toast.success("Saved To Clipboard")
  }

  return (
    <div>
      {postContent && (<div>
        <h3 className="text-sm text-richblack-5 mt-2">Post Preview</h3>
        <p className='text-richblack-5 mt-3 text-lg'>{postContent}</p>
        <div className='flex justify-end'>
          <button className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900' onClick={handleCopy}>Save</button>
        </div>
      </div>)}
    </div>
  );
};

export default PostPreview;