"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { removeFromCart } from "@/lib/api"
import { useRouter } from "next/navigation"

interface CartActionsProps {
  productId: string
  userId: string
}

export default function CartActions({ productId, userId }: CartActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleRemove = async () => {
    setIsLoading(true)
    try {
      await removeFromCart(userId, productId)
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleRemove}
      disabled={isLoading}
      className="flex-shrink-0 self-start"
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Remove item</span>
    </Button>
  )
}
