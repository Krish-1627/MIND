import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntent, useUser } from '../core/contexts';
import { analyzePrompt } from '../core/intentService';
import { PageTransition } from '../components/layout/PageTransition';

export const Thinking = () => {
    const { prompt, startProcessing, processIntent } = useIntent();
    const { username } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!prompt) {
            navigate('/prompt');
            return;
        }

        const performAnalysis = async () => {
            startProcessing();
            const result = await analyzePrompt(prompt);
            processIntent(result.type, result.keywords);

            setTimeout(() => {
                navigate('/ack');
            }, 500);
        };

        performAnalysis();
    }, [prompt, navigate, startProcessing, processIntent]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-core p-6">
            <PageTransition>
                <div className="text-center space-y-8">
                    <div className="relative w-32 h-32 mx-auto">
                        <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-r-2 border-accent rounded-full animate-spin reverse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                        <div className="absolute inset-4 blur-xl bg-primary/20 rounded-full animate-pulse"></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl">🧠</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-main tracking-tight">Analyzing Intent...</h3>
                        <p className="text-text-dim text-sm max-w-xs mx-auto italic font-mono">
                            MIND is processing context...
                        </p>
                    </div>
                </div>
            </PageTransition>
        </div>
    );
};
