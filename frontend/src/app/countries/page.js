'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CountriesList() {

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                setError(null);
                const apiUrl = "http://localhost:4000/";

                const response = await fetch(apiUrl + 'countries/');
                const data = await response.json();
                setCountries(data);
                setFilteredCountries(data);
            } catch (err) {
                setError('Error in loading countries.');
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    // Filtra os países conforme o termo de busca
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCountries(countries);
        } else {
            const filtered = countries.filter((country) =>
                country.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCountries(filtered);
        }
    }, [searchTerm, countries]);

    if (loading)
        return <p className="text-center text-gray-600 text-lg mt-20">Carregando...</p>;
    if (error)
        return <p className="text-center text-red-600 text-lg mt-20">{error}</p>;

    return (
        <div className="p-6 mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8">Countries around the world</h1>

            {/* Search field */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search a country"
                    className="w-full p-2 border text-black border-gray-300 rounded-md"
                />
            </div>

            {/* Country list */}
            <div className="space-y-4">
                {filteredCountries.map((country) => (
                    <Link key={country.countryCode} href={`/countries/${country.countryCode}`}>
                        <div
                            className="flex my-4 p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between w-full">
                                <div className='flex flex-col'>
                                    <span className="text-lg font-medium text-gray-800">{country.name}</span>
                                    <span className="text-sm text-gray-500">{country.countryCode}</span>
                                </div>
                                <button className="ml-auto text-white bg-black px-4 py-2 rounded-md">
                                        See details
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
