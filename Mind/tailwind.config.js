/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                accent: 'var(--accent)',
                success: 'var(--success)',
                main: 'var(--text-main)',
                dim: 'var(--text-dim)',
                muted: 'var(--text-muted)',
                core: 'var(--bg-core)',
                surface: 'var(--bg-surface)',
                'border-light': 'var(--border-light)',
            },
        },
    },
    plugins: [],
}
