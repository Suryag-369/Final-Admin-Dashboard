import {
    Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"

export function UpdateEmployeeDialog({ employee, onSuccess,open,onOpenChange }) {

    const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

    const [formData, setFormData] = useState({
        name: employee.name,
        phone_number: employee.phoneNumber || "",
        role: employee.role,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await axios.put(
                `${API_BASE_URL}/api/admin/users/${employee.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            onOpenChange(false)
            onSuccess?.()
        } catch (err) {
            alert("Error updating user")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone_number" className="text-right">Phone</Label>
                        <Input name="phone_number" value={formData.phone_number} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Role</Label>
                        <Input name="role" value={formData.role} onChange={handleChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Updating..." : "Update User"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
