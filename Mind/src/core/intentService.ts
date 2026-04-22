import { IntentType } from './contexts';

// Mock AI Logic (Heuristic / Keyword based)

interface IntentResult {
    type: IntentType;
    keywords: string[];
    confidence: number;
}

export const analyzePrompt = async (prompt: string): Promise<IntentResult> => {
    // Simulate network/processing delay (1.5s - 2.5s for realism)
    const delay = Math.floor(Math.random() * 1000) + 1500;
    await new Promise(resolve => setTimeout(resolve, delay));

    const lowerPrompt = prompt.toLowerCase();

    // Keyword definitions
    const ecommerceKeywords = ['buy', 'purchase', 'order', 'shop', 'price', 'iphone', 'laptop', 'shoe', 'shirt', 'best'];
    const movieKeywords = ['book', 'ticket', 'movie', 'cinema', 'show', 'film', 'theater', 'watch'];

    // Extraction Logic
    const extractedKeywords: string[] = [];

    let ecommerceScore = 0;
    let movieScore = 0;

    ecommerceKeywords.forEach(k => {
        if (lowerPrompt.includes(k)) {
            ecommerceScore++;
            extractedKeywords.push(k);
        }
    });

    movieKeywords.forEach(k => {
        if (lowerPrompt.includes(k)) {
            movieScore++;
            extractedKeywords.push(k);
        }
    });

    // Extract proper nouns or specific items (Naive implementation)
    // Just grabbing the words after action verbs for demo
    const actionVerbs = ['buy', 'book', 'watch', 'get'];
    const words = lowerPrompt.split(' ');
    actionVerbs.forEach(verb => {
        const idx = words.indexOf(verb);
        if (idx !== -1 && idx + 1 < words.length) {
            const target = words.slice(idx + 1).join(' '); // rudimentary
            if (!extractedKeywords.includes(target)) extractedKeywords.push(target);
        }
    });

    // Decision Logic
    if (movieScore > ecommerceScore) {
        return { type: 'MOVIE', keywords: extractedKeywords, confidence: 0.9 };
    } else {
        // Default to Ecommerce if unclear or tied (most common)
        return { type: 'ECOMMERCE', keywords: extractedKeywords, confidence: 0.85 };
    }
};
