import React, { useState, useEffect, useRef } from 'react';
import { Crown, Sparkles, Zap, Brain, Play, Pause, Music, Volume2, ShieldCheck, Heart, Info, ArrowRight, Download, FileText, Baby, CreditCard, Lock } from 'lucide-react';
import { PREMIUM_CONTENT, PLANS } from '../constants';

const Premium: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const premiumPlan = PLANS.find(p => p.id === 'premium');

  return (
    <div className="space-y-12 fade-in pb-20">
      <header className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
            <Crown className="w-3.5 h-3.5 fill-current" /> Upgrade para o Próximo Nível
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight tracking-tight">
            Liberte seu <span className="text-amber-400">Potencial</span> <br /> 
            Neuro-Inclusivo.
          </h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
            Acesso a todas as ferramentas avançadas: 100% dos exercícios de sono, relatórios clínicos e IA Personalizada.
          </p>
          <button className="bg-amber-400 text-slate-900 px-10 py-5 rounded-[32px] font-black text-xl shadow-2xl shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
             <CreditCard className="w-6 h-6" /> Adquirir Plano por R$ 34,90
          </button>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20" />
      </header>

      {/* Neurodivergence Resources */}
      <section>
        <div className="flex items-center gap-2 mb-8">
           <Baby className="w-6 h-6 text-indigo-500" />
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Conteúdo Exclusivo Premium</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {PREMIUM_CONTENT.supportMaterial.map(mat => (
             <div key={mat.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                <div>
                   <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                      <FileText className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-slate-800 mb-1">{mat.title}</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mat.type}</p>
                </div>
                {/* Fixed: Lock component is now imported from lucide-react */}
                <button className="mt-8 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold cursor-not-allowed">
                   <Lock className="w-3 h-3" /> Assine para Baixar
                </button>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Premium;