import React, { useState } from 'react';
import { BsChevronDown } from "react-icons/bs"

const TemplateSelector = ({ templates, setSelectedTemplate, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (template) => {
    setSelectedOption(template);
    setSelectedTemplate(template);
    setIsOpen(false);
  };
  return (
    <div className="relative w-full mb-4 flex flex-row justify-center border-solid border-richblack-5 border-2 rounded-xl text-richblack-5 cursor-pointer" onClick={handleDropdownToggle}>
      <div className="p-2" onClick={handleDropdownToggle}>
        {selectedOption ? selectedOption.content : "Select A Template"}
      </div>
      <div className={`flex items-center mr-2 ${isOpen ? "rotate-180"
        : "rotate-0"}`}>
        <BsChevronDown />
      </div>
      {isOpen && (
        <div className='absolute top-[100%] left-0 right-0 overflow-y-auto z-[1000] bg-richblack-600 text-richblack-5 cursor-pointer rounded-lg'>
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-400 border-b-2"
              onClick={() => handleOptionClick(template)}
            >
              {template.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;