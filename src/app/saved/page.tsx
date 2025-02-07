'use client';

import { useState } from 'react';
import { Heart, MapPin, Bed, Bath, Square, Share2, Trash2, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SavedProperty {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    savedDate: string;
    isPremium?: boolean;
}

export default function SavedHomesPage() {
    const [savedHomes, setSavedHomes] = useState<SavedProperty[]>([
        {
            id: '1',
            title: 'Luxury Penthouse with Ocean View',
            location: 'Banana Island, Ikoyi',
            price: 15000000,
            images: ['/luxury-penthouse.jpg'],
            beds: 4,
            baths: 4.5,
            sqft: 3200,
            type: 'Penthouse',
            savedDate: '2024-02-15',
            isPremium: true
        },
        // Add more saved properties...
    ]);

    const removeSavedHome = (id: string) => {
        setSavedHomes(prev => prev.filter(home => home.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#DFDDD8] via-white to-[#DFDDD8]">
            {/* Header */}
            <div className="bg-[#373330] text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-6 h-6 text-[#90927E]" />
                        <h1 className="text-3xl md:text-4xl font-light">
                            Saved Homes
                        </h1>
                    </div>
                    <p className="text-white/80">
                        {savedHomes.length} properties saved to your wishlist
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {savedHomes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {savedHomes.map((property, index) => (
                                <SavedPropertyCard
                                    key={property.id}
                                    property={property}
                                    index={index}
                                    onRemove={removeSavedHome}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <Building2 className="w-16 h-16 text-[#373330]/20 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-[#373330] mb-2">No Saved Homes</h3>
                        <p className="text-[#373330]/60 mb-6">
                            Start exploring and save properties you like
                        </p>
                        <Link
                            href="/explore"
                            className="inline-flex items-center px-6 py-3 bg-[#373330] text-white rounded-xl hover:bg-[#4E6053] transition-colors"
                        >
                            Explore Properties
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function SavedPropertyCard({
    property,
    index,
    onRemove
}: {
    property: SavedProperty;
    index: number;
    onRemove: (id: string) => void;
}) {
    const [isHovered, setIsHovered] = useState(false);

    // Format date in a consistent way
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <motion.img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            onRemove(property.id);
                        }}
                        className="p-2.5 bg-white/95 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors shadow-lg"
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 bg-white/95 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                        <Share2 className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4">
                    <span className="text-white text-xl font-semibold tracking-tight">
                        ₦{property.price.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <Link href={`/properties/${property.id}`}>
                    <h3 className="text-lg font-medium text-[#373330] mb-2 group-hover:text-[#4E6053] transition-colors">
                        {property.title}
                    </h3>
                </Link>
                <div className="flex items-center gap-2 text-[#373330]/60 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-3 gap-4 text-sm text-[#373330]/80">
                    <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4" />
                        <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4" />
                        <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Square className="w-4 h-4" />
                        <span>{property.sqft} sqft</span>
                    </div>
                </div>

                {/* Saved Date */}
                <div className="mt-4 pt-4 border-t border-[#373330]/10">
                    <span className="text-xs text-[#373330]/40">
                        Saved on {formatDate(property.savedDate)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
} 