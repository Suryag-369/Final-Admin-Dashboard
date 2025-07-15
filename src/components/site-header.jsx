import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider.jsx"
import { ModeToggle } from "@/components/mode-toggle.jsx"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react";

export function SiteHeader() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const name = localStorage.getItem("user") || "Admin";
    const role = localStorage.getItem("role") || "administrator";
    setUserName(name);
    setUserRole(role);
  }, []);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    navigate("/login")
  }

  return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-green-100/50 bg-white/95 backdrop-blur-sm shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1 hover:bg-green-50 hover:text-green-600 transition-colors" />
              <Separator orientation="vertical" className="mx-2 h-6 bg-green-100" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-green-600">Welcome back</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Profile */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-2 hover:bg-green-50 hover:text-green-600 transition-colors px-2 py-1 rounded-md bg-transparent border-none cursor-pointer outline-none">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium">{userName}</span>
                      <span className="text-xs text-gray-500">{userRole}</span>
                    </div>
                  </button>
                </DropdownMenu.Trigger>
                
                <DropdownMenu.Portal>
                  <DropdownMenu.Content 
                    align="end" 
                    sideOffset={8}
                    className="z-[9999] min-w-[180px] max-w-[220px] bg-white rounded-lg border border-gray-200 shadow-xl p-2 animate-in fade-in-0 zoom-in-95 duration-200"
                  >
                    <DropdownMenu.Label className="px-3 py-2 text-sm font-semibold text-gray-900 border-b border-gray-100 mb-1">
                      My Account
                    </DropdownMenu.Label>
                    <DropdownMenu.Item className="flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50 text-gray-700 data-[highlighted]:bg-gray-50">
                      Profile Settings
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />
                    <DropdownMenu.Item 
                      className="flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-red-50 focus:bg-red-50 text-red-600 data-[highlighted]:bg-red-50"
                      onSelect={() => setLogoutDialogOpen(true)}
                    >
                      Log out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              {/* Theme Toggle */}
              {/* <ModeToggle />  */}
            </div>
          </div>
        </header>

        {/* Logout Confirmation Dialog */}
        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Confirm Logout
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to log out?
              </p>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-3 mt-6">
              <Button
                  // variant="outline"
                  onClick={() => setLogoutDialogOpen(false)}
                  className="px-4 py-2 border-green-600 hover:bg-green-600 hover:text-black"
              >
                Cancel
              </Button>
              <Button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
              >
                Log Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
  )
}