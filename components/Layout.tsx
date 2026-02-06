
import React, { useState, useEffect } from 'react';
import { AppView, UserRole } from '../types';
import { NAVIGATION_ITEMS } from '../constants';
import { LayoutDashboard, ShieldCheck, LogOut, Home, WifiOff, RefreshCcw, PhoneCall, ExternalLink, X, Heart, UserCircle, AlertTriangle, Crown, CalendarPlus } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isCrisisMode?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, userRole, setUserRole, isCrisisMode = false }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showSOS, setShowSOS] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (activeView === 'landing' || activeView === 'login') return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-rose-600 text-white px-4 py-2 text-center text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
          <WifiOff className="w-3 h-3" /> Modo Offline Ativo
        </div>
      )}

      {/* Sidebar Desktop */}
      <nav className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 fixed h-full shadow-sm z-40">
        <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => setActiveView('dashboard')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="font-black text-xl text-slate-800 tracking-tight">Cuida de Mim</span>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {userRole === 'patient' && (
            <>
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as AppView)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                    activeView === item.id 
                      ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                  {item.id === 'premium' && <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />}
                </button>
              ))}
              <button
                onClick={() => setActiveView('profile')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                  activeView === 'profile' ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <UserCircle className="w-5 h-5" /> Minha Conta
              </button>
            </>
          )}

          {userRole === 'professional' && (
            <button
              onClick={() => setActiveView('pro-dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeView === 'pro-dashboard' ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" /> Meu Painel
            </button>
          )}

          {userRole === 'admin' && (
            <button
              onClick={() => setActiveView('admin-dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeView === 'admin-dashboard' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-5 h-5" /> Gestão Global
            </button>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <button 
            onClick={() => { setUserRole('guest'); setActiveView('landing'); }}
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-500 transition-colors w-full text-sm font-bold"
          >
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 mb-20 md:mb-0">
        <div className="max-w-5xl mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 py-2 flex justify-between items-center z-50">
        <button onClick={() => setActiveView('dashboard')} className={`flex flex-col items-center p-2 ${activeView === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Home className="w-5 h-5" /><span className="text-[10px] font-bold">Início</span>
        </button>
        <button onClick={() => setActiveView('premium')} className={`flex flex-col items-center p-2 ${activeView === 'premium' ? 'text-amber-500' : 'text-slate-400'}`}>
          <Crown className="w-5 h-5" /><span className="text-[10px] font-bold">VIP</span>
        </button>
        <button onClick={() => setActiveView('psychologists')} className={`flex flex-col items-center p-2 ${activeView === 'psychologists' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <CalendarPlus className="w-5 h-5" /><span className="text-[10px] font-bold">Agendar</span>
        </button>
        <button onClick={() => setActiveView('profile')} className={`flex flex-col items-center p-2 ${activeView === 'profile' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <UserCircle className="w-5 h-5" /><span className="text-[10px] font-bold">Conta</span>
        </button>
      </nav>

      {/* Botão Global Agendar Agora */}
      {userRole === 'patient' && activeView !== 'psychologists' && (
        <button 
          onClick={() => setActiveView('psychologists')}
          className="fixed left-6 bottom-24 md:bottom-10 z-[60] bg-emerald-600 text-white px-6 py-4 rounded-full font-black shadow-2xl flex items-center gap-2 hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
        >
          <CalendarPlus className="w-5 h-5" />
          Agendar Agora
        </button>
      )}

      {/* SOS Button */}
      {userRole === 'patient' && (
        <button 
          onClick={() => setShowSOS(true)} 
          className={`fixed right-6 bottom-24 md:bottom-10 z-[60] px-6 py-4 rounded-full font-black shadow-2xl flex items-center gap-2 transition-all duration-500 ${
            isCrisisMode 
              ? 'bg-rose-600 text-white animate-[pulse_1s_infinite] scale-110 ring-4 ring-rose-500/50' 
              : 'bg-amber-400 text-slate-900 animate-pulse'
          }`}
        >
          {isCrisisMode ? <AlertTriangle className="w-6 h-6" /> : <PhoneCall className="w-5 h-5" />}
          {isCrisisMode ? 'APERTE AQUI URGENTE' : 'SOS'}
        </button>
      )}

      {showSOS && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 relative border-4 border-rose-500">
            <button onClick={() => setShowSOS(false)} className="absolute top-6 right-6 p-2 text-slate-400"><X className="w-6 h-6" /></button>
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PhoneCall className="w-10 h-10 text-rose-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Você não está só.</h2>
              <p className="text-slate-500 mb-8 font-medium">O CVV oferece apoio emocional 24h gratuito para prevenção ao suicídio.</p>
              <a href="tel:188" className="block w-full bg-rose-600 text-white py-5 rounded-2xl font-black text-xl mb-4 hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200">Ligar 188</a>
              <button onClick={() => setShowSOS(false)} className="text-slate-400 text-sm font-bold uppercase tracking-widest hover:text-slate-600">Voltar ao App</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
