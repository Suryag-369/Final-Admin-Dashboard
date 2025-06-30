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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export function SupervisorManagerDialog({ supervisor, open, onOpenChange, onSuccess }) {
  const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
  const [manager, setManager] = useState(null);
  const [managers, setManagers] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current manager and available managers
  useEffect(() => {
    if (!open || !supervisor?.id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch current manager details using the new endpoint
        const managerResponse = await axios.get(
          `${API_BASE_URL}/api/admin/users/supervisor/${supervisor.id}/assigned-manager`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const currentManager = managerResponse.data;
        console.log("Manager Response:", managerResponse); // Debug the response
        if (currentManager.managerName || currentManager.email) {
          setManager(currentManager);
        } else {
          setManager(null); // No manager or null response
        }
      } catch (e) {
        console.error("Error fetching manager:", e.response ? e.response.data : e.message);
        setError("Failed to load manager details. Please try again.");
      }

      try {
        // Fetch list of available managers
        const managersResponse = await axios.get(
          `${API_BASE_URL}/api/admin/users/manager-list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        let managersData = managersResponse.data || [];
        // Exclude the current manager from the dropdown if fetched
        if (manager && manager.managerName) {
          managersData = managersData.filter((m) => m.managerName !== manager.managerName);
        }
        setManagers(managersData);
      } catch (e) {
        console.error("Error fetching managers list:", e);
        setError("Failed to load available managers.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supervisor?.id, open]);

  // Handle manager change
  const handleManagerChange = async () => {
    if (!selectedManagerId) {
      toast.error("Please select a manager.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/users/${supervisor.id}/assign-manager/${selectedManagerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Manager updated successfully!");
      // Fetch the updated manager details to ensure email is included
      const updatedManagerResponse = await axios.get(
        `${API_BASE_URL}/api/admin/users/supervisor/${supervisor.id}/assigned-manager`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const newManagerData = updatedManagerResponse.data;
      if (newManagerData.managerName || newManagerData.email) {
        setManager(newManagerData);
      } else {
        setManager(null);
      }
      setSelectedManagerId(""); // Reset the selection
      setError(null); // Clear any previous error
      onSuccess?.(); // Trigger refresh in EmployeeTable

      // Re-fetch managers list to exclude the new manager
      const managersResponse = await axios.get(
        `${API_BASE_URL}/api/admin/users/manager-list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      let managersData = managersResponse.data || [];
      if (newManagerData.managerName) {
        managersData = managersData.filter((m) => m.managerName !== newManagerData.managerName);
      }
      setManagers(managersData);
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to update manager.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manager for {supervisor?.name || "Supervisor"}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {loading ? (
            <p>Loading manager details...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : !manager ? (
            <p>No manager assigned to this supervisor.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{manager.managerName || "N/A"}</TableCell>
                  <TableCell>{manager.email || "N/A"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Change Manager</h3>
            <div className="flex gap-2 items-center">
              <Select
                value={selectedManagerId}
                onValueChange={setSelectedManagerId}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Manager" />
                </SelectTrigger>
                <SelectContent>
                  {managers.map((m) => (
                    <SelectItem key={m.manageId} value={String(m.manageId)}>
                      {m.managerName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleManagerChange}
                disabled={loading || !selectedManagerId}
              >
                {loading ? "Updating..." : "Change Manager"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}