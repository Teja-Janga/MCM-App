import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RenderPage from './pages/RenderPage';
import VercelPage from './pages/VercelPage';
import NetlifyPage from './pages/NetlifyPage';
import AivenPage from './pages/AivenPage';
import BackgroundEffect from './pages/BackgroundEffect';
import Footer from './pages/Footer';
import { Globe, Sun, Moon } from 'lucide-react';

const App = () => {
    // const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLogVisible, setIsLogVisible] = useState(true);
    const [stats, setStats] = useState({ total: 0, active: 0, providers: 4 });
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('mcm-theme') === 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const theme = isDarkMode ? 'dark' : 'light';
        
        // Simplified logic
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        root.style.colorScheme = theme;
        localStorage.setItem('mcm-theme', theme);
    }, [isDarkMode]);

    return (
        <Router>
            <BackgroundEffect isDarkMode={isDarkMode} />
            <div className="relative min-h-screen bg-transparent font-sans transition-colors duration-500">
                <header className="bg-[#213547] text-white text-2xl font-bold p-4 flex justify-center items-center gap-3">
                            <Globe size={28} /> Multi-Cloud Manager
                        {/* Theme Toggle Button */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className='p-1 rounded-full ml-auto transition-all border-none cursor-pointer'
                        >
                            {isDarkMode ? <Sun size={28} className='text-yellow-500' /> : <Moon size={25} />}
                        </button>
                </header>

                

                <main className='pb-14'>
                    <Routes>
                        <Route path="/" element={<Home
                                                    isLogVisible={isLogVisible}
                                                    stats={stats}
                                                    setStats={setStats}
                                                    setIsRefreshing={setIsRefreshing}
                                                    />}
                        />
                        <Route path="/render" element={<RenderPage />} />
                        <Route path="/vercel" element={<VercelPage />} />
                        <Route path="/netlify" element={<NetlifyPage />} />
                        <Route path="/aiven" element={<AivenPage />} />
                    </Routes>
                </main>
                <Footer
                    isDarkMode={isDarkMode}
                    activeNodes={stats.active}
                    isRefreshing={isRefreshing}
                    isLogVisible={isLogVisible}
                    setIsLogVisible={setIsLogVisible}
                />
            </div>
        </Router>
    )
}

export default App;
