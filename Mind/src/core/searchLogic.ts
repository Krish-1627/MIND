import { products } from '../data/products';

export const getEcommerceSuggestions = (keywords: string[], prompt: string, detectedIntent: string) => {
    if (detectedIntent !== 'ECOMMERCE') return [];
    const searchFiller = ['best', 'top', 'latest', 'market', 'good', 'cheap', 'premium', 'high', 'quality', 'buy', 'get', 'me', 'want', 'search', 'find', 'need', 'the', 'some', 'for', 'in', 'now', 'please', 'i', 'pair', 'of'];

    const getAtomic = (list: string[]) => list.flatMap(k => k.toLowerCase().split(/\s+/))
        .filter(w => w.length > 2 && !searchFiller.includes(w));

    let atomic = getAtomic(keywords);
    if (atomic.length === 0 && prompt) {
        atomic = getAtomic([prompt]);
    }
    if (atomic.length === 0) return [];

    const promptLower = prompt.toLowerCase();

    // Match scoring system
    return products.map(p => {
        const nameLower = p.name.toLowerCase();
        const descLower = p.description.toLowerCase();
        const catLower = p.category.toLowerCase();

        // Normalize for T-Shirt matching (Phase 3 Tshirt Fix)
        const normalizedName = nameLower.replace(/-/g, '').replace(/\s+/g, '');
        const normalizedCat = catLower.replace(/-/g, '').replace(/\s+/g, '');

        let score = 0;

        // 1. Keyword Density & Stemming
        atomic.forEach(word => {
            const singular = word.endsWith('s') ? word.slice(0, -1) : word;
            const plural = word.endsWith('s') ? word : word + 's';
            const cleanWord = word.replace(/-/g, '');

            const isExactMatch = nameLower.includes(` ${word} `) || nameLower.startsWith(`${word} `) || nameLower.endsWith(` ${word}`);

            if (nameLower.includes(word) || normalizedName.includes(singular) || normalizedName.includes(plural) || normalizedName.includes(cleanWord)) {
                score += isExactMatch ? 50 : 30; // Boost exact words
            }

            if (catLower.includes(word) || normalizedCat.includes(singular) || normalizedCat.includes(cleanWord)) {
                score += 20;
            }

            if (descLower.includes(word)) {
                score += 10;
            }

            // 2. Specific T-Shirt Logic (Solve the Shirt vs T-Shirt bias)
            if (word === 'tshirt' || word === 't-shirt' || word === 'tee') {
                if (nameLower.includes('t-shirt') || nameLower.includes('tshirt')) {
                    score += 50; // Huge boost for T-Shirt specific products
                } else if (nameLower.includes('shirt') && !nameLower.includes('t-shirt')) {
                    score -= 20; // Penalty for formal shirts when t-shirt requested
                }
            }
        });

        // 3. Extra weight for brand name matching
        const brandMatch = atomic.some(word => {
            const cleanName = nameLower.replace(/\s+/g, '');
            return cleanName.includes(word) && !searchFiller.includes(word);
        });
        if (brandMatch) score += 20;

        // Specific check for "OnePlus"
        if (promptLower.includes('one plus') && nameLower.includes('oneplus')) {
            score += 50;
        }

        // 4. Rating acts as a tie-breaker
        score += p.rating;

        return { ...p, score };
    })
        .filter(p => p.score > 25) // Higher threshold to filter out weak partial matches
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
};
