'use client';
import React from 'react';

import { useState } from 'react';
import { Search, Share2, Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    isNew?: boolean;
    isPremium?: boolean;
}

export default function ExplorePage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const properties: Property[] = [
        {
            id: '1',
            title: 'Luxury Penthouse with Ocean View',
            location: 'Banana Island, Ikoyi',
            price: 15000000,
            images: ['/luxury-penthouse.jpg'],
            beds: 4,
            baths: 4.5,
            sqft: 3200,
            type: 'apartment',
            isPremium: true
        },
        {
            id: '2',
            title: 'Modern Villa with Pool',
            location: 'Lekki Phase 1',
            price: 8500000,
            images: ['/modern-villa.jpg'],
            beds: 5,
            baths: 5,
            sqft: 4500,
            type: 'villa',
            isNew: true
        },
        {
            id: '3',
            title: 'Cozy Studio Apartment',
            location: 'Victoria Island',
            price: 2500000,
            images: ['/studio-apt.jpg'],
            beds: 1,
            baths: 1,
            sqft: 650,
            type: 'apartment'
        },
        {
            id: '4',
            title: 'Waterfront Duplex',
            location: 'Osborne, Ikoyi',
            price: 12000000,
            images: ['/waterfront-duplex.jpg'],
            beds: 4,
            baths: 4,
            sqft: 3800,
            type: 'duplex',
            isPremium: true
        },
        // Add more properties as needed...
    ];

    const filters = [
        { id: 'all', label: 'All Properties' },
        { id: 'apartment', label: 'Apartments' },
        { id: 'villa', label: 'Villas' },
        { id: 'duplex', label: 'Duplexes' },
        { id: 'premium', label: 'Premium' }
    ];

    const filteredProperties = properties.filter(property =>
        activeFilter === 'all' ||
        activeFilter === 'premium' && property.isPremium ||
        property.type === activeFilter
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#DFDDD8] via-white to-[#DFDDD8]">
            {/* Stats Bar */}
            <div className="bg-[#373330] text-white py-3">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-center md:justify-end gap-8 text-sm">
                        <span className="text-white/80">Available Properties: {properties.length}</span>
                        <span className="text-white/80">Premium Listings: {properties.filter(p => p.isPremium).length}</span>
                    </div>
                </div>
            </div>

            {/* Search and Filter Header */}
            <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-xl border-b border-[#373330]/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Enhanced Search Bar */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by location or property type..."
                                className="w-full px-4 py-3.5 pl-12 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4E6053]/20 transition-all shadow-sm hover:shadow-md"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#373330]/40" />
                        </div>

                        {/* Enhanced Filter Pills */}
                        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                            {filters.map((filter) => (
                                <motion.button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`px-6 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${activeFilter === filter.id
                                        ? 'bg-[#373330] text-white shadow-lg'
                                        : 'bg-white text-[#373330] hover:bg-[#373330]/5 shadow-sm'
                                        }`}
                                >
                                    {filter.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.map((property, index) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                index={index}
                            />
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
        >
            {/* Property Image */}
            <div className="relative h-64 overflow-hidden">
                <motion.img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {property.isNew && (
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="px-4 py-1.5 bg-[#4E6053] text-white text-xs font-medium rounded-full"
                        >
                            New
                        </motion.span>
                    )}
                    {property.isPremium && (
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="px-4 py-1.5 bg-[#90927E] text-white text-xs font-medium rounded-full"
                        >
                            Premium
                        </motion.span>
                    )}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4">
                    <span className="text-white text-xl font-semibold tracking-tight">
                        ₦{property.price.toLocaleString()}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 bg-white/95 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                        <Heart className="w-4 h-4 text-[#373330]" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 bg-white/95 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                        <Share2 className="w-4 h-4 text-[#373330]" />
                    </motion.button>
                </div>
            </div>

            {/* Property Details */}
            <div className="p-6">
                <h3 className="text-lg font-medium text-[#373330] mb-2 line-clamp-1 group-hover:text-[#4E6053] transition-colors">
                    {property.title}
                </h3>
                <div className="flex items-center gap-2 text-[#373330]/60 text-sm mb-5">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-3 gap-4 text-sm text-[#373330]/80">
                    <div className="flex items-center gap-2 group/item">
                        <Bed className="w-4 h-4 group-hover/item:text-[#4E6053] transition-colors" />
                        <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2 group/item">
                        <Bath className="w-4 h-4 group-hover/item:text-[#4E6053] transition-colors" />
                        <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2 group/item">
                        <Square className="w-4 h-4 group-hover/item:text-[#4E6053] transition-colors" />
                        <span>{property.sqft} sqft</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
} 