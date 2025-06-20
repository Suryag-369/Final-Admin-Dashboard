import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ManagerSupervisorsDialog({ manager, open, onOpenChange }) {
  const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!open || !manager?.id) return; // Exit if dialog is not open or manager.id is missing

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/users/manager/${manager.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // Extract the 'employees' array from response.data, default to empty array if not present
        const data = Array.isArray(response.data.employees)
          ? response.data.employees
          : [];
        setSupervisors(data);
        console.log("Supervisors data:", data);
      } catch (e) {
        console.error("Error fetching supervisors:", e);
        setError("Failed to load supervisors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [manager?.id, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supervisors under {manager?.name || "Manager"}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {loading ? (
            <p>Loading supervisors...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : supervisors.length === 0 ? (
            <p>No supervisors found for this manager.</p>
          ) : (
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
                    <TableCell>{sup.name || "N/A"}</TableCell>
                    <TableCell>{sup.email || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

