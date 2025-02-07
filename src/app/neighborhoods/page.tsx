'use client';
import React from 'react';
import { useState } from 'react';
import { Map, List, Filter, ChevronDown, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic import for the map component to avoid SSR issues
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

interface Neighborhood {
    id: string;
    name: string;
    description: string;
    image: string;
    stats: {
        avgPrice: number;
        properties: number;
        rating: number;
    };
    features: string[];
    trending?: boolean;
    coordinates: {
        lat: number;
        lng: number;
    };
    amenities: string[];
    schools: number;
    safety: number;
}

export default function NeighborhoodsPage() {
    const [isMapView, setIsMapView] = useState(false);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<string>('all');
    const [amenityFilter, setAmenityFilter] = useState<string>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const priceRanges = [
        { id: 'all', label: 'All Prices' },
        { id: 'under-5m', label: 'Under ₦5M' },
        { id: '5m-10m', label: '₦5M - ₦10M' },
        { id: 'above-10m', label: 'Above ₦10M' }
    ];

    const amenities = [
        'Schools',
        'Shopping',
        'Restaurants',
        'Parks',
        'Waterfront',
        'Nightlife'
    ];

    const neighborhoods: Neighborhood[] = [
        {
            id: 'ikoyi',
            name: 'Ikoyi',
            description: 'Luxurious residential area with waterfront properties and upscale amenities',
            image: '/ikoyi.jpg',
            stats: {
                avgPrice: 12000000,
                properties: 150,
                rating: 4.8
            },
            features: ['Waterfront Views', 'Luxury Homes', 'Private Schools', 'Golf Clubs'],
            trending: true,
            coordinates: { lat: 6.5244, lng: 3.3792 },
            amenities: ['Waterfront', 'Luxury Homes', 'Private Schools', 'Golf Clubs'],
            schools: 5,
            safety: 4
        },
        {
            id: 'vi',
            name: 'Victoria Island',
            description: 'Prime business district with modern apartments and vibrant nightlife',
            image: '/vi.jpg',
            stats: {
                avgPrice: 8500000,
                properties: 200,
                rating: 4.6
            },
            features: ['Beach Access', 'Shopping Malls', 'Restaurants', 'Nightlife'],
            coordinates: { lat: 6.5244, lng: 3.3792 },
            amenities: ['Beach Access', 'Shopping Malls', 'Restaurants', 'Nightlife'],
            schools: 3,
            safety: 5
        },
        {
            id: 'lekki1',
            name: 'Lekki Phase 1',
            description: 'Modern residential area with excellent infrastructure and family-friendly environment',
            image: '/lekki.jpg',
            stats: {
                avgPrice: 5000000,
                properties: 300,
                rating: 4.5
            },
            features: ['Gated Estates', 'Modern Infrastructure', 'Schools', 'Shopping Centers'],
            trending: true,
            coordinates: { lat: 6.5244, lng: 3.3792 },
            amenities: ['Gated Estates', 'Modern Infrastructure', 'Schools', 'Shopping Centers'],
            schools: 4,
            safety: 3
        },
        // Add more neighborhoods...
    ];

    const filteredNeighborhoods = neighborhoods.filter(n => {
        if (priceRange === 'under-5m' && n.stats.avgPrice >= 5000000) return false;
        if (priceRange === '5m-10m' && (n.stats.avgPrice < 5000000 || n.stats.avgPrice > 10000000)) return false;
        if (priceRange === 'above-10m' && n.stats.avgPrice <= 10000000) return false;
        if (amenityFilter !== 'all' && !n.amenities.includes(amenityFilter)) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#DFDDD8] via-white to-[#DFDDD8]">
            {/* Hero Section */}
            <div className="relative bg-[#373330] text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-light mb-6">
                            Discover Your Perfect
                            <span className="font-normal text-[#90927E]"> Neighborhood</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            Explore Lagos&apos;s most sought-after residential areas and find your ideal community
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-xl border-b border-[#373330]/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* View Toggle */}
                        <div className="flex items-center gap-2 bg-[#373330]/5 p-1 rounded-xl">
                            <button
                                onClick={() => setIsMapView(false)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${!isMapView ? 'bg-white shadow-sm' : ''}`}
                            >
                                <List className="w-4 h-4" />
                                <span>List</span>
                            </button>
                            <button
                                onClick={() => setIsMapView(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isMapView ? 'bg-white shadow-sm' : ''}`}
                            >
                                <Map className="w-4 h-4" />
                                <span>Map</span>
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:bg-[#373330]/5 transition-colors"
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>Filters</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isFilterOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg p-4"
                                        >
                                            {/* Price Range Filter */}
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                                                {priceRanges.map(range => (
                                                    <button
                                                        key={range.id}
                                                        onClick={() => setPriceRange(range.id)}
                                                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${priceRange === range.id
                                                            ? 'bg-[#373330] text-white'
                                                            : 'hover:bg-[#373330]/5'
                                                            }`}
                                                    >
                                                        {range.label}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Amenities Filter */}
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Amenities</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {amenities.map(amenity => (
                                                        <button
                                                            key={amenity}
                                                            onClick={() => setAmenityFilter(amenity)}
                                                            className={`px-3 py-1 rounded-full text-xs ${amenityFilter === amenity
                                                                ? 'bg-[#4E6053] text-white'
                                                                : 'bg-[#373330]/5 hover:bg-[#373330]/10'
                                                                }`}
                                                        >
                                                            {amenity}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {isMapView ? (
                    <div className="h-[600px] rounded-2xl overflow-hidden">
                        <MapView
                            neighborhoods={filteredNeighborhoods}
                            selectedArea={selectedArea}
                            onSelectArea={setSelectedArea}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNeighborhoods.map((neighborhood, index) => (
                            <Link href={`/neighborhoods/${neighborhood.id}`} key={neighborhood.id}>
                                <NeighborhoodCard
                                    neighborhood={neighborhood}
                                    index={index}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function NeighborhoodCard({ neighborhood, index }: { neighborhood: Neighborhood; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
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
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Trending Tag */}
                {neighborhood.trending && (
                    <div className="absolute top-4 left-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 bg-[#4E6053] px-3 py-1.5 rounded-full"
                        >
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs font-medium">Trending</span>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-medium text-[#373330] mb-2 group-hover:text-[#4E6053] transition-colors">
                    {neighborhood.name}
                </h3>
                <p className="text-sm text-[#373330]/60 mb-6 line-clamp-2">
                    {neighborhood.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <div className="text-sm font-medium text-[#373330]">
                            ₦{(neighborhood.stats.avgPrice / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-[#373330]/60">Avg. Price</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-[#373330]">
                            {neighborhood.stats.properties}+
                        </div>
                        <div className="text-xs text-[#373330]/60">Properties</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-[#373330]">
                            {neighborhood.stats.rating}
                        </div>
                        <div className="text-xs text-[#373330]/60">Rating</div>
                    </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                    {neighborhood.features.map((feature) => (
                        <span
                            key={feature}
                            className="px-3 py-1 bg-[#373330]/5 rounded-full text-xs text-[#373330]/80"
                        >
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
} 