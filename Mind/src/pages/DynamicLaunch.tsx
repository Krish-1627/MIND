import { useEffect, useState } from 'react';
import { useIntent } from '../core/contexts';
import { PageTransition } from '../components/layout/PageTransition';
import { Button } from '../components/ui/Button';
import { OrbitTransition } from '../components/ui/OrbitTransition';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { getEcommerceSuggestions } from '../core/searchLogic';
import { getDeliveryEstimate } from '../core/utils/delivery';

export const DynamicLaunch = () => {
    const { detectedIntent, keywords, resetIntent, prompt } = useIntent() as any;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    // Intelligent Movie Extraction (Phase 2 Correction)
    const movieTitle = (() => {
        if (detectedIntent !== 'MOVIE') return '';
        const lowerPrompt = prompt.toLowerCase();
        // Match against known movie keys from BMS clone
        if (lowerPrompt.includes('salaar')) return 'Salaar';
        if (lowerPrompt.includes('animal')) return 'Animal';
        if (lowerPrompt.includes('sam bahadur') || lowerPrompt.includes('sam')) return 'Sam Bahadur';
        if (lowerPrompt.includes('dunki')) return 'Dunki';
        if (lowerPrompt.includes('og') || lowerPrompt.includes('they call him og')) return 'They Call Him OG';

        // Fallback to first non-filler keyword if no match
        return keywords.length > 0 ? keywords[0] : 'Animal';
    })();

    const ecommerceSuggestions = getEcommerceSuggestions(keywords, prompt, detectedIntent);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (detectedIntent === 'ECOMMERCE' && ecommerceSuggestions.length > 0) {
                setSelectedProductId(ecommerceSuggestions[0].id);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [ecommerceSuggestions.length, detectedIntent]);

    const handleRestart = () => {
        resetIntent();
        navigate('/prompt');
    };

    const targetSystem = detectedIntent === 'MOVIE' ? 'BookMyShow Clone' : 'E-commerce Clone';

    return (
        <div className="min-h-screen bg-core text-main p-6 flex items-center justify-center">
            {loading && <OrbitTransition prompt={prompt} />}

            <PageTransition className="w-full max-w-2xl text-center space-y-8 z-10">

                {loading ? (
                    <div className="space-y-6 animate-pulse">
                        <div className="flex justify-center">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
                            </div>
                        </div>
                        <p className="text-xl font-medium tracking-widest text-primary animate-bounce uppercase">
                            ORCHESTRATING SESSION...
                        </p>
                        <p className="text-text-muted font-mono text-sm">
                            Synchronizing context with {targetSystem}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in">
                        <div className="p-8 glass-panel rounded-3xl relative overflow-hidden text-left bg-surface/50 border border-border-light shadow-2xl backdrop-blur-xl">
                            <div className="absolute top-0 right-0 p-4">
                                <CheckCircle2 className="text-success w-8 h-8 opacity-50" />
                            </div>

                            <h1 className="text-3xl font-bold mb-2 tracking-tight">Setup Complete</h1>
                            <p className="text-text-dim mb-6 text-sm">
                                MIND has initialized the best options for your request.
                            </p>

                            {/* Options Grid for E-commerce (Phase 3 Innovation) */}
                            {detectedIntent === 'ECOMMERCE' && (
                                <div className="space-y-4 mb-8">
                                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Suggested Products</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {ecommerceSuggestions.map(product => (
                                            <div
                                                key={product.id}
                                                onClick={() => setSelectedProductId(product.id)}
                                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${selectedProductId === product.id
                                                    ? 'bg-primary/10 border-primary shadow-glow-sm scale-[1.02]'
                                                    : 'bg-surface border-border-light hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className="w-16 h-16 bg-white rounded-xl p-2 flex-shrink-0">
                                                    <img src={product.image} alt="" className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="text-sm font-bold text-main line-clamp-1">{product.name}</h4>
                                                    <div className="flex items-baseline gap-2 mt-1">
                                                        <span className="text-primary font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                                                        <span className="text-[10px] text-text-dim">★ {product.rating}</span>
                                                    </div>
                                                    <p className="text-[10px] text-success font-medium mt-1 italic">FREE Delivery {getDeliveryEstimate(product.id)}</p>
                                                </div>
                                                {selectedProductId === product.id && (
                                                    <CheckCircle2 size={20} className="text-primary" />
                                                )}
                                            </div>
                                        ))}
                                        {ecommerceSuggestions.length === 0 && (
                                            <div className="p-6 text-center text-text-muted font-mono text-xs border border-dashed border-border-light rounded-2xl">
                                                No detailed matches found. Launching broad search...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Launch Buttons */}
                            <div className="space-y-3">
                                {detectedIntent === 'MOVIE' && (
                                    <div className="space-y-6">
                                        <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                                            <p className="text-sm text-text-dim">Movie Identified: <span className="text-primary font-bold uppercase">{movieTitle}</span></p>
                                        </div>
                                        <Button
                                            className="w-full bg-[#f84464] hover:bg-[#d83a56] text-white py-6 text-2xl font-black shadow-glow-red rounded-2xl transition-all"
                                            onClick={() => {
                                                const tickets = prompt.match(/\b\d+\b/) ? prompt.match(/\b\d+\b/)[0] : '2';
                                                window.open(`http://localhost:5174/mind-suggestions?movie=${encodeURIComponent(movieTitle)}&tickets=${tickets}`, '_blank');
                                            }}
                                        >
                                            Launch BookMyShow
                                        </Button>
                                    </div>
                                )}

                                {detectedIntent === 'ECOMMERCE' && (
                                    <Button
                                        className="w-full bg-[#febd69] hover:bg-[#f3a847] text-[#131921] py-6 text-2xl font-black shadow-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        onClick={() => {
                                            let cleanPromptForQty = prompt.toLowerCase();
                                            keywords.forEach((k: string) => {
                                                cleanPromptForQty = cleanPromptForQty.replace(new RegExp(`\\b${k.toLowerCase()}\\b`, 'g'), '');
                                            });

                                            const quantityMatch = cleanPromptForQty.match(/\b\d+\b/);
                                            const quantity = quantityMatch ? quantityMatch[0] : '1';

                                            const stopWords = ['buy', 'me', 'get', 'want', 'search', 'find', 'need', 'the', 'some', 'a', 'an', 'to', 'for', 'item', 'product', 'give', 'now', 'please', 'i'];
                                            const allWords = keywords.flatMap((k: string) => k.toLowerCase().split(/\s+/));
                                            const filteredKeywords = allWords.filter((w: string) => w.length > 1 && !stopWords.includes(w));

                                            const search = filteredKeywords.length > 0 ? filteredKeywords[0] : 'iPhone';

                                            const params = new URLSearchParams({
                                                search: search,
                                                quantity: quantity
                                            });
                                            if (selectedProductId) {
                                                params.append('productId', selectedProductId);
                                                params.append('autoBuy', 'true');
                                                params.append('deliveryDate', getDeliveryEstimate(selectedProductId));
                                            }

                                            window.open(`http://localhost:5176/?${params.toString()}`, '_blank');
                                        }}
                                    >
                                        Launch Amazon Store
                                    </Button>
                                )}
                            </div>
                        </div>

                        <Button variant="secondary" onClick={handleRestart} className="px-8 py-3 rounded-full text-main border-border-light">
                            <ArrowLeft size={16} className="mr-2" />
                            New Command
                        </Button>
                    </div>
                )}
            </PageTransition>
        </div>
    );
};
