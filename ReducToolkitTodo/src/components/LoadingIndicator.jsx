import React from 'react';

const LoadingIndicator = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in transition-all duration-300">
            <div className="relative group flex flex-col items-center">
                {/* Outer glowing ring */}
                <div className="absolute -inset-8 bg-zinc-100/10 rounded-full blur-2xl group-hover:bg-zinc-100/20 transition-all duration-500"></div>

                {/* Spinner logic */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Spinning border */}
                    <div className="absolute inset-0 border-4 border-zinc-800/50 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-zinc-100 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

                    {/* Inner static icon / pulse */}
                    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center shadow-2xl">
                        <div className="w-4 h-4 bg-zinc-100 rounded-full animate-pulse blur-[1px]"></div>
                    </div>
                </div>

                {/* Text feedback */}
                <div className="mt-8 text-center space-y-1">
                    <p className="text-zinc-100 font-black tracking-[0.3em] uppercase text-xs animate-pulse">Processing</p>
                    <div className="flex gap-1 justify-center">
                        <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingIndicator;
