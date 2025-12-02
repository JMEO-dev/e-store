"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ShoppingCart, Menu, Moon, Sun, User, ShoppingCartIcon, LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/authStore';
import useThemeStore from '@/store/themeStore';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard/products');
        }
    }, [isAuthenticated, router]);
    const theme = useThemeStore(state => state.theme);
    const toggleTheme = useThemeStore(state => state.toggleTheme);
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    const navItems = [
        { path: '/dashboard/products', label: 'Products', icon: Package },
        { path: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
    ];

    return (
        <div className="min-h-screen bg-background">


            {/* Top Bar */}
            <header className="sticky top-0 z-30 h-16 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="flex items-center justify-between h-full px-4 md:px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    <div className="flex-1" />



                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5" />
                            ) : (
                                <Sun className="w-5 h-5" />
                            )}
                        </Button>
                        <Button variant="ghost" size="icon">
                            <ShoppingCartIcon className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => router.push('/auth')}>
                            <LogInIcon className="w-5 h-5" />
                        </Button>

                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="p-4 md:p-6">
                {children}
            </main>

        </div>
    );
}