'use client';

import { Users, Clock, Hash } from 'lucide-react';

// Mock data - in real app, fetch from contract events or subgraph
const mockEmployees = [
  { id: 1, name: 'Alice Johnson', tokenId: '123', minted: '2024-02-01', address: '0x1234...5678' },
  { id: 2, name: 'Bob Smith', tokenId: '124', minted: '2024-02-01', address: '0x2345...6789' },
  { id: 3, name: 'Carol Williams', tokenId: '125', minted: '2024-01-31', address: '0x3456...7890' },
  { id: 4, name: 'David Brown', tokenId: '126', minted: '2024-01-30', address: '0x4567...8901' },
  { id: 5, name: 'Eva Davis', tokenId: '127', minted: '2024-01-29', address: '0x5678...9012' },
  { id: 6, name: 'Frank Miller', tokenId: '128', minted: '2024-01-28', address: '0x6789...0123' },
];

export function EmployeeList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recent Mints
        </h2>
        <div className="flex items-center text-blue-500 dark:text-blue-400">
          <Users size={20} className="mr-2" />
          <span className="font-medium">{mockEmployees.length} employees</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockEmployees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {employee.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {employee.name}
                </h3>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Hash size={14} className="mr-1" />
                    #{employee.tokenId}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} className="mr-1" />
                    {employee.minted}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
                {employee.address}
              </div>
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  Minted
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {mockEmployees.length} most recent mints
          </p>
          <button className="text-sm font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
            View all employees →
          </button>
        </div>
      </div>
    </div>
  );
}