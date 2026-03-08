"use client";

import { SummaryCards } from "@/components/Dashboard/SummaryCards";
import { SpendingChart } from "@/components/Dashboard/SpendingChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransactions, useStats } from "@/lib/hooks";

export default function Dashboard() {
    const { transactions, loading: transLoading } = useTransactions();
    const { stats, loading: statsLoading } = useStats();

    const loading = transLoading || statsLoading;

    if (loading) {
        return (
            <div className="p-4 md:p-8 flex items-center justify-center min-h-[50vh]">
                <div className="text-center space-y-2">
                    <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground">Loading dashboard…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
                <Link href="/log">
                    <Button size="sm" className="text-xs md:text-sm">+ Log</Button>
                </Link>
            </div>

            <SummaryCards stats={stats} />

            {/* Chart + Recent Transactions — stack on mobile */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <SpendingChart data={stats.monthlyStats} />
                </div>

                <Card className="lg:col-span-3">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions.slice(0, 5).map((t) => (
                                <div key={t.id} className="flex items-center gap-3">
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${t.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
                                        {t.type === "income" ? (
                                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{t.category}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {t.description || "No description"}
                                        </p>
                                    </div>
                                    <div className={`text-sm font-semibold shrink-0 ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                                        {t.type === "income" ? "+" : "-"}₹{t.amount.toFixed(0)}
                                    </div>
                                </div>
                            ))}
                            {transactions.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground py-4">
                                    No transactions yet. <Link href="/log" className="text-indigo-500 underline">Add one</Link>
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
