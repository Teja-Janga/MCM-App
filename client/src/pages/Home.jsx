import React, { useState, useEffect } from 'react';
import { Search, Server, Globe, Cloud, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import apiClient from '../API/axiosConfig';

const CLOUD_PROVIDERS = [
    {name: 'Render Services', path: '/render', color: 'bg-[#4326ab]', icon: <Server /> },
    {name: 'Vercel Projects', path: '/vercel', color: 'bg-black', icon: <Globe /> },
    {name: 'Netlify Sites', path: '/netlify', color: 'bg-[#00ad9f]', icon: <Cloud /> },
    {name: 'Aiven Databases', path: '/aiven', color: 'bg-[#ff4f00]', icon: <Database /> },
];

const Home = ({ isLogVisible, stats, setStats, setIsRefreshing }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [incidents, setIncidents] = useState(() => {
        const now = new Date().toLocaleTimeString();
        return [
            { id: 1, time: now, source: 'SYSTEM', msg: 'Neural Network background initialized', type: 'INFO' },
            { id: 2, time: now, source: 'AUTH', msg: 'Multi-Cloud tokens validated', type: 'SUCCESS' }
        ];
    });

    const addIncident = (source, msg, type) => {
        const newLog = {
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            source: source.toUpperCase(),
            msg,
            type 
        };
        setIncidents(prev => [newLog, ...prev].slice(0, 5));
    };

    useEffect(() => {
        const fetchAll = async () => {
            setIsRefreshing(true);
            setLoading(true);
            try {
                const results = await Promise.allSettled([
                    apiClient.get('/api/render/services'),
                    apiClient.get('/api/vercel/projects'),
                    apiClient.get('/api/netlify/sites'), 
                    apiClient.get('/api/aiven/all-services')
                ]);

                // 2. Helper to extract data safely or return an empty array if failed
                const getData = (res) => (res.status === 'fulfilled' ? res.value.data : []);

                const renderData = getData(results[0]);
                const vercelData = getData(results[1]);
                const netlifyData = getData(results[2]);
                const aivenData = getData(results[3]);

                // 3. Log failures for specific providers if they occurred
                results.forEach((res, index) => {
                    if (res.status === 'rejected') {
                        const providers = ['Render', 'Vercel', 'Netlify', 'Aiven'];
                        addIncident('NETWORK', `Node ${providers[index]} unreachable`, 'CRITICAL');
                    }
                });

                const combined = [
                    ...renderData.map(s => ({ name: s.service.name, type: 'Render', path: '/render', status: s.service.suspended })),
                    ...vercelData.map(p => ({ name: p.name, type: 'Vercel', path: '/vercel', status: 'active' })),
                    ...netlifyData.map(n => ({ name: n.name, type: 'Netlify', path: '/netlify', status: 'active' })),
                    ...aivenData.map(a => ({ name: a.service_name, type: 'Aiven', path: '/aiven', status: a.state }))
                ];
                setAllProjects(combined);

                // Calculate Stats 
                const activeCount = combined.filter(p =>
                    p.status === 'not_suspended' || p.status === 'active' || p.status === 'RUNNING'
                ).length;

                setStats({
                    total: combined.length,
                    active: activeCount,
                    providers: 4
                });

                if (combined.length > 0) {
                    addIncident('API', 'Global health check synchronized', 'SUCCESS');
                }
            }
            catch (err) {
                addIncident('SYSTEM', "Internal Dashboard Error", 'CRITICAL');
            }
            finally {
                setLoading(false);
                setTimeout(() => setIsRefreshing(false), 1000);
            }
        };
        fetchAll();
    }, []);

    const filteredResults = searchQuery.length > 1 ?
        allProjects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Incident Log Console */}
            <AnimatePresence>
                {isLogVisible && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="max-w-4xl mx-auto mb-4 bg-[#1e293b] rounded-xl shadow-2xl overflow-hidden border border-slate-700">
                            <div className="bg-[#0f172a] px-4 py-2 flex items-center justify-between border-b border-slate-700">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>                                    
                                </div>
                                <span className="text-slate-200 font-semibold text-[12px] font-mono tracking-widest uppercase ml-4">Incident Log</span>
                                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Live Stream</span>
                            </div>
                            
                            <div className="p-4 font-mono text-sm space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                                {incidents.map((log) => (
                                    <div key={log.id} className="flex gap-4 items-start border-b border-slate-800/50 pb-1 last:border-0">  
                                        <span className="text-slate-400 text-[11px] pt-1">{log.time}</span>
                                        <span className={`font-bold text-[10px] px-1.5 py-0.5 rounded ${
                                            log.type === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                                            log.type === 'SUCCESS' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                                        }`}>{log.type}</span>
                                        <span className="text-slate-300"><span className="text-slate-500">[{log.source}]</span> {log.msg}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-600 bg-[#0f172a] p-2">
                                <div className="flex flex-wrap justify-center font-semibold gap-x-6 gap-y-1 text-[11px] font-mono">
                                    <div className="flex gap-2">
                                        <span className="text-slate-400 uppercase">Connected:</span>
                                        <span className="text-blue-400 font-bold">{stats.total}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-slate-400 uppercase">Active Nodes:</span>
                                        <span className="text-green-400 font-bold">{stats.active}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-slate-400 uppercase">Providers:</span>
                                        <span className="text-purple-400 font-bold">{stats.providers}</span>
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Section */}
            <div className="relative max-w-2xl mx-auto z-20">
                <div className="relative shadow-xl rounded-2xl">
                    <Search className="absolute left-4 top-2.5 text-gray-400 z-30" size={20} />
                    <input 
                        type="text"
                        placeholder="Search projects across all clouds..."
                        className="w-full pl-12 pr-4 py-2 rounded-2xl border border-gray-500 placeholder:text-slate-600 bg-transparent backdrop-blur-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* Results Dropdown */}
                {filteredResults.length > 0 && (
                    <div className="absolute w-full mt-2 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 bg-transparent backdrop-blur-lg z-50 overflow-hidden">
                        {filteredResults.map((res, index) => (
                            <Link to={res.path} key={index} className="flex items-center justify-between p-4 hover:bg-blue-50 dark:hover:bg-slate-700 border-b border-gray-50 dark:border-slate-700 last:border-0 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-gray-700 dark:text-slate-200">{res.name}</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-400">{res.type}</span>
                                </div>
                                <ArrowRight size={14} className="text-gray-300" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Grid Cards */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {CLOUD_PROVIDERS.map((card) => (
                    <Link
                        to={card.path}
                        key={card.name}
                        className={`${card.color} text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-4`}
                    >
                        <div className="p-4 bg-white/25 rounded-full">{card.icon}</div>
                        <span className="text-xl font-bold">{card.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default Home;