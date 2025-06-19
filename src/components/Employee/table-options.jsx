import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { ViewEmployeeDialog } from "@/components/Employee/view-employee.jsx"
import { UpdateEmployeeDialog } from "@/components/Employee/update-employee.jsx"
import { DeleteEmployeeDialog } from "@/components/Employee/delete-employee.jsx"
import { ManagerSupervisorsDialog } from "@/components/Employee/manager-supervisor.jsx"

export const Actions = ({ employee, onSuccess }) => {
    const [viewOpen, setViewOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [msOpen, setMsOpen] = useState(false)

    // Check if employee exists
    if (!employee) {
        return null
    }

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        style={{
                            padding: '8px',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        aria-label="Actions"
                    >
                        <MoreHorizontal style={{ width: '16px', height: '16px' }} />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        align="end"
                        style={{
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            padding: '4px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                            minWidth: '140px'
                        }}
                        sideOffset={5}
                    >
                        <DropdownMenu.Item
                            onSelect={() => setViewOpen(true)}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '14px',
                                outline: 'none',
                                backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            View
                        </DropdownMenu.Item>
                        
                        <DropdownMenu.Item
                            onSelect={() => setUpdateOpen(true)}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '14px',
                                outline: 'none',
                                backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            Update
                        </DropdownMenu.Item>
                        
                        <DropdownMenu.Item
                            onSelect={() => setDeleteOpen(true)}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '14px',
                                outline: 'none',
                                backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            Delete
                        </DropdownMenu.Item>
                        
                        {employee.role === "MANAGER" && (
                            <DropdownMenu.Item
                                onSelect={() => setMsOpen(true)}
                                style={{
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    backgroundColor: 'transparent'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                View Supervisors
                            </DropdownMenu.Item>
                        )}
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* Your dialogs */}
            {viewOpen && (
                <ViewEmployeeDialog
                    employee={employee}
                    open={viewOpen}
                    onOpenChange={setViewOpen}
                />
            )}
            {updateOpen && (
                <UpdateEmployeeDialog
                    employee={employee}
                    onSuccess={onSuccess}
                    open={updateOpen}
                    onOpenChange={setUpdateOpen}
                />
            )}
            {deleteOpen && (
                <DeleteEmployeeDialog
                    employee={employee}
                    onSuccess={onSuccess}
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                />
            )}
            {msOpen && (
                <ManagerSupervisorsDialog
                    manager={employee}
                    open={msOpen}
                    onOpenChange={setMsOpen}
                />
            )}
        </>
    )
}