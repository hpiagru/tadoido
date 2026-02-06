
import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, User, Briefcase, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { UserRole, AppView } from '../types';

interface AuthProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (view: AppView) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulação de autenticação segura
    setTimeout(() => {
      if (email.length < 5 || password.length < 4) {
        setError('Por favor, preencha as credenciais corretamente.');
        setIsLoading(false);
        return;
      }
      
      if (selectedRole === 'admin' && (email !== 'admin@cuida.com' || password !== 'admin123')) {
        setError('Acesso negado. Apenas administradores autorizados.');
        setIsLoading(false);
        return;
      }

      onLogin(selectedRole);
      setIsLoading(false);
    }, 1200);
  };

  const handleSocialLogin = (platform: string) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin('patient');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl shadow-indigo-100 border border-slate-100 overflow-hidden">
        <div className="p-10 text-center bg-slate-900 text-white">
          <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
             <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-tight">Login Seguro</h2>
          <p className="text-slate-400 text-sm font-medium mt-2">Plataforma Clínica Cuida de Mim</p>
        </div>

        <div className="p-10">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setSelectedRole('patient')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${selectedRole === 'patient' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              Paciente
            </button>
            <button 
              onClick={() => setSelectedRole('professional')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${selectedRole === 'professional' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
            >
              Psicólogo
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <button onClick={() => handleSocialLogin('Google')} className="w-full py-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
              <span className="text-sm font-bold text-slate-700">Entrar com Google</span>
            </button>
          </div>

          <div className="flex items-center gap-4 py-2 mb-8">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ou e-mail</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <input 
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="E-mail profissional"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-800"
            />
            <input 
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-800"
            />

            {error && (
              <div className="flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-50 p-4 rounded-2xl border border-rose-100">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-5 rounded-[24px] font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Acessar Sistema <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
