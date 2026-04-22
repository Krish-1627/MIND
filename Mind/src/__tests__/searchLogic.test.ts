
import { describe, test, expect } from 'vitest';
import { getEcommerceSuggestions } from '../core/searchLogic';

describe('Search Algorithm Logic', () => {

    test('TC-009: Should find T-Shirt when searching "tshirt"', () => {
        const keywords = ['tshirt'];
        const prompt = 'show me tshirts';
        const intent = 'ECOMMERCE';

        // NOTE: The products array is imported inside searchLogic. 
        // We assume products like "Blue V-Neck T-Shirt" exist in the catalog.
        const suggestions = getEcommerceSuggestions(keywords, prompt, intent);

        expect(suggestions.length).toBeGreaterThan(0);
        // Check if top result is a T-Shirt
        expect(suggestions[0].name.toLowerCase()).toContain('t-shirt');
    });

    test('TC-010: Should find OnePlus when searching "oneplus"', () => {
        const keywords = ['oneplus'];
        const prompt = 'oneplus phone';
        const intent = 'ECOMMERCE';

        const suggestions = getEcommerceSuggestions(keywords, prompt, intent);

        expect(suggestions.length).toBeGreaterThan(0);
        expect(suggestions[0].name.toLowerCase()).toContain('oneplus');
    });

    test('TC-010-B: Should find OnePlus when searching "one plus" (Space normalization)', () => {
        const keywords = ['one', 'plus']; // Depending on how tokenizer works
        const prompt = 'one plus phone';
        const intent = 'ECOMMERCE';

        const suggestions = getEcommerceSuggestions(keywords, prompt, intent);

        expect(suggestions.length).toBeGreaterThan(0);
        expect(suggestions[0].name.toLowerCase()).toContain('oneplus');
    });

    test('TC-018: T-Shirt vs Shirt Disambiguation (Boost T-Shirt)', () => {
        // This test ensures that when user asks for t-shirt, formal shirts are penalized/ranked lower
        // or t-shirts are ranked higher.
        const keywords = ['tshirt'];
        const prompt = 'i want a tshirt';
        const intent = 'ECOMMERCE';

        const suggestions = getEcommerceSuggestions(keywords, prompt, intent);

        // Ensure top result is definitely a T-Shirt and not a Formal Shirt
        const topResult = suggestions[0];
        expect(topResult.category).toMatch(/top wear/i);
        expect(topResult.name.toLowerCase()).toContain('t-shirt');
    });

    test('TC-013: Pluralization (sock -> socks)', () => {
        const keywords = ['sock'];
        const prompt = 'pair of sock';
        const intent = 'ECOMMERCE';

        const suggestions = getEcommerceSuggestions(keywords, prompt, intent);

        // Should find socks
        expect(suggestions.length).toBeGreaterThan(0);
        const hasSocks = suggestions.some(p => p.name.toLowerCase().includes('socks') || p.category.toLowerCase().includes('accessories'));
        expect(hasSocks).toBe(true);
    });

    // Scoring Logic Tests
    test('TC-015: Exact name match should have high score (implicit via sorting)', () => {
        const keywords = ['iphone', '16'];
        const prompt = 'iphone 16';
        const intent = 'ECOMMERCE';

        const suggestions = getEcommerceSuggestions(keywords, prompt, intent);
        // iPhone 16 should be top
        expect(suggestions[0].name).toContain('iPhone 16');
    });

    test('Edge Case: Wrong intent should return empty array', () => {
        const suggestions = getEcommerceSuggestions(['tshirt'], 'tshirt', 'MOVIES');
        expect(suggestions).toEqual([]);
    });

    test('Edge Case: Empty keywords and prompt', () => {
        const suggestions = getEcommerceSuggestions([], '', 'ECOMMERCE');
        expect(suggestions).toEqual([]);
    });
});
