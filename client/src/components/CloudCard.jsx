import { ExternalLink, Activity } from "lucide-react";

const CloudCard = ({ name, status, type, secondaryInfo, link, updatedAt, colorClass }) => {
    const isOnline = status === 'active' || status === 'not_suspended' || status === 'RUNNING';

    return (
        <div className={`custom-project-card p-5 rounded-xl shadow-md backdrop-blur-sm transition-all hover:ring-2 ${colorClass}`}>             
            
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg truncate pr-2">{name}</h3>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    isOnline 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                }`}>
                    {isOnline ? 'Active' : 'Offline'}
                </span>
            </div>
            
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="muted-label">Provider:</span>
                    <span className="font-semibold">{type}</span>
                </div>
                {secondaryInfo && (
                    <div className="flex justify-between text-sm">
                        <span className="muted-label">Details:</span>
                        <span className="font-semibold italic">{secondaryInfo}</span>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t dark:border-slate-700 flex items-center justify-between">
                <span className="text-[11px] muted-label flex items-center gap-1 font-semibold font-mono">
                    <Activity size={12} /> {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}
                </span>
                <a href={link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors">
                    <ExternalLink size={18} />
                </a>
            </div>
        </div>
    );
}
export default CloudCard;