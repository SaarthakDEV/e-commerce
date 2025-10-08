"use client"
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { StatusFilterDropdownProps } from '@/libs/types';

const StatusFilterDropdown: React.FC<StatusFilterDropdownProps> = ({ selectedStatus, setSelectedStatus, statusOptions }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  return (
    <div className="w-64 p-4">
      <label className="block text-md font-medium text-primary mb-2">
        Filter by Status
      </label>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-white border-2 border-secondary rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className={`flex items-center text-gray-500`}>
              {selectedStatus ? (
                <span className={`px-2 py-1 rounded-full text-md text-gray-500`}>
                  {statusOptions?.find(option => option?.value === selectedStatus)?.label}
                </span>
              ) : (
                'Select status...'
              )}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-100 w-full mt-1 bg-white border-2 border-secondary rounded-lg shadow-lg">
            <div className="py-1">
              {statusOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleStatusSelect(option?.value)}
                  className="w-full px-4 py-2 text-left hover:bg-secondary focus:outline-none focus:bg-primary transition-colors"
                >
                  <span className={`flex items-center text-gray-600`}>
                    {option?.value ? (
                      <span className={`px-2 py-1 rounded-full text-md text-gray-600`}>
                        {option?.label}
                      </span>
                    ) : (
                      option?.label
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusFilterDropdown;