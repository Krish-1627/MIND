import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntent, useUser } from '../core/contexts';
import { PageTransition } from '../components/layout/PageTransition';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromptInput = () => {
    const { username } = useUser();
    const { setPrompt } = useIntent();
    const navigate = useNavigate();
    const [localPrompt, setLocalPrompt] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!localPrompt.trim()) return;

        setPrompt(localPrompt);
        navigate('/thinking');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <PageTransition className="w-full max-w-2xl">
                <div className="space-y-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
                        <Sparkles size={14} className="text-yellow-400" />
                        <span>Welcome, {username || 'Guest'}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
                        What can I do for you?
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="input-box-premium group">
                            <textarea
                                autoFocus
                                value={localPrompt}
                                onChange={(e) => setLocalPrompt(e.target.value)}
                                placeholder="e.g. 'I want to watch a movie' or 'Buy a new phone'"
                                className="w-full bg-transparent text-xl md:text-2xl text-center text-main placeholder-text-muted focus:outline-none min-h-[120px] resize-none"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                        </div>

                        <div className={`transition-all duration-500 transform ${localPrompt ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <button
                                type="submit"
                                className="group flex items-center gap-3 mx-auto px-8 py-4 rounded-full bg-primary text-white font-bold hover:shadow-glow transition-all active:scale-95"
                            >
                                <span>Process Request</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </PageTransition>
        </div>
    );
};
