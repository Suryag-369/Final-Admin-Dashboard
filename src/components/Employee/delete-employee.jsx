import {
    Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"

export function DeleteEmployeeDialog({ employee, onSuccess,open, onOpenChange }) {
    const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

    const [loading, setLoading] = useState(false)
    const handleDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`${API_BASE_URL}/api/admin/users/${employee.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            onOpenChange(false)
            onSuccess?.()
        } catch (err) {
            alert("Failed to delete user")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete <strong>{employee.name}</strong>?</p>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
