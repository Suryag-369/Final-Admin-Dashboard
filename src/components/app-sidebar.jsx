// import * as React from "react"
// import {
//   IconBook,
//   IconCamera,
//   IconChartBar,
//   IconDashboard,
//   IconDatabase,
//   IconDoorExit,
//   IconFileAi,
//   IconFileDescription,
//   IconFileWord,
//   IconFolder,
//   IconHelp,
//   IconInnerShadowTop,
//   IconPackage,
//   IconUsers,
// } from "@tabler/icons-react"

// import { NavDocuments } from "@/components/nav-documents"
// import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
// import { NavUser } from "@/components/nav-user"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"

// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"

// import { Button } from "@/components/ui/button"
// import { Users, Leaf } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import iconImage from '@/assets/icon.jpeg';

// const data = {
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/dashboard",
//       icon: IconDashboard,
//     },
//     { 
//       title: "Employees",
//       url: "/dashboard/employees",
//       icon: Users,
//     },
//     {
//       title: "Reports",
//       url: "/dashboard/reports",
//       icon: IconChartBar,
//     },
//     {
//       title: "Catlog",
//       url: "/dashboard/catlog",
//       icon: IconBook,
//     },
//   ],
// }

// export function AppSidebar({ ...props }) {
//   const [open, setOpen] = React.useState(false)
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     // Optional: Clear tokens or session storage
//     localStorage.removeItem('accessToken')
//     localStorage.removeItem('user')
//     localStorage.removeItem('role')
//     navigate("/login")
//   }

//   return (
//       <Sidebar collapsible="offcanvas" {...props} className="border-r border-green-100/50 bg-gradient-to-b from-green-50/30 to-white backdrop-blur-sm">
//         <SidebarHeader className="border-b border-green-100/50 bg-white/80 backdrop-blur-sm">
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:! hover:bg-green-50/50 transition-colors">

//                 <a href="#" className="flex items-center gap-3 h-fit">
//                   <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg overflow-hidden">
//                     <img
//                         src={iconImage}
//                         alt="Kapil Agro Icon"
//                         className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <span className="text-lg font-bold text-gray-900">Kapil Agro</span>
//                     <span className="text-xs text-green-600 font-medium">Admin Dashboard</span>
//                   </div>
//                 </a>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarHeader>

//         <SidebarContent className="px-2 py-4">
//           <div className="">
//             <SidebarGroup>
//               <SidebarGroupContent className="flex flex-col gap-1">
//                 <SidebarMenu>
//                   {data.navMain.map((item) => (
//                       <SidebarMenuItem key={item.title}>
//                         <SidebarMenuButton
//                             tooltip={item.title}
//                             onClick={() => navigate(item.url)}
//                             className="group relative overflow-hidden rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-700 hover:shadow-sm data-[active=true]:bg-green-100 data-[active=true]:text-green-800 data-[active=true]:shadow-md"
//                         >
//                           <div className="absolute inset-0 bg-gradient-to-r   group-hover:opacity-100 transition-opacity duration-200" />
//                           <div className="flex items-center gap-3 relative z-10">
//                             {item.icon && <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />}
//                             <span className="font-medium">{item.title}</span>
//                           </div>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                   ))}
//                 </SidebarMenu>
//               </SidebarGroupContent>
//             </SidebarGroup>
//           </div>
//         </SidebarContent>

//         <SidebarFooter className="border-t border-green-100/50  backdrop-blur-sm p-4">
//           <SidebarGroup>
//             <SidebarGroupContent className="flex flex-col gap-2">
//               <SidebarMenu>
//                 <Dialog open={open} onOpenChange={setOpen}>
//                   <SidebarMenuItem>
//                     <DialogTrigger asChild>
//                       <SidebarMenuButton className="group w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-red-50 hover:text-red-600 text-gray-600">
//                         <div className="flex items-center gap-3">
//                           <IconDoorExit className="w-5 h-5 transition-transform group-hover:scale-110" />
//                           <span className="font-medium">Log Out</span>
//                         </div>
//                       </SidebarMenuButton>
//                     </DialogTrigger>
//                   </SidebarMenuItem>

//                   <DialogContent className="sm:max-w-[425px]">
//                     <DialogHeader>
//                       <DialogTitle className="text-lg font-semibold text-gray-900">
//                         Confirm Logout
//                       </DialogTitle>
//                       <p className="text-sm text-gray-600 mt-2">
//                         Are you sure you want to log out?
//                       </p>
//                     </DialogHeader>
//                     <DialogFooter className="flex justify-end gap-3 mt-6">
//                       <Button
//                           variant="outline"
//                           onClick={() => setOpen(false)}
//                           className="px-4 py-2 border-green-600 hover:bg-green-600"
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                           onClick={handleLogout}
//                           className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
//                       >
//                         Log Out
//                       </Button>
//                     </DialogFooter>
//                   </DialogContent>
//                 </Dialog>
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarFooter>
//       </Sidebar>
//   )
// }

import * as React from 'react';
import {
  IconBook,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconDoorExit,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconPackage,
  IconUsers,
} from '@tabler/icons-react';
import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import iconImage from '@/assets/icon.jpeg';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Employees',
      url: '/employees',
      icon: Users,
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: IconChartBar,
    },
    {
      title: 'Catlog',
      url: '/catlog',
      icon: IconBook,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="border-r border-green-100/50 bg-gradient-to-b from-green-50/30 to-white backdrop-blur-sm"
    >
      <SidebarHeader className="border-b border-green-100/50 bg-white/80 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:! hover:bg-green-50/50 transition-colors"
            >
              <a href="#" className="flex items-center gap-3 h-fit">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg overflow-hidden">
                  <img src={iconImage} alt="Kapil Agro Icon" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">Kapil Agro</span>
                  <span className="text-xs text-green-600 font-medium">Admin Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <div className="">
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-1">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => navigate(item.url)}
                      className="group relative overflow-hidden rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-700 hover:shadow-sm data-[active=true]:bg-green-100 data-[active=true]:text-green-800 data-[active=true]:shadow-md"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="flex items-center gap-3 relative z-10">
                        {item.icon && <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />}
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-green-100/50 backdrop-blur-sm p-4">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <Dialog open={open} onOpenChange={setOpen}>
                <SidebarMenuItem>
                  <DialogTrigger asChild>
                    <SidebarMenuButton className="group w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-red-50 hover:text-red-600 text-gray-600">
                      <div className="flex items-center gap-3">
                        <IconDoorExit className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span className="font-medium">Log Out</span>
                      </div>
                    </SidebarMenuButton>
                  </DialogTrigger>
                </SidebarMenuItem>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-900">Confirm Logout</DialogTitle>
                    <p className="text-sm text-gray-600 mt-2">Are you sure you want to log out?</p>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => setOpen(false)} className="px-4 py-2 border-green-600 hover:bg-green-600">
                      Cancel
                    </Button>
                    <Button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white">
                      Log Out
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}