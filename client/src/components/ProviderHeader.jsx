import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProviderHeader = ({ title, icon: Icon, colorClass }) => (
    <div className="flex items-center justify-between gap-3 mb-8">
        <Link to="/" className="flex items-center gap-2 cursor-pointer transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
        </Link>
        <div className={`flex items-center gap-3 ${colorClass} text-white px-4 py-2 rounded-lg shadow-sm`}>
            <Icon size={20} />
            <span className="font-bold">{title}</span>
        </div>
    </div>
)
export default ProviderHeader;