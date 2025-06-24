// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table.jsx"
// import { Button } from "@/components/ui/button.jsx"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx"
// import {useEffect, useState} from "react"
// import AddUserDialog from "@/components/Employee/add-user.jsx";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
// import {Actions} from "@/components/Employee/table-options.jsx";


// const roles = ["ALL", "SUPERVISOR", "MANAGER", "ADMIN"]

// export function EmployeeTable() {
//     const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;


//     const [employees, setEmployees] = useState([])

//     useEffect(() => {
//         fetch(`${API_BASE_URL}/api/admin/users`, {
//             headers: {
//                 Authorization:`Bearer ${localStorage.getItem('accessToken')}`,
//             }
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 setEmployees(data.employees || [])
//             })
//     }, [])

//     const [selectedRole, setSelectedRole] = useState("ALL")
//     const [currentPage, setCurrentPage] = useState(1)
//     const rowsPerPage = 10

//     const filteredEmployees = selectedRole === "ALL"
//         ? employees
//         : employees.filter(emp => emp.role.toUpperCase() === selectedRole)

//     const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage)
//     const paginatedEmployees = filteredEmployees.slice(
//         (currentPage - 1) * rowsPerPage,
//         currentPage * rowsPerPage
//     )

//     const handleRoleChange = (role) => {
//         setSelectedRole(role)
//         setCurrentPage(1) // Reset to first page on filter change
//     }

//     return (
//         <div className="p-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">Employee List</h2>
//                 <span className="flex gap-2">
//                     <Select onValueChange={handleRoleChange} defaultValue="ALL" className="w[140px]">
//                     <SelectTrigger className="w-[140px]">
//                         <SelectValue placeholder="Filter by Role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         {roles.map((role) => (
//                             <SelectItem key={role} value={role}>
//                                 {role.charAt(0) + role.slice(1).toLowerCase()}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>
//                 <AddUserDialog/>
//                 </span>
//             </div>

//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Email</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Actions</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {paginatedEmployees.map((employee) => (
//                         <TableRow key={employee.id}>
//                             <TableCell>{employee.name}</TableCell>
//                             <TableCell>{employee.email}</TableCell>
//                             <TableCell>{employee.role}</TableCell>
//                             <TableCell className="text-right">
//                                 <Actions employee={employee} />
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>

//             {/* Pagination Controls */}
//             <div className="flex justify-between items-center mt-4">
//         <span className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </span>
//                 <div className="space-x-2">
//                     <Button
//                         variant="outline"
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage((prev) => prev - 1)}
//                     >
//                         Previous
//                     </Button>
//                     <Button
//                         variant="outline"
//                         disabled={currentPage === totalPages}
//                         onClick={() => setCurrentPage((prev) => prev + 1)}
//                     >
//                         Next
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { useEffect, useState } from "react";
import AddUserDialog from "@/components/Employee/add-user.jsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Actions } from "@/components/Employee/table-options.jsx";

const roles = ["ALL", "SUPERVISOR", "MANAGER", "ADMIN"];

// Define role order for sorting (lower index = higher priority)
const roleOrder = {
  ADMIN: 1,
  MANAGER: 2,
  SUPERVISOR: 3,
};

export function EmployeeTable() {
  const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
  const [employees, setEmployees] = useState([]);
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const rowsPerPage = 10;

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      setEmployees(data.employees || []);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      alert("Failed to load employees. Please try again.");
    }
  };

  // Fetch employees on mount and when refreshKey changes
  useEffect(() => {
    fetchEmployees();
  }, [refreshKey]);

  // Handle successful user action (add, update, delete)
  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Filter and sort employees by role
  const filteredEmployees =
    selectedRole === "ALL"
      ? employees
      : employees.filter((emp) => emp.role.toUpperCase() === selectedRole);

  // Sort employees by role order
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const roleA = roleOrder[a.role.toUpperCase()] || 999; // Fallback for unknown roles
    const roleB = roleOrder[b.role.toUpperCase()] || 999;
    return roleA - roleB;
  });

  const totalPages = Math.ceil(sortedEmployees.length / rowsPerPage);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employee List</h2>
        <span className="flex gap-2">
          <Select onValueChange={handleRoleChange} defaultValue="ALL" className="w[140px]">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AddUserDialog onSuccess={handleSuccess} />
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell className="text-right">
                <Actions employee={employee} onSuccess={handleSuccess} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}