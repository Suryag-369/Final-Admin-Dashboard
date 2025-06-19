import {
    Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ViewEmployeeDialog({ employee,open, onOpenChange }) {
    console.log(employee)
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Employee Details</DialogTitle>
                    <DialogDescription>
                        <div className="mt-4 space-y-2">
                            <p><strong>Name:</strong> {employee.name}</p>
                            <p><strong>Email:</strong> {employee.email}</p>
                            {/*<p><strong>Phone:</strong> {employee.phoneNumber || "-"}</p>*/}
                            <p><strong>Role:</strong> {employee.role}</p>
                            {/*<p><strong>Tenant ID:</strong> {employee.tenantId}</p>*/}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}