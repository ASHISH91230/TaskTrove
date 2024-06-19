import React, { useState, useEffect } from 'react';

const PostEditor = ({ selectedTemplate, setPostContent, setSelectedTemplate, setSelectedOption }) => {
  const [customTemplate, setCustomTemplate] = useState('');
  const [placeholders, setPlaceholders] = useState({});
  const [placeholderValues, setPlaceholderValues] = useState({});

  useEffect(() => {
    if (selectedTemplate) {
      const matches = selectedTemplate.content.match(/\[([^\]]+)\]/g) || [];
      const initialPlaceholders = matches.reduce((acc, match) => {
        const key = match.slice(1, -1);
        acc[key] = '';
        return acc;
      }, {});
      setPlaceholders(initialPlaceholders);
      setCustomTemplate('');
    }
  }, [selectedTemplate]);

  const handleTemplateChange = (e) => {
    setCustomTemplate(e.target.value);
    setSelectedTemplate(null);
    setSelectedOption(null);
  };

  const handlePlaceholderChange = (e) => {
    const { name, value } = e.target;
    setPlaceholderValues({
      ...placeholderValues,
      [name]: value,
    });
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    let content = customTemplate || selectedTemplate.content;
    if (selectedTemplate) {
      for (const placeholder in placeholderValues) {
        content = content.replace(`[${placeholder}]`, placeholderValues[placeholder]);
      }
    }
    setPostContent(content);
  };

  const handleClear = () => {
    setCustomTemplate('');
    setPostContent('');
  };

  const formatLabel = (label) => {
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleCancel = () => {
    setSelectedTemplate(null);
    setSelectedOption(null);
    setPostContent('');
  }

  return (
    <div>
      {selectedTemplate && (
        <div className="flex w-11/12 flex-col my-2 ml-6">
          <div className='flex justify-between'>
            <h3 className="text-lg text-richblack-5">Edit Post</h3>
            <button className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`} onClick={handleCancel}>Cancel</button>
          </div>
          <form onSubmit={handleCreatePost}>
            {Object.keys(placeholders).map((placeholder, index) => (
              <div key={index} className='flex flex-col my-2'>
                <label className="text-sm text-richblack-5 mb-1">{formatLabel(placeholder)}</label>
                <input
                  type="text"
                  name={placeholder}
                  value={placeholderValues[placeholder] || ''}
                  onChange={handlePlaceholderChange}
                  className='rounded-sm'
                  required
                />
              </div>
            ))}
            <div className='flex justify-center'>
              <button type="submit" className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900">Create Post</button>
            </div>
          </form>
        </div>
      )}
      <div className="flex w-11/12 flex-col space-y-2 ml-6">
        <h3 className="text-sm text-richblack-5">Create Custom Template</h3>
        <textarea
          value={customTemplate}
          onChange={handleTemplateChange}
          className='form-style resize-x-none min-h-[130px] w-full'
        />
        <div className="mt-6 flex justify-center gap-x-2">
          <button onClick={handleCreatePost} className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900">Preview Post</button>
          <button onClick={handleClear} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 disabled:cursor-default`} disabled={!customTemplate}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;