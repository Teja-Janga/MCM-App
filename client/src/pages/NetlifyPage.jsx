import React, { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';
import ProviderHeader from '../components/ProviderHeader';
import CloudCard from '../components/CloudCard';
import apiClient from '../API/axiosConfig';

const NetlifyPage = () => {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNetlifyData = async () => {
            try {
                const res = await apiClient.get('/api/netlify/sites');
                const ghostIds = [
                    '237ce25a-ee5c-4419-91b5-4f885870f338',
                    '7ba0287c-ca96-4872-820c-67fbe42e5822'
                ];
                const cleanSites = res.data.filter(site => 
                    !ghostIds.includes(site.id)
                );
                setSites(cleanSites);
            } catch (err) {
                console.error("Error fetching Netlify sites", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNetlifyData();
    }, []);

    return (
        <div className="p-8">
            <ProviderHeader title="Netlify Network" icon={Cloud} colorClass="bg-[#00ad9f]" />

        {loading ? (
            <p className="text-center py-20 text-gray-500 animate-pulse">Loading your Netlify sites...</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(sites) && sites.map((site) => (
                    <CloudCard 
                        key={site.id}
                        name={site.name}
                        type="Netlify"
                        status="active" // Netlify sites from this API are usually active
                        secondaryInfo={site.build_settings.repo_path || 'Manual Deploy'}
                        link={site.ssl_url}
                        updatedAt={site.updated_at}
                        colorClass="hover:ring-[#00ad9f]"
                    />
                ))}
            </div>
        )}
        </div>
    );
};

export default NetlifyPage;