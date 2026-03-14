// Footer.jsx
import { Cpu, Activity } from 'lucide-react';
import { BsGithub } from 'react-icons/bs';
import { TerminalSquare } from 'lucide-react';

const Footer = ({ isDarkMode, activeNodes, isRefreshing, isLogVisible, setIsLogVisible }) => {
    const pulseSpeed = activeNodes > 10 ? 'animate-ping [animation-duration:0.8s]' : 'animate-ping';

    return (
        <footer className={`fixed bottom-0 w-full border-t backdrop-blur-lg transition-all duration-500 z-50 ${
            isDarkMode 
                ? 'bg-transparent border-slate-500 text-slate-200' 
                : 'bg-white/30 border-gray-500 text-black'
        }`}>
            <div className="max-w-7xl gap-1 px-4 py-1 flex flex-col md:flex-row justify-between items-center text-[11px] font-mono tracking-tight">
                
                {/* 1. System Status */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                                isRefreshing ? 'bg-blue-800' : 'bg-green-600'
                            }`}></div>
                            <div className={`absolute inset-0 w-2 h-2 rounded-full opacity-80 ${
                                isRefreshing ? 'bg-blue-800 animate-pulse' : `bg-green-500 ${pulseSpeed}`
                            }`}></div>
                        </div>
                        <span className="uppercase font-bold">
                            {isRefreshing ? 'Syncing Nodes...' : 'Mainnet Active'}
                        </span>
                    </div>
                    <div className="h-4 w-px bg-slate-700/30 hidden md:block"></div>
                    <div className="flex items-center gap-1 opacity-100">
                        <Activity size={14} className='text-red-600' />
                        <span>LATENCY: 32ms</span>
                    </div>
                </div>

                {/* 2. Middle Branding */}
                <div className="flex items-center gap-3 font-sans">
                    <span className="opacity-100 font-semibold italic">built for the cloud by</span>
                    <a 
                        href="https://my-personal-portfolio-inky-two.vercel.app/" 
                        target="_blank" 
                        className={`font-bold transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-blue-600'}`}
                    >
                        Teja Janga
                    </a>
                </div>

                {/* 3. Tech & Socials */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2  transition-opacity">
                        <Cpu size={14} />
                        <span>V1.0.4-STABLE</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/Teja-Janga" className="hover:scale-110 transition-transform"><BsGithub size={17} /></a>

                        <button 
                            onClick={() => setIsLogVisible(!isLogVisible)}
                            className={`flex items-center gap-2 p-1 rounded-md cursor-pointer transition-all ${
                                isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-200'
                            }`}
                        >
                            <TerminalSquare size={20} className={isLogVisible ? 'text-green-400' : 'text-slate-700'} />
                            <span className="uppercase font-semibold text-[11px]">Console</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;