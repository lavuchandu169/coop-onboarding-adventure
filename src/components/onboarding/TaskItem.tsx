
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
  <div className={`flex items-start mb-3 ${isSubTask ? 'ml-8' : ''}`}>
    <input 
      type="checkbox" 
      id={id} 
      name={name} 
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      className="mt-1 h-5 w-5 accent-red-600 rounded border-gray-300 text-red-600 focus:ring-red-600"
    />
    <label htmlFor={id} className="ml-3 text-gray-700 text-base cursor-pointer">
      {children}
    </label>
  </div>
);
