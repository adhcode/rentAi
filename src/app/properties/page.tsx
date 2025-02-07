'use client';

import React from 'react';
import { useState } from 'react';
import { Building2, Home, Castle, Hotel, Warehouse, Building, Star, ArrowRight, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PropertyType {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    count: number;
    image: string;
    features: string[];
    priceRange: string;
    popular?: boolean;
}

export default function PropertyTypesPage() {
    const propertyTypes: PropertyType[] = [
        {
            id: 'apartments',
            name: 'Apartments',
            description: 'Modern living spaces from studios to penthouses',
            icon: Building2,
            count: 450,
            image: '/apartment.jpg',
            features: ['24/7 Security', 'Parking', 'Gym', 'Pool'],
            priceRange: '₦2M - ₦15M/year',
            popular: true
        },
        {
            id: 'houses',
            name: 'Houses',
            description: 'Standalone homes with private spaces',
            icon: Home,
            count: 280,
            image: '/house.jpg',
            features: ['Garden', 'Garage', 'Security', 'BQ'],
            priceRange: '₦5M - ₦20M/year'
        },
        {
            id: 'luxury-villas',
            name: 'Luxury Villas',
            description: 'Premium properties with exclusive amenities',
            icon: Castle,
            count: 120,
            image: '/villa.jpg',
            features: ['Pool', 'Smart Home', 'Ocean View', 'Private Security'],
            priceRange: '₦15M - ₦50M/year',
            popular: true
        },
        {
            id: 'serviced',
            name: 'Serviced Apartments',
            description: 'Fully furnished units with hotel-like services',
            icon: Hotel,
            count: 180,
            image: '/serviced.jpg',
            features: ['Housekeeping', 'Utilities', 'Internet', 'Furnished'],
            priceRange: '₦4M - ₦12M/year'
        },
        {
            id: 'commercial',
            name: 'Commercial Spaces',
            description: 'Office and retail spaces for businesses',
            icon: Building,
            count: 95,
            image: '/commercial.jpg',
            features: ['Reception', 'Parking', 'Meeting Rooms', 'High-speed Internet'],
            priceRange: '₦8M - ₦30M/year'
        },
        {
            id: 'warehouses',
            name: 'Warehouses',
            description: 'Storage and industrial spaces',
            icon: Warehouse,
            count: 45,
            image: '/warehouse.jpg',
            features: ['Loading Bay', 'Security', '24/7 Access', 'CCTV'],
            priceRange: '₦5M - ₦25M/year'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#DFDDD8] via-white to-[#DFDDD8]">
            {/* Hero Section */}
            <div className="relative bg-[#373330] text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-light mb-6">
                            Find Your Perfect
                            <span className="font-normal text-[#90927E]"> Property Type</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            Explore our diverse range of properties tailored to your needs
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {propertyTypes.map((type, index) => (
                        <PropertyTypeCard key={type.id} type={type} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PropertyTypeCard({ type, index }: { type: PropertyType; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/explore?type=${type.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                    <motion.img
                        src={type.image}
                        alt={type.name}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Popular Tag */}
                    {type.popular && (
                        <div className="absolute top-4 left-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 bg-[#4E6053] px-3 py-1.5 rounded-full"
                            >
                                <Star className="w-3 h-3" />
                                <span className="text-xs font-medium">Popular</span>
                            </motion.div>
                        </div>
                    )}

                    {/* Property Count */}
                    <div className="absolute bottom-4 left-4">
                        <span className="text-white text-sm">
                            {type.count}+ Properties Available
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <type.icon className="w-5 h-5 text-[#4E6053]" />
                        <h3 className="text-xl font-medium text-[#373330] group-hover:text-[#4E6053] transition-colors">
                            {type.name}
                        </h3>
                    </div>

                    <p className="text-sm text-[#373330]/60 mb-4 line-clamp-2">
                        {type.description}
                    </p>

                    <div className="text-sm text-[#373330]/80 mb-4">
                        <span className="font-medium">Price Range: </span>
                        {type.priceRange}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {type.features.map((feature) => (
                            <span
                                key={feature}
                                className="px-3 py-1 bg-[#373330]/5 rounded-full text-xs text-[#373330]/80"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* View Properties Button */}
                    <div className="flex items-center justify-end">
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-sm text-[#4E6053] font-medium"
                        >
                            View Properties
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
} 