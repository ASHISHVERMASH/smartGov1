import React, { useState, useEffect } from 'react';

const RegisteredCounter = () => {
    const [count, setCount] = useState(0);
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/smartGov/count');
                if (response.ok) {
                    const data = await response.json();
                    setCount(data);
                } else {
                    // Fallback baseline if API fails
                    setCount(100);
                }
            } catch (error) {
                console.error('Error fetching user count:', error);
                setCount(100);
            }
        };

        fetchCount();
        const interval = setInterval(fetchCount, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (displayCount < count) {
            const timer = setTimeout(() => {
                setDisplayCount(prev => Math.min(prev + 1, count));
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [displayCount, count]);

    return (
        <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-3xl backdrop-blur-md animate-fade-in mt-8 group hover:bg-white/10 transition-all duration-500">
            <div className="relative">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                    👥
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>

        </div>
    );
};

export default RegisteredCounter;
