import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntent } from '../core/contexts';
import { Button } from '../components/ui/Button';
import { PageTransition } from '../components/layout/PageTransition';
import { Check, ShoppingBag, Film, ExternalLink } from 'lucide-react';

export const Acknowledgement = () => {
    const { detectedIntent, keywords } = useIntent();
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate('/launch');
    };

    const isMovie = detectedIntent === 'MOVIE';
    const Icon = isMovie ? Film : ShoppingBag;

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-core p-6 pb-24">
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg">
                <PageTransition>
                    <div className="glass-panel p-10 rounded-3xl text-center space-y-8 relative overflow-hidden">
                        <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center rotate-12 ${isMovie ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            <Icon size={40} />
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-main tracking-tight">
                                Understood.
                            </h2>
                            <p className="text-text-dim text-lg">
                                You want to {isMovie ? 'watch a movie' : 'shop for something'}.
                            </p>
                        </div>

                        {keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-center">
                                {keywords.map((k, i) => (
                                    <span key={i} className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary tracking-wider uppercase">
                                        {k}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="pt-6 border-t border-border-light">
                            <div className="flex items-center justify-center gap-2 text-success text-sm font-bold">
                                <Check size={18} />
                                <span>Context Prepared</span>
                            </div>
                        </div>
                    </div>
                </PageTransition>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-8 border-t border-border-light bg-surface/80 backdrop-blur-xl z-50">
                <div className="max-w-md mx-auto text-center">
                    <p className="text-text-muted text-xs mb-3 uppercase tracking-widest font-bold">MIND Orchestration Ready</p>
                    <Button
                        fullWidth
                        onClick={handleOpen}
                        className="py-5 text-xl font-black rounded-2xl bg-primary text-white shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <span className="mr-2">Click to Open</span>
                        <ExternalLink size={24} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
