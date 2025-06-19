"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import {
    IconClipboardList,
    IconClipboardCheck,
    IconCheck,
    IconX
} from "@tabler/icons-react"

export default function ReportsPage() {
    const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

    const [detailed, setDetailed] = useState(null)
    const [efficiency, setEfficiency] = useState(null)
    const [trend, setTrend] = useState(null)
    const [performance, setPerformance] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        const headers = { Authorization: `Bearer ${token}` }

        Promise.all([
            axios.get(`${API_BASE_URL}/api/tasks/report/detailed`, { headers }),
            axios.get(`${API_BASE_URL}/api/tasks/report/efficiency`, { headers }),
            axios.get(`${API_BASE_URL}/api/tasks/report/trend`, { headers }),
            axios.get(`${API_BASE_URL}/api/tasks/report/performance`, { headers })
        ]).then(([detailedRes, efficiencyRes, trendRes, performanceRes]) => {
            setDetailed(detailedRes.data)
            setEfficiency(efficiencyRes.data)
            setTrend(trendRes.data)
            setPerformance(performanceRes.data)
            setLoading(false)
        }).catch(error => {
            console.error("Failed to fetch report data:", error)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            </div>
        )
    }

    if (!detailed || !efficiency || !trend || !performance) return <p className="p-4">Loading reports...</p>

    const trendDates = [...new Set([
        ...trend.tasksCreated.map(item => item.date),
        ...trend.tasksCompleted.map(item => item.date)
    ])].sort()

    const trendData = trendDates.map(date => {
        const created = trend.tasksCreated.find(d => d.date === date)?.count || 0;
        const completed = trend.tasksCompleted.find(d => d.date === date)?.count || 0;
        return { date, Created: created, Completed: completed };
    })

    const typeData = Object.entries(detailed.tasksByType).map(([key, value]) => ({
        type: key,
        count: value
    }))

    const efficiencyByType = Object.entries(efficiency.avgTimesByType).map(([key, value]) => ({
        type: key,
        avgTime: value
    }))

    const efficiencyByUser = Object.entries(efficiency.avgTimesByUser).map(([key, value]) => ({
        user: key,
        avgTime: value
    }))

    // Enhanced cards data with styling
    const summaryCards = [
        {
            title: "Total Tasks",
            value: detailed?.totalTasks ?? 0,
            icon: IconClipboardList,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100/50",
        },
        {
            title: "Submitted",
            value: detailed?.tasksByStatus?.submitted ?? 0,
            icon: IconClipboardCheck,
            gradient: "from-yellow-500 to-yellow-600",
            bgGradient: "from-yellow-50 to-yellow-100/50",
        },
        {
            title: "Approved",
            value: detailed?.tasksByStatus?.approved ?? 0,
            icon: IconCheck,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100/50",
        },
        {
            title: "Rejected",
            value: detailed?.tasksByStatus?.rejected ?? 0,
            icon: IconX,
            gradient: "from-red-500 to-red-600",
            bgGradient: "from-red-50 to-red-100/50",
        }
    ]

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryCards.map((card, index) => (
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

            <Tabs defaultValue="types" className="w-full">
                <TabsList>
                    <TabsTrigger value="types">By Type</TabsTrigger>
                    <TabsTrigger value="trend">Task Trends</TabsTrigger>
                    <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                    <TabsTrigger value="users">By User</TabsTrigger>
                </TabsList>

                <TabsContent value="trend">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Trend Overview</h3>
                        </CardHeader>
                        <CardContent className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Created" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="Completed" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="types">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Type Distribution</h3>
                        </CardHeader>
                        <CardContent className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={typeData}>
                                    <XAxis dataKey="type" interval={0} angle={-45} textAnchor="end" height={100} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="green" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">User Performance</h3>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Assigned</TableHead>
                                        <TableHead>Completed</TableHead>
                                        <TableHead>Rate (%)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(performance.avgCompletionTimeByUser)
                                        .sort(([, a], [, b]) => b.completed - a.completed)
                                        .map(([user, stats]) => (
                                            <TableRow key={user}>
                                                <TableCell>{user}</TableCell>
                                                <TableCell>{stats.total}</TableCell>
                                                <TableCell>{stats.completed}</TableCell>
                                                <TableCell>{stats.rate}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="efficiency">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Average Completion Time by Type</CardTitle>
                            </CardHeader>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={efficiencyByType}>
                                        <XAxis dataKey="type" interval={0} angle={-45} textAnchor="end" height={100} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="avgTime" fill="#34d399" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Average Completion Time by User</CardTitle>
                            </CardHeader>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={efficiencyByUser}>
                                        <XAxis dataKey="user" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="avgTime" fill="#fbbf24" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}