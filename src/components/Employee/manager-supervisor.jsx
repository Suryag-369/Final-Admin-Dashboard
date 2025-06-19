import {useEffect, useState} from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export function ManagerSupervisorsDialog({ manager, open, onOpenChange }) {
    const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

    const [supervisors, setSupervisors] = useState([])
    const [id, setId] = useState(manager.id)
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`${API_BASE_URL}/api/admin/users/manager/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                setSupervisors(response.data);
                console.log(response.data);

            }catch(e){
                console.error(e);
            }
        }
        if (open) {
            fetchData();
        }
    }, [id, open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Supervisors under {manager.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {supervisors.map((sup) => (
                                <TableRow key={sup.id}>
                                    <TableCell>{sup.name}</TableCell>
                                    <TableCell>{sup.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}