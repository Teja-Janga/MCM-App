import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import ProviderHeader from "../components/ProviderHeader";
import CloudCard from "../components/CloudCard";
import apiClient from '../API/axiosConfig';

const VercelPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVercelData = async () => {
            try {
                const res = await apiClient.get('/api/vercel/projects');
                setProjects(res.data);
            } catch (err) {
                console.error("Error fetching Vercel projects", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVercelData();
    }, []);

    return (
        <div className="p-8">
            <ProviderHeader title="Vercel Edge" icon={Globe} colorClass="bg-black" />

            {loading ? (
                <p className="text-center py-20 text-gray-600 animate-pulse">Fetching Vercel deployments...</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(projects) && projects.map((project) => (
                        <CloudCard 
                            key={project.id}
                            name={project.name}
                            status="active" // Vercel projects from this endpoint are active
                            type="Vercel"
                            secondaryInfo={`${project.framework || 'React'} Project`}
                            link={`https://${project.latestDeployments[0]?.url}`}
                            updatedAt={project.updatedAt}
                            colorClass="hover:ring-black"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default VercelPage;