"use client"

import { WishlistForm } from "@/components/Wishlist/WishlistForm"
import { WishlistList } from "@/components/Wishlist/WishlistList"
import { useWishlist } from "@/lib/hooks"

export default function WishlistPage() {
    const { items, loading, refresh, addWishlistItem, deleteWishlistItem, convertToTransaction } = useWishlist()

    if (loading) {
        return (
            <div className="p-4 md:p-8 flex items-center justify-center min-h-[50vh]">
                <div className="text-center space-y-2">
                    <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground">Loading wishlist…</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Cool Down Wishlist</h1>
                <p className="text-sm text-muted-foreground mt-1">Avoid impulse buys — add items here and wait for the cool-down period.</p>
            </div>

            <div className="grid gap-4 md:gap-6 md:grid-cols-[350px,1fr]">
                <div>
                    <WishlistForm onAdd={(data) => { addWishlistItem(data); refresh(); }} />
                </div>
                <div>
                    <WishlistList
                        items={items}
                        onDelete={(id) => { deleteWishlistItem(id); refresh(); }}
                        onConvert={(id) => { convertToTransaction(id); refresh(); }}
                    />
                </div>
            </div>
        </div>
    )
}
