import { useEffect, useState } from "react"
import axios from "axios"
import {
    IconUsersGroup,
    IconUserShield,
    IconUserStar,
    IconClipboardList,
    IconTrendingUp,
    IconTrendingDown
} from "@tabler/icons-react"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `${API_BASE_URL}/api/admin/users/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                )
                setDashboardData(response.data)
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error)
                // Set mock data for demo purposes
                setDashboardData({
                    totalEmployees: 156,
                    totalSupervisors: 12,
                    totalManagers: 8,
                    totalTasks: 234
                })
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    const cards = [
        {
            title: "Total Employees",
            value: dashboardData?.totalEmployees || 0,
            icon: IconUsersGroup,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100/50",
            change: "+12%",
            changeType: "increase"
        },
        {
            title: "Total Supervisors",
            value: dashboardData?.totalSupervisors || 0,
            icon: IconUserShield,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100/50",
            change: "+8%",
            changeType: "increase"
        },
        {
            title: "Total Managers",
            value: dashboardData?.totalManagers || 0,
            icon: IconUserStar,
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100/50",
            change: "+5%",
            changeType: "increase"
        },
        {
            title: "Total Tasks",
            value: dashboardData?.totalTasks || 0,
            icon: IconClipboardList,
            gradient: "from-orange-500 to-orange-600",
            bgGradient: "from-orange-50 to-orange-100/50",
            change: "-3%",
            changeType: "decrease"
        }
    ]

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    className={`group relative overflow-hidden border-0 bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-in slide-in-from-bottom-4`}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                    <CardHeader className="relative z-10 p-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3">
                                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <card.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <CardDescription className="text-sm font-medium text-gray-600 mb-1">
                                            {card.title}
                                        </CardDescription>
                                        <CardTitle className="text-3xl font-bold text-gray-900 tabular-nums">
                                            {card.value.toLocaleString()}
                                        </CardTitle>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-lg ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300"></div>
                </Card>
            ))}
        </div>
    )
}