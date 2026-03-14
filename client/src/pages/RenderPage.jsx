import React, {useEffect, useState} from "react";
import { Server, Activity } from "lucide-react";
import ProviderHeader from "../components/ProviderHeader";
import CloudCard from "../components/CloudCard";
import apiClient from '../API/axiosConfig';


const RenderPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRenderData = async () => {
            try {
                const res = await apiClient.get('/api/render/services');
                setServices(res.data);
            }
            catch (err) {
                console.error("Error:",err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchRenderData();
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto bg-transparent">
            <ProviderHeader title="Render Cloud" icon={Server} colorClass="bg-[#4326ab]" />

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 animate-pulse">
                    <div className="animate-spin mb-4"><Activity size={40} /></div>
                    <p>Scanning Render Services...</p>
                </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(services) && services.map((item) => (
                        <CloudCard 
                            key={item.service.id}
                            name={item.service.name}
                            status={item.service.suspended} // Uses 'not_suspended' logic in CloudCard
                            type={item.service.type}
                            secondaryInfo={`Region: ${item.service.serviceDetails.region}`}
                            link={item.service.dashboardUrl}
                            updatedAt={item.service.updatedAt}
                            colorClass="hover:ring-[#4326ab]"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default RenderPage;