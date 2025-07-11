// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// export default function ReportFilter({ filters, setFilters, onApply, onReset, employees, supervisors }) {
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handleSelectChange = (key, value) => {
//     setFilters({ ...filters, [key]: value === 'all' ? '' : value });
//   };

//   const creatorOptions = [
//     { id: '', name: 'All' },
//     ...employees.filter((e) => e.role === 'MANAGER' || e.role === 'SUPERVISOR'),
//   ];

//   return (
//     <div className="flex gap-4">
//       <div className="flex flex-cols-1 md:flex-cols-4 gap-4">
//         {/* Created By */}
//         <div className="space-y-2">
//           <label htmlFor="createdBy" className="text-sm font-medium">
//             Created By
//           </label>
//           <Select
//             value={filters.createdBy || 'all'}
//             onValueChange={(val) => handleSelectChange('createdBy', val)}
//           >
//             <SelectTrigger id="createdBy">
//               <SelectValue placeholder="Select Creator" />
//             </SelectTrigger>
//             <SelectContent>
//               {creatorOptions.map((emp) => (
//                 <SelectItem key={emp.id || 'all'} value={emp.id || 'all'}>
//                   {emp.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Assigned To (Conditional) */}
//         {filters.createdBy &&
//           employees.find((e) => e.id === Number(filters.createdBy))?.role === 'MANAGER' &&
//           supervisors.length > 0 && (
//             <div className="space-y-2">
//               <label htmlFor="assignedTo" className="text-sm font-medium">
//                 Assigned To
//               </label>
//               <Select
//                 value={filters.assignedTo || 'all'}
//                 onValueChange={(val) => handleSelectChange('assignedTo', val)}
//               >
//                 <SelectTrigger id="assignedTo">
//                   <SelectValue placeholder="Select Assignee" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All</SelectItem>
//                   {supervisors.map((emp) => (
//                     <SelectItem key={emp.id} value={String(emp.id)}>
//                       {emp.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           )}

//         {/* Status */}
//         <div className="space-y-2">
//           <label htmlFor="status" className="text-sm font-medium">
//             Status
//           </label>
//           <Select
//             value={filters.status || 'all'}
//             onValueChange={(val) => handleSelectChange('status', val)}
//           >
//             <SelectTrigger id="status">
//               <SelectValue placeholder="Select Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="approved">APPROVED</SelectItem>
//               <SelectItem value="rejected">REJECTED</SelectItem>
//               <SelectItem value="implemented">IMPLEMENTED</SelectItem>
//               <SelectItem value="submitted">SUBMITTED</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Task Type */}
//         <div className="space-y-2">
//           <label htmlFor="taskType" className="text-sm font-medium">
//             Task Type
//           </label>
//           <Select
//             value={filters.taskType || 'all'}
//             onValueChange={(val) => handleSelectChange('taskType', val)}
//           >
//             <SelectTrigger id="taskType">
//               <SelectValue placeholder="Select Task Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="SCOUTING">SCOUTING</SelectItem>
//               <SelectItem value="FUEL">FUEL</SelectItem>
//               <SelectItem value="YIELD">YIELD</SelectItem>
//               <SelectItem value="SPRAYING">SPRAYING</SelectItem>
//               <SelectItem value="SOWING">SOWING</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Date Filters */}
//         <div className="space-y-2">
//           <label htmlFor="createdAfter" className="text-sm font-medium">
//             Created After
//           </label>
//           <Input
//             id="createdAfter"
//             name="createdAfter"
//             type="date"
//             value={filters.createdAfter || ''}
//             onChange={handleInputChange}
//             className="w-full"
//             title="Select the earliest creation date"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="createdBefore" className="text-sm font-medium">
//             Created Before
//           </label>
//           <Input
//             id="createdBefore"
//             name="createdBefore"
//             type="date"
//             value={filters.createdBefore || ''}
//             onChange={handleInputChange}
//             className="w-full"
//             title="Select the latest creation date"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="updatedAfter" className="text-sm font-medium">
//             Updated After
//           </label>
//           <Input
//             id="updatedAfter"
//             name="updatedAfter"
//             type="date"
//             value={filters.updatedAfter || ''}
//             onChange={handleInputChange}
//             className="w-full"
//             title="Select the earliest update date"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="updatedBefore" className="text-sm font-medium">
//             Updated Before
//           </label>
//           <Input
//             id="updatedBefore"
//             name="updatedBefore"
//             type="date"
//             value={filters.updatedBefore || ''}
//             onChange={handleInputChange}
//             className="w-full"
//             title="Select the latest update date"
//           />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end space-y-2 gap-2">
//         <Button onClick={onReset} variant="outline">
//           Reset
//         </Button>
//         <Button onClick={onApply}>Apply Filter</Button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ReportFilter({
  filters,
  setFilters,
  onApply,
  onReset,
  employees,
  supervisors,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSelectChange = (key, value) => {
    setFilters({ ...filters, [key]: value === 'all' ? '' : value });
  };

  const creatorOptions = [
    { id: '', name: 'All' },
    ...employees.filter((e) => e.role === 'MANAGER' || e.role === 'SUPERVISOR'),
  ];

  return (
    <div className="space-y-4 w-full">
      {/* All Filters in one wrapping div */}
      <div className="flex flex-wrap gap-4">
        {/* Created By */}
        <div className="flex flex-col !min-w-[50px]">
          <label htmlFor="createdBy" className="text-sm font-medium">
            Created By
          </label>
          <Select
            value={filters.createdBy || 'all'}
            onValueChange={(val) => handleSelectChange('createdBy', val)}
          >
            <SelectTrigger id="createdBy" className="min-w-[100px]">
              <SelectValue placeholder="Select Creator" />
            </SelectTrigger>
            <SelectContent>
              {creatorOptions.map((emp) => (
                <SelectItem key={emp.id || 'all'} value={emp.id || 'all'}>
                  {emp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Assigned To */}
        {filters.createdBy &&
          employees.find((e) => e.id === Number(filters.createdBy))?.role === 'MANAGER' &&
          supervisors.length > 0 && (
            <div className="flex flex-col min-w-[50px]">
              <label htmlFor="assignedTo" className="text-sm font-medium">
                Assigned To
              </label>
              <Select
                value={filters.assignedTo || 'all'}
                onValueChange={(val) => handleSelectChange('assignedTo', val)}
              >
                <SelectTrigger id="assignedTo" className="min-w-[100px]">
                  <SelectValue placeholder="Select Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {supervisors.map((emp) => (
                    <SelectItem key={emp.id} value={String(emp.id)}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

        {/* Status */}
        <div className="flex flex-col min-w-[100px]">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <Select
            value={filters.status || 'all'}
            onValueChange={(val) => handleSelectChange('status', val)}
          >
            <SelectTrigger id="status" className="min-w-[100px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="approved">APPROVED</SelectItem>
              <SelectItem value="rejected">REJECTED</SelectItem>
              <SelectItem value="implemented">IMPLEMENTED</SelectItem>
              <SelectItem value="submitted">SUBMITTED</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Task Type */}
        <div className="flex flex-col min-w-[50px]">
          <label htmlFor="taskType" className="text-sm font-medium">
            Task Type
          </label>
          <Select
            value={filters.taskType || 'all'}
            onValueChange={(val) => handleSelectChange('taskType', val)}
          >
            <SelectTrigger id="taskType" className="min-w-[100px]">
              <SelectValue placeholder="Select Task Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="SCOUTING">SCOUTING</SelectItem>
              <SelectItem value="FUEL">FUEL</SelectItem>
              <SelectItem value="YIELD">YIELD</SelectItem>
              <SelectItem value="SPRAYING">SPRAYING</SelectItem>
              <SelectItem value="SOWING">SOWING</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Filters */}
        {[
          ['createdAfter', 'Created After'],
          ['createdBefore', 'Created Before'],
          ['updatedAfter', 'Updated After'],
          ['updatedBefore', 'Updated Before'],
        ].map(([name, label]) => (
          <div key={name} className="flex flex-col min-w-[50px]">
            <label htmlFor={name} className="text-sm font-medium">
              {label}
            </label>
            <Input
              id={name}
              name={name}
              type="date"
              value={filters[name] || ''}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
        <Button onClick={onReset}  className="w-full sm:w-auto bg-orange-400 hover:bg-orange-600">
          Reset
        </Button>
        <Button onClick={onApply} className="w-full sm:w-auto">
          Apply Filter
        </Button>
      </div>
    </div>
  );
}
