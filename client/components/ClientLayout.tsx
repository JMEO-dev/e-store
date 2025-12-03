// app/ClientLayout.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Moon, Sun, ShoppingCartIcon, LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useThemeStore from '@/store/themeStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const theme = useThemeStore(state => state.theme);
    const toggleTheme = useThemeStore(state => state.toggleTheme);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <div className="min-h-screen bg-background">
            {/* Top Bar */}
            <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="flex items-center justify-between h-16 px-4 md:px-8">
                    <div className="text-lg font-bold">My Store</div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
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

            {/* Main Content */}
            <main className="container p-4 mx-auto md:p-6">
                {children}
            </main>
        </div>
    );
}