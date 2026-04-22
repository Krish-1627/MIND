import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../core/contexts';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PageTransition } from '../components/layout/PageTransition';
import { User, Mail } from 'lucide-react';

export const UserEntry = () => {
    const { login } = useUser();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ name?: string, email?: string }>({});

    const validate = () => {
        const newErrors: any = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            login(name, email);
            navigate('/prompt');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <PageTransition>
                <div className="glass-panel p-10 rounded-3xl border-border-light shadow-2xl backdrop-blur-3xl">
                    <div className="mb-10 text-center">
                        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent mb-2 tracking-tight">
                            MIND
                        </h1>
                        <p className="text-text-dim text-sm font-medium tracking-widest uppercase">Orchestration & Intelligence</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            placeholder="Your Name"
                            icon={<User size={20} />}
                            className="text-main"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            error={errors.name}
                        />
                        <Input
                            placeholder="Email Address"
                            type="email"
                            icon={<Mail size={20} />}
                            className="text-main"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            error={errors.email}
                        />

                        <div className="pt-4">
                            <Button
                                fullWidth
                                type="submit"
                                className="py-4 text-lg font-bold bg-primary text-white shadow-glow"
                            >
                                Enter Interface
                            </Button>
                        </div>
                    </form>
                </div>
            </PageTransition>
        </div>
    );
};
