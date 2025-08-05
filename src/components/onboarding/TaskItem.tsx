
import React from 'react';

interface TaskItemProps {
  id: string;
  name: string;
  children: React.ReactNode;
  isSubTask?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  id, 
  name, 
  children, 
  isSubTask = false,
  checked = false,
  onChange 
}) => (
  <div className={`flex items-start mb-2 sm:mb-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-fast animate-fade-in-up ${isSubTask ? 'ml-4 sm:ml-8' : ''}`}>
    <input 
      type="checkbox" 
      id={id} 
      name={name} 
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      className="mt-1 h-4 w-4 sm:h-5 sm:w-5 accent-red-600 rounded border-gray-300 text-red-600 focus:ring-red-600 transition-fast interactive"
    />
    <label htmlFor={id} className="ml-2 sm:ml-3 text-gray-700 text-sm sm:text-base cursor-pointer hover:text-gray-900 transition-fast">
      {children}
    </label>
  </div>
);
