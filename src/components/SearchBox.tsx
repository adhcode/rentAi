'use client';

import type { FormEvent } from 'react';
import React from 'react';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBox() {
    const [query, setQuery] = useState('');

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        // TODO: Will integrate with AI to process natural language search
        // and return matching rental properties
        console.log('Processing search:', query);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch}>
                <div className="bg-white rounded-xl shadow-lg p-4">
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Describe your ideal rental home...
Example: I need a pet-friendly 2-bedroom apartment near downtown, walking distance to grocery stores, under $2000/month"
                        className="w-full p-3 text-gray-700 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                    />

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Be specific about location, budget, and must-have features
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Search size={20} />
                            Find Homes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
} 