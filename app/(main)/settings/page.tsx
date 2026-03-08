"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, AlertTriangle, User, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
    const [clearing, setClearing] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const handleClearData = async () => {
        if (!confirm("Are you sure you want to delete ALL your transaction history? This cannot be undone.")) {
            return;
        }
        setClearing(true);
        try {
            const res = await fetch("/api/transactions/clear", { method: "DELETE" });
            if (res.ok) {
                alert("All data cleared.");
                router.push("/dashboard");
            } else {
                alert("Failed to clear data.");
            }
        } catch {
            alert("An error occurred.");
        } finally {
            setClearing(false);
        }
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h2>

            {/* Account info */}
            {session?.user && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <User className="h-4 w-4" /> Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <p className="font-medium text-sm">{session.user.name}</p>
                                <p className="text-xs text-muted-foreground">{session.user.email}</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50"
                            >
                                Sign Out
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* App info */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Bell className="h-4 w-4" /> App Information
                    </CardTitle>
                    <CardDescription>Smart Spend — Personal Finance Manager</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Your data is stored securely in a private database tied to your account.
                    </p>
                </CardContent>
            </Card>

            {/* Danger zone */}
            <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <CardTitle className="text-red-600 text-base">Danger Zone</CardTitle>
                    </div>
                    <CardDescription className="text-red-600/80">
                        Irreversible actions that affect your data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h4 className="font-medium text-sm text-red-900 dark:text-red-200">Clear All Transaction Data</h4>
                            <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                                Permanently deletes all your transactions.
                            </p>
                        </div>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleClearData}
                            disabled={clearing}
                            className="w-full sm:w-auto"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {clearing ? "Clearing…" : "Clear Data"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
