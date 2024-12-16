'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessário para evitar problemas com gráficos

export default function CountryInfo({ params }) {
    const { countryCode } = React.use(params);

    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                setLoading(true);
                setError(null);
                const apiUrl = "http://localhost:4000/countryInfo/";

                // Substitua pela sua API real ou use essa de exemplo
                const response = await fetch(
                    apiUrl + countryCode
                );
                const data = await response.json();
                console.log(data)

                // Obtenha o histórico de população simulando dados
                const populationHistory = data.populationHistory.populationCounts;

                console.log(populationHistory.country)

                setCountryData({
                    name: data.populationHistory.country,
                    flag: data?.flagUrl,
                    borders: data?.borderCountries || [],
                    populationHistory,
                });
            } catch (err) {
                setError('Error in loading country data.');
            } finally {
                setLoading(false);
            }
        };

        fetchCountryData();
    }, [countryCode]);

    // Função para gerar dados fictícios de população
    const generatePopulationHistory = (currentPopulation) => {
        const history = [];
        const currentYear = new Date().getFullYear();

        for (let i = 0; i < 10; i++) {
            const year = currentYear - i;
            const population = Math.round(currentPopulation * (1 - i * 0.01)); // Reduz 1% por ano
            history.unshift({ year, population });
        }

        console.log(history);

        return history;
    };

    if (loading)
        return <p className="text-center text-gray-600 text-lg mt-20">Loading...</p>;
    if (error)
        return <p className="text-center text-red-600 text-lg mt-20">{error}</p>;

    return (
        <div className="p-6 mx-auto max-w-4xl items-center">
            <section className='flex justify-between items-center mb-8 gap-4'>
                <div className="main-info bg-white shadow rounded p-6 w-1/2 h-64">
                    <div className="flex flex-col items-start gap-4 mb-6">
                        <img
                            src={countryData.flag}
                            alt={`${countryData.name} Flag`}
                            className="w-40 h-auto rounded shadow"
                        />
                    </div>
                    <div className="text-3xl font-bold text-black text-start">
                        {countryData.name}
                    </div>
                </div>
                <div className='border-countries bg-white shadow rounded p-6 w-1/2 h-64'>
                    <h2 className="text-2xl font-semibold text-black mb-4">Border Countries:</h2>
                        {countryData.borders.length > 0 ? (
                            <ul className="list-disc list-inside overflow-y-auto h-36 text-black space-y-2">
                                {countryData.borders.map((border, index) => (
                                    <li key={index} className="text-lg text-white-700">
                                        {border.commonName}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-lg text-gray-600">There are no border countries</p>
                        )}
                </div>
            </section>




            <h2 className="text-2xl font-semibold mt-8 mb-4">Population history:</h2>
            <div className="bg-white shadow rounded p-4">
                <Line
                    data={{
                        labels: countryData.populationHistory.map((item) => item.year),
                        datasets: [
                            {
                                label: 'Population',
                                data: countryData.populationHistory.map(
                                    (item) => item.value
                                ),
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
