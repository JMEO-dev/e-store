'use client';
import { useState } from "react";
import { mockProducts } from "@/lib/mockData";
import { CATEGORIES } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search } from "lucide-react";
import { toast } from "sonner";

export default function Products() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("name");

    const filteredProducts = mockProducts
        .filter((product) => product.active)
        .filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            return a.name.localeCompare(b.name);
        });

    const handleAddToCart = (productName: string) => {
        toast.success(`${productName} added to cart!`);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}

            {/* Filters Section */}
            <section className="border-b bg-card/50">
                <div className="container px-4 py-6 mx-auto">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="container px-4 py-12 mx-auto">
                {filteredProducts.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 text-sm text-muted-foreground">
                            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product, index) => (
                                <Card
                                    key={product.id}
                                    className="transition-all duration-300 group hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <CardContent className="p-0">
                                        <div className="relative overflow-hidden rounded-t-lg aspect-square bg-muted">
                                            {product.imageUrl ? (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20">
                                                    <span className="text-4xl font-bold text-muted-foreground/30">
                                                        {product.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                            {product.stockQuantity < 10 && product.stockQuantity > 0 && (
                                                <div className="absolute px-2 py-1 text-xs font-medium rounded-full top-3 right-3 bg-destructive text-destructive-foreground">
                                                    Only {product.stockQuantity} left
                                                </div>
                                            )}
                                            {product.stockQuantity === 0 && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                                    <span className="text-lg font-semibold text-muted-foreground">Out of Stock</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <div className="text-xs tracking-wide uppercase text-muted-foreground">
                                                {product.category}
                                            </div>
                                            <h3 className="text-lg font-semibold line-clamp-1">
                                                {product.name}
                                            </h3>
                                            {product.description && (
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {product.description}
                                                </p>
                                            )}
                                            <div className="pt-2 text-2xl font-bold text-primary">
                                                ${product.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button
                                            onClick={() => handleAddToCart(product.name)}
                                            disabled={product.stockQuantity === 0}
                                            className="w-full"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
