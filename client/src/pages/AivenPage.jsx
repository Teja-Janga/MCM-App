import React, { useEffect, useState } from 'react';
import { Database } from 'lucide-react';
import ProviderHeader from '../components/ProviderHeader';
import CloudCard from '../components/CloudCard';
import apiClient from '../API/axiosConfig';


const AivenPage = () => {
    const [databases, setDatabases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAivenData = async () => {
        try {
            const res = await apiClient.get('/api/aiven/all-services');
            setDatabases(res.data);
        } catch (err) {
            console.error("Error fetching Aiven data", err);
        } finally {
            setLoading(false);
        }
        };
        fetchAivenData();
    }, []);

    return (
        <div className="p-8">
            <ProviderHeader title="Aiven Databases" icon={Database} colorClass="bg-[#ff4f00]" />

        {loading ? (
            <div className="text-center py-20 text-gray-600 animate-pulse">Scanning database clusters...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(databases) && databases.map((db, index) => (
                    <CloudCard 
                        key={index}
                        name={db.service_name}
                        type={`Aiven (${db.service_type})`}
                        status={db.state} 
                        secondaryInfo={`Plan: ${db.plan}`}
                        link={null} 
                        updatedAt={db.create_time}
                        colorClass="hover:ring-[#ff4f00]"
                    />
                ))}
            </div>
        )}
        </div>
    );
};

export default AivenPage;