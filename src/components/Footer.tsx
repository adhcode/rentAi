'use client';

import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        "For Renters": [
            { name: "Search Homes", href: "/search" },
            { name: "Neighborhoods", href: "/neighborhoods" },
            { name: "AI Search Guide", href: "/guide" },
            { name: "Saved Homes", href: "/saved" },
        ],
        "For Property Owners": [
            { name: "List Your Property", href: "/list" },
            { name: "Landlord Dashboard", href: "/dashboard" },
            { name: "Property Management", href: "/management" },
            { name: "Success Stories", href: "/stories" },
        ],
        "Company": [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Press", href: "/press" },
            { name: "Contact", href: "/contact" },
        ],
        "Resources": [
            { name: "Help Center", href: "/help" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Blog", href: "/blog" },
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: "/social/facebook", id: "facebook" },
        { icon: Instagram, href: "/social/instagram", id: "instagram" },
        { icon: Twitter, href: "/social/twitter", id: "twitter" },
        { icon: Youtube, href: "/social/youtube", id: "youtube" },
    ];

    return (
        <footer className="bg-[#373330] text-white/80">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="block mb-6">
                            <span className="text-2xl font-light tracking-tight text-white">
                                Rent<span className="font-normal text-[#90927E]">AI</span>
                            </span>
                        </Link>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-[#90927E]" />
                                <span>Lagos, Nigeria</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[#90927E]" />
                                <a href="mailto:hello@rentai.com" className="hover:text-white transition-colors">
                                    hello@rentai.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[#90927E]" />
                                <a href="tel:+2341234567890" className="hover:text-white transition-colors">
                                    +234 123 456 7890
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="space-y-4">
                            <h3 className="text-white font-medium">{title}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer Bottom */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Copyright */}
                        <p className="text-sm text-white/60">
                            © {currentYear} RentAI. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map(({ icon: Icon, href, id }) => (
                                <a
                                    key={id}
                                    href={href}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 