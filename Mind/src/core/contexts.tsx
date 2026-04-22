import { createContext, useContext, useState, ReactNode } from 'react';

// --- User Context ---
interface UserState {
    username: string;
    email: string;
    isAuthenticated: boolean;
}

interface UserContextType extends UserState {
    login: (username: string, email: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserState>({
        username: '',
        email: '',
        isAuthenticated: false,
    });

    const login = (username: string, email: string) => {
        setUser({ username, email, isAuthenticated: true });
    };

    const logout = () => {
        setUser({ username: '', email: '', isAuthenticated: false });
    };

    return (
        <UserContext.Provider value={{ ...user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};

// --- Intent Context ---
export type IntentType = 'ECOMMERCE' | 'MOVIE' | null;

interface IntentState {
    prompt: string;
    detectedIntent: IntentType;
    keywords: string[];
    isProcessing: boolean;
}

interface IntentContextType extends IntentState {
    setPrompt: (prompt: string) => void;
    processIntent: (intent: IntentType, keywords: string[]) => void;
    startProcessing: () => void;
    resetIntent: () => void;
}

const IntentContext = createContext<IntentContextType | undefined>(undefined);

export const IntentProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<IntentState>({
        prompt: '',
        detectedIntent: null,
        keywords: [],
        isProcessing: false,
    });

    const setPrompt = (prompt: string) => {
        setState(prev => ({ ...prev, prompt }));
    };

    const startProcessing = () => {
        setState(prev => ({ ...prev, isProcessing: true }));
    };

    const processIntent = (detectedIntent: IntentType, keywords: string[]) => {
        setState(prev => ({
            ...prev,
            detectedIntent,
            keywords,
            isProcessing: false
        }));
    };

    const resetIntent = () => {
        setState({
            prompt: '',
            detectedIntent: null,
            keywords: [],
            isProcessing: false,
        });
    };

    return (
        <IntentContext.Provider value={{ ...state, setPrompt, processIntent, startProcessing, resetIntent }}>
            {children}
        </IntentContext.Provider>
    );
};

export const useIntent = () => {
    const context = useContext(IntentContext);
    if (!context) throw new Error('useIntent must be used within an IntentProvider');
    return context;
};
