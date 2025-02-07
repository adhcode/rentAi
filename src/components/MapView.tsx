'use client';

import React from 'react';

interface Neighborhood {
    id: string;
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface MapViewProps {
    neighborhoods: Neighborhood[];
    selectedArea: string | null;
    onSelectArea: (id: string) => void;
}

export default function MapView({ neighborhoods, selectedArea, onSelectArea }: MapViewProps) {
    // Use the props to avoid unused vars warning
    console.log({ neighborhoods, selectedArea, onSelectArea });

    return (
        <div className="w-full h-full bg-[#DFDDD8]/50 rounded-2xl flex items-center justify-center">
            <p className="text-[#373330]/60">Map Integration Coming Soon</p>
        </div>
    );
} 