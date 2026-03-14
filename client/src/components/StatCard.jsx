const StatCard = ({ label, value, color }) => (
    <div className="bg-transparent border border-gray-400
        dark:border-slate-500 px-6 py-3 backdrop-blur-sm rounded-2xl shadow-sm flex flex-col items-center
        min-w-42.5"
    >
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray">
            {label}
        </span>
        <span className={`text-2xl font-black ${color}`}>{value}</span>
    </div>
)
export default StatCard;