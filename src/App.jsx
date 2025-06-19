import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { LoginForm } from "@/components/login-form"
import { useEffect, useState } from "react"
import { EmployeeTable } from "@/components/Employee/EmployeeTable.jsx"
import { Outlet } from "react-router-dom"

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-white">
            <SidebarProvider
                style={{
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 14)",
                }}
            >
                <AppSidebar variant="inset" />
                <SidebarInset className="bg-transparent">
                    <SiteHeader />
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <div className="@container/main flex flex-1 flex-col">
                            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
                                {/* Background decorative elements */}
                                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                                    <div className="absolute top-20 right-20 w-72 h-72 bg-green-100/30 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-50/10 to-blue-50/10 rounded-full blur-3xl"></div>
                                </div>

                                {/* Main content area */}
                                <div className="relative z-10">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}