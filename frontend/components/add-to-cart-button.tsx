"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/lib/api";

export default function AddToCartButton({ productId, productName }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId") || "guest";
      await addToCart(userId, productId, quantity);
      toast({ title: "Added to cart", description: `${quantity} ${productName}` });
    } catch {
      toast({ title: "Error", description: "Failed to add product.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <Button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus /></Button>
        <span className="mx-4">{quantity}</span>
        <Button onClick={() => setQuantity(q => q + 1)}><Plus /></Button>
      </div>
      <Button onClick={handleAddToCart} disabled={isLoading} className="mt-2">
        <ShoppingCart className="mr-2" /> Add to Cart
      </Button>
    </div>
  );
}