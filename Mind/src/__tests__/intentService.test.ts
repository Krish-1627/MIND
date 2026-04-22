
import { describe, test, expect, vi } from 'vitest';
import { analyzePrompt } from '../core/intentService';

describe('Intent Detection Service', () => {

    test('TC-001: Should detect ECOMMERCE intent for "buy iphone"', async () => {
        const result = await analyzePrompt('buy iphone');
        expect(result.type).toBe('ECOMMERCE');
        expect(result.keywords).toContain('buy');
        expect(result.keywords).toContain('iphone');
    });

    test('TC-003: Should detect MOVIE intent for "book movie tickets"', async () => {
        const result = await analyzePrompt('book movie tickets');
        expect(result.type).toBe('MOVIE');
        expect(result.keywords).toContain('movie');
    });

    test('TC-004: Should detect ECOMMERCE for "search nice shirt"', async () => {
        // "shirt" is an ecommerce keyword
        const result = await analyzePrompt('search nice shirt');
        expect(result.type).toBe('ECOMMERCE');
        expect(result.keywords).toContain('shirt');
    });

    // Testing default behavior
    test('Should default to ECOMMERCE if unclear', async () => {
        // "hello world" has no specific keywords
        const result = await analyzePrompt('hello world');
        expect(result.type).toBe('ECOMMERCE');
    });
});
