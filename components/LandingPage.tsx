
import React from 'react';
import { 
  Heart, Sparkles, ShieldCheck, ArrowRight, CheckCircle, 
  Target, TrendingUp, Brain, Activity, BookOpen, 
  Smile, Baby, Crown, Star, Flame, Stethoscope, Microscope, Zap, Users,
  Briefcase, Quote
} from 'lucide-react';
import { AppView, UserRole } from '../types';
import { PLANS, TESTIMONIALS } from '../constants';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  onSetRole: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSetRole }) => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
               <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tighter">Cuida de Mim</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('login')} className="hidden md:block text-xs font-black text-slate-500 hover:text-indigo-600 uppercase tracking-widest transition-colors">
              Entrar
            </button>
            <button onClick={() => { onSetRole('patient'); onNavigate('register-patient'); }} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95">
              Começar Agora
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-24 px-6 relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-indigo-100 animate-bounce">
            <Sparkles className="w-4 h-4 fill-current" /> Psicologia Clínica & Neurodiversidade
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Tratando a alma, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">curando o corpo.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            A primeira plataforma que une <strong>IA Clínica</strong> à expertise de <strong>Psicólogos CRP</strong> para tratar TDAH, Autismo e a Causa Raiz do seu sofrimento.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
            <button onClick={() => { onSetRole('patient'); onNavigate('register-patient'); }} className="w-full md:w-auto bg-indigo-600 text-white px-12 py-6 rounded-[32px] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3">
              Fazer Triagem Gratuita <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Depoimentos */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-center text-4xl font-black text-slate-900 mb-16 tracking-tight">Quem usa o Cuida de Mim recomenda.</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 relative">
                   <Quote className="w-10 h-10 text-indigo-100 absolute top-8 left-8" />
                   <div className="relative z-10">
                      <p className="text-slate-600 text-lg italic leading-relaxed mb-8">"{t.text}"</p>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black">{t.name[0]}</div>
                         <div>
                            <p className="font-bold text-slate-900">{t.name}</p>
                            <p className="text-xs text-slate-400 font-bold uppercase">{t.role}</p>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Regras de Atendimento */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-white border-2 border-slate-100 p-16 rounded-[64px] shadow-sm">
           <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Regras Éticas de Atendimento</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                 <h4 className="font-black text-indigo-600 uppercase tracking-widest text-xs mb-4">Cancelamentos</h4>
                 <ul className="space-y-4 text-sm text-slate-600">
                    <li className="flex gap-2"><b>Grátis:</b> Até 24h antes do horário.</li>
                    <li className="flex gap-2"><b>Taxa 50%:</b> Menos de 24h até 4h antes.</li>
                    <li className="flex gap-2"><b>Taxa 100%:</b> Menos de 4h ou não comparecimento.</li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-black text-emerald-600 uppercase tracking-widest text-xs mb-4">Remarcações</h4>
                 <ul className="space-y-4 text-sm text-slate-600">
                    <li className="flex gap-2">Seguem as mesmas janelas de cancelamento. Sujeito à disponibilidade do especialista.</li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-slate-900 text-white rounded-t-[64px]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"><Heart className="w-7 h-7 text-white fill-current" /></div>
                  <span className="font-black text-3xl tracking-tighter">Cuida de Mim</span>
               </div>
               <p className="text-slate-400 text-lg max-w-sm font-medium leading-relaxed">Tratando a alma, curando o corpo.</p>
            </div>
            <div>
               <h5 className="font-black uppercase tracking-widest text-xs text-indigo-400 mb-8">Jurídico</h5>
               <ul className="space-y-4 text-slate-400 font-bold">
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('lgpd')}>Privacidade (LGPD)</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Termos de Uso</li>
               </ul>
            </div>
          </div>
          <p className="text-center text-slate-600 text-[10px] font-black uppercase">© 2024 Cuida de Mim • Clínica IA Registro: 88721</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
