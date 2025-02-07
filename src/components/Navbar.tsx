'use client';
import React from 'react';

import { Menu, X, Home, MapPin, Building2, Heart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

// Remove unused IconProps interface and use LucideIcon type
type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    icon: LucideIcon;
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        {
            name: "Explore",
            href: "/explore",
            icon: Home,
        },
        {
            name: "Neighborhoods",
            href: "/neighborhoods",
            icon: MapPin,
        },
        {
            name: "Property Types",
            href: "/properties",
            icon: Building2,
        },
        {
            name: "Saved Homes",
            href: "/saved",
            icon: Heart,
        }
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#DFDDD8]/80 backdrop-blur-xl border-b border-[#373330]/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="relative z-10">
                        <span className="text-2xl font-light tracking-tight text-[#373330]">
                            Rent<span className="font-normal text-[#4E6053]">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.name} href={link.href} icon={link.icon}>
                                {link.name}
                            </NavLink>
                        ))}
                        <button className="bg-[#373330] hover:bg-[#4E6053] px-5 py-2 rounded-xl text-white text-sm transition-colors">
                            List Property
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 -mr-2 md:hidden hover:bg-[#373330]/5 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-[#373330]" />
                        ) : (
                            <Menu className="w-6 h-6 text-[#373330]" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute top-full left-0 right-0 bg-[#DFDDD8]/95 backdrop-blur-xl border-t border-[#373330]/10 transition-all duration-300 md:hidden
                    ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
            >
                <div className="p-6 space-y-4">
                    {navLinks.map((link) => (
                        <MobileNavLink key={link.name} href={link.href} icon={link.icon}>
                            {link.name}
                        </MobileNavLink>
                    ))}
                    <button className="w-full bg-[#373330] hover:bg-[#4E6053] px-5 py-3 rounded-xl text-white text-sm transition-colors mt-4">
                        List Property
                    </button>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children, icon: Icon }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 text-sm text-[#373330]/70 hover:text-[#373330] transition-colors group"
        >
            <Icon className="w-4 h-4 group-hover:text-[#4E6053] transition-colors" />
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children, icon: Icon }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 text-lg text-[#373330]/70 hover:text-[#373330] transition-colors"
        >
            <Icon className="w-5 h-5" />
            {children}
        </Link>
    );
} 