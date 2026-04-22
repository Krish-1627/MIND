import React from 'react';
import { motion } from 'framer-motion';

const defaultWords = ['ORCHESTRATION', 'MIND', 'SESSION', 'CONTEXT', 'DATA', 'ANALYZING', 'NEURAL', 'MATRIX'];

export const OrbitTransition: React.FC<{ prompt?: string }> = ({ prompt }) => {
    // Extract words from prompt, filter small words, and combine with defaults
    const promptWords = prompt
        ? prompt.toUpperCase().split(/\s+/).filter(w => w.length > 2)
        : [];

    // Combine and shuffle to get a variety of words
    const displayWords = [...promptWords, ...defaultWords, ...promptWords]
        .slice(0, 15) // Keep it dense but not overcrowded
        .sort(() => Math.random() - 0.5);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent pointer-events-none overflow-hidden orbit-container"
        >
            {displayWords.map((word, i) => {
                const duration = 4 + Math.random() * 4;
                const delay = Math.random() * -8;
                const radius = 150 + Math.random() * 350;

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 0.6, 0.4, 0], scale: [0, 1, 1.2, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}
                        className="orbit-item text-primary/60 font-mono font-black whitespace-nowrap"
                        style={{
                            '--duration': `${duration}s`,
                            '--delay': `${delay}s`,
                            '--radius': `${radius}px`,
                            fontSize: `${14 + Math.random() * 28}px`,
                            textShadow: '0 0 10px var(--primary-glow)'
                        } as React.CSSProperties}
                    >
                        {word}
                    </motion.div>
                );
            })}

            {/* Central Energy Sphere */}
            <motion.div
                animate={{
                    scale: [1, 2, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{ duration: 4, times: [0, 0.8, 1], repeat: Infinity }}
                className="w-32 h-32 bg-primary rounded-full blur-[60px]"
            />
        </motion.div>
    );
};
