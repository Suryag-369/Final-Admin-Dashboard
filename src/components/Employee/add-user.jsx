// // import {
// //     Dialog,
// //     DialogTrigger,
// //     DialogContent,
// //     DialogHeader,
// //     DialogTitle,
// //     DialogFooter,
// // } from "@/components/ui/dialog.jsx"
// // import { Input } from "@/components/ui/input.jsx"
// // import { Button } from "@/components/ui/button.jsx"
// // import { Label } from "@/components/ui/label.jsx"
// // import {
// //     Select,
// //     SelectTrigger,
// //     SelectValue,
// //     SelectContent,
// //     SelectItem,
// // } from "@/components/ui/select.jsx"
// // import { useState, useEffect } from "react"
// // import axios from "axios";

// // export default function AddUserDialog() {

// //     const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

// //     const [open, setOpen] = useState(false)
// //     const [formData, setFormData] = useState({
// //         name: "",
// //         email: "",
// //         phone_number: "",
// //         role: "SUPERVISOR",
// //         managerId: "", // Only required if role is SUPERVISOR
// //     })
// //     const [loading, setLoading] = useState(false)
// //     const [managers, setManagers] = useState([])

// //     useEffect(() => {
// //         if (formData.role === "SUPERVISOR") {
// //             fetch(`${API_BASE_URL}/api/admin/users/manager-list`, {
// //                 headers: {
// //                     Authorization:
// //                         `Bearer ${localStorage.getItem('accessToken')}`
// //                 },
// //             })
// //                 .then((res) => res.json())
// //                 .then((data) => setManagers(data))
// //                 .catch(() => alert("Failed to load managers"))
// //         }
// //     }, [formData.role])

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value })
// //     }

// //     const handleRoleChange = (value) => {
// //         setFormData({
// //             ...formData,
// //             role: value,
// //             managerId: "", // reset if switching roles
// //         })
// //     }

// //     const handleSubmit = async () => {
// //         setLoading(true)
// //         const payload = {
// //             name: formData.name,
// //             email: formData.email,
// //             phone_number: formData.phone_number,
// //             role: formData.role,
// //         }
// //         if (formData.role === "SUPERVISOR" && formData.managerId) {
// //             payload.managerId = parseInt(formData.managerId)
// //         }

// //         try {
// //             const token = localStorage.getItem("accessToken")

// //             const res = await axios.post(
// //                 `${API_BASE_URL}/api/admin/users`,
// //                 payload,
// //                 {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 }
// //             )
// //             console.log(res.data)
// //             // Success
// //             setFormData({
// //                 name: "",
// //                 email: "",
// //                 phone_number: "",
// //                 role: "SUPERVISOR",
// //                 managerId: "",
// //             })
// //             setOpen(false)
// //         } catch (err) {
// //             const message =
// //                 err?.response?.data?.message || "Failed to add user. Please try again."
// //             alert("Error: " + message)
// //         } finally {
// //             setLoading(false)
// //         }
// //     }


// //     return (
// //         <Dialog open={open} onOpenChange={setOpen}>
// //             <DialogTrigger asChild>
// //                 <Button>Add User</Button>
// //             </DialogTrigger>
// //             <DialogContent>
// //                 <DialogHeader>
// //                     <DialogTitle>Add New User</DialogTitle>
// //                 </DialogHeader>

// //                 <div className="grid gap-4 py-4">
// //                     <div className="grid grid-cols-4 items-center gap-4">
// //                         <Label htmlFor="name" className="text-right">
// //                             Name *          
// //                         </Label>
// //                         <Input
// //                             id="name"
// //                             name="name"
// //                             value={formData.name}
// //                             onChange={handleChange}
// //                             className="col-span-3"
// //                             required
// //                         />
// //                     </div>
// //                     <div className="grid grid-cols-4 items-center gap-4">
// //                         <Label htmlFor="email" className="text-right">
// //                             Email *
// //                         </Label>
// //                         <Input
// //                             id="email"
// //                             name="email"
// //                             value={formData.email}
// //                             onChange={handleChange}
// //                             className="col-span-3"
// //                             required
// //                         />
// //                     </div>
// //                     <div className="grid grid-cols-4 items-center gap-4">
// //                         <Label htmlFor="phone_number" className="text-right">
// //                             Phone
// //                         </Label>
// //                         <Input
// //                             id="phone_number"
// //                             name="phone_number"
// //                             value={formData.phone_number}
// //                             onChange={handleChange}
// //                             className="col-span-3"
// //                         />
// //                     </div>
// //                     <div className="grid grid-cols-4 items-center gap-4">
// //                         <Label htmlFor="role" className="text-right">
// //                             Role
// //                         </Label>
// //                         <Select value={formData.role} onValueChange={handleRoleChange}>
// //                             <SelectTrigger className="col-span-3">
// //                                 <SelectValue />
// //                             </SelectTrigger>
// //                             <SelectContent>
// //                                 <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
// //                                 <SelectItem value="MANAGER">Manager</SelectItem>
// //                             </SelectContent>
// //                         </Select>
// //                     </div>

// //                     {formData.role === "SUPERVISOR" && (
// //                         <div className="grid grid-cols-4 items-center gap-4">
// //                             <Label htmlFor="managerId" className="text-right">
// //                                 Assign Manager
// //                             </Label>
// //                             <Select
// //                                 value={formData.managerId}
// //                                 onValueChange={(v) => setFormData({ ...formData, managerId: v })}
// //                             >
// //                                 <SelectTrigger className="col-span-3">
// //                                     <SelectValue placeholder="Select Manager" />
// //                                 </SelectTrigger>
// //                                 <SelectContent>
// //                                     {managers.map((m) => (
// //                                         <SelectItem key={m.manageId} value={String(m.manageId)}>
// //                                             {m.managerName}
// //                                         </SelectItem>
// //                                     ))}
// //                                 </SelectContent>
// //                             </Select>
// //                         </div>
// //                     )}
// //                 </div>

// //                 <DialogFooter>
// //                     <Button
// //                         onClick={handleSubmit}
// //                         disabled={
// //                             loading ||
// //                             !formData.name.trim() ||
// //                             !formData.email.trim() ||
// //                             (formData.role === "SUPERVISOR" && !formData.managerId)
// //                         }
// //                     >
// //                         {loading ? "Adding..." : "Add User"}
// //                     </Button>
// //                 </DialogFooter>
// //             </DialogContent>
// //         </Dialog>
// //     )
// // }
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog.jsx";
// import { Input } from "@/components/ui/input.jsx";
// import { Button } from "@/components/ui/button.jsx";
// import { Label } from "@/components/ui/label.jsx";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select.jsx";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddUserDialog({ onSuccess }) {
//   const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     role: "SUPERVISOR",
//     managerId: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [managers, setManagers] = useState([]);

//   useEffect(() => {
//     if (formData.role === "SUPERVISOR") {
//       fetch(`${API_BASE_URL}/api/admin/users/manager-list`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setManagers(data))
//         .catch(() => alert("Failed to load managers"));
//     }
//   }, [formData.role]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRoleChange = (value) => {
//     setFormData({
//       ...formData,
//       role: value,
//       managerId: "", // Reset if switching roles
//     });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const payload = {
//       name: formData.name,
//       email: formData.email,
//       phone_number: formData.phone_number,
//       role: formData.role,
//     };
//     if (formData.role === "SUPERVISOR" && formData.managerId) {
//       payload.managerId = parseInt(formData.managerId);
//     }

//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.post(`${API_BASE_URL}/api/admin/users`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(res.data);
//       setFormData({
//         name: "",
//         email: "",
//         phone_number: "",
//         role: "SUPERVISOR",
//         managerId: "",
//       });
//       setOpen(false);
//       onSuccess(); // Trigger refresh in EmployeeTable
//     } catch (err) {
//       const message =
//         err?.response?.data?.message || "Failed to add user. Please try again.";
//       alert("Error: " + message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>Add User</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add New User</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name *
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="col-span-3"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="email" className="text-right">
//               Email *
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="col-span-3"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="phone_number" className="text-right">
//               Phone
//             </Label>
//             <Input
//               id="phone_number"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="role" className="text-right">
//               Role
//             </Label>
//             <Select value={formData.role} onValueChange={handleRoleChange}>
//               <SelectTrigger className="col-span-3">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
//                 <SelectItem value="MANAGER">Manager</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           {formData.role === "SUPERVISOR" && (
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="managerId" className="text-right">
//                 Assign Manager
//               </Label>
//               <Select
//                 value={formData.managerId}
//                 onValueChange={(v) => setFormData({ ...formData, managerId: v })}
//               >
//                 <SelectTrigger className="col-span-3">
//                   <SelectValue placeholder="Select Manager" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {managers.map((m) => (
//                     <SelectItem key={m.manageId} value={String(m.manageId)}>
//                       {m.managerName}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           )}
//         </div>
//         <DialogFooter>
//           <Button
//             onClick={handleSubmit}
//             disabled={
//               loading ||
//               !formData.name.trim() ||
//               !formData.email.trim() ||
//               (formData.role === "SUPERVISOR" && !formData.managerId)
//             }
//           >
//             {loading ? "Adding..." : "Add User"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddUserDialog({ onSuccess }) {
  const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "SUPERVISOR",
    managerId: "",
  });
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    if (formData.role === "SUPERVISOR") {
      fetch(`${API_BASE_URL}/api/admin/users/manager-list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setManagers(data))
        .catch(() => toast.error("Failed to load managers"));
       
    }
  }, [formData.role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
      managerId: "", // Reset if switching roles
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      role: formData.role,
    };
    if (formData.role === "SUPERVISOR" && formData.managerId) {
      payload.managerId = parseInt(formData.managerId);
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(`${API_BASE_URL}/api/admin/users`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      toast.success("User added successfully!");
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        role: "SUPERVISOR",
        managerId: "",
      });
      setOpen(false);
      onSuccess(); // Trigger refresh in EmployeeTable
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to add user. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone_number" className="text-right">
              Phone
            </Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.role === "SUPERVISOR" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="managerId" className="text-right">
                Assign Manager
              </Label>
              <Select
                value={formData.managerId}
                onValueChange={(v) => setFormData({ ...formData, managerId: v })}
              >
                <SelectTrigger className="col-span-3">
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
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={
              loading ||
              !formData.name.trim() ||
              !formData.email.trim() ||
              (formData.role === "SUPERVISOR" && !formData.managerId)
            }
          >
            {loading ? "Adding..." : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
