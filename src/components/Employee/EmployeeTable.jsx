import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx"
import {useEffect, useState} from "react"
import AddUserDialog from "@/components/Employee/add-user.jsx";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Actions} from "@/components/Employee/table-options.jsx";


const roles = ["ALL", "SUPERVISOR", "MANAGER", "ADMIN"]

export function EmployeeTable() {
    const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;


    const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/admin/users`, {
            headers: {
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setEmployees(data.employees || [])
            })
    }, [])

    const [selectedRole, setSelectedRole] = useState("ALL")
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10

    const filteredEmployees = selectedRole === "ALL"
        ? employees
        : employees.filter(emp => emp.role.toUpperCase() === selectedRole)

    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage)
    const paginatedEmployees = filteredEmployees.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handleRoleChange = (role) => {
        setSelectedRole(role)
        setCurrentPage(1) // Reset to first page on filter change
    }

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
                <AddUserDialog/>
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
                                <Actions employee={employee} />
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
    )
}
