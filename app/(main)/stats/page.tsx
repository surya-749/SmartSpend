"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from "recharts";
import { useStats } from "@/lib/hooks";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function StatsPage() {
    const { stats, loading } = useStats();

    if (loading) {
        return (
            <div className="p-4 md:p-8 flex items-center justify-center min-h-[50vh]">
                <div className="text-center space-y-2">
                    <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground">Loading statistics…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Statistics</h2>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {/* Bar chart */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Income vs Expenses</CardTitle>
                        <CardDescription className="text-xs">Last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[220px] md:h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.monthlyStats} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
                                    <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, ""]} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    <Bar dataKey="income" fill="#22c55e" name="Income" radius={[3, 3, 0, 0]} />
                                    <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[3, 3, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Pie chart */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Spending by Category</CardTitle>
                        <CardDescription className="text-xs">This month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.categoryStats.length === 0 ? (
                            <div className="h-[220px] md:h-[300px] flex items-center justify-center text-sm text-muted-foreground">
                                No expense data yet
                            </div>
                        ) : (
                            <div className="h-[220px] md:h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.categoryStats}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) =>
                                                percent > 0.08 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                                            }
                                            outerRadius="70%"
                                            dataKey="value"
                                        >
                                            {stats.categoryStats.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, ""]} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Summary numbers */}
                <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">This Month Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Balance", value: `₹${stats.totalBalance.toLocaleString()}`, color: "text-foreground" },
                                { label: "Income", value: `₹${stats.monthlyIncome.toLocaleString()}`, color: "text-emerald-600 dark:text-emerald-400" },
                                { label: "Expenses", value: `₹${stats.monthlyExpenses.toLocaleString()}`, color: "text-rose-600 dark:text-rose-400" },
                                {
                                    label: "Net", value: `₹${stats.monthlySavings.toLocaleString()}`,
                                    color: stats.monthlySavings >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                                },
                            ].map(({ label, value, color }) => (
                                <div key={label} className="text-center p-3 rounded-xl bg-muted/50">
                                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                                    <p className={`text-lg font-bold ${color}`}>{value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
