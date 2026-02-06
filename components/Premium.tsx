
import React, { useState, useEffect, useRef } from 'react';
import { Crown, Sparkles, Zap, Brain, Play, Pause, Music, Volume2, ShieldCheck, Heart, Info, ArrowRight, Download, FileText, Baby } from 'lucide-react';
import { PREMIUM_CONTENT } from '../constants';

const Premium: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (activeSound) {
      const soundData = PREMIUM_CONTENT.soundscapes.find(s => s.id === activeSound);
      if (soundData) {
        if (audioRef.current) audioRef.current.pause();
        audioRef.current = new Audio(soundData.url);
        audioRef.current.loop = true;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
    }
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, [activeSound]);

  return (
    <div className="space-y-12 fade-in pb-20">
      <header className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(251,191,36,0.5)]">
            <Crown className="w-3.5 h-3.5 fill-current" /> Plano Ilimitado Ativo
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight tracking-tight">
            Experiência <span className="text-amber-400">Premium</span> <br /> 
            Neuro-Inclusiva.
          </h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
            Acesso a ferramentas avançadas para TDAH, Autismo e relatórios clínicos de alta performance.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20" />
      </header>

      {/* Neurodivergence Resources */}
      <section>
        <div className="flex items-center gap-2 mb-8">
           <Baby className="w-6 h-6 text-indigo-500" />
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Material de Apoio (TDAH & Autismo)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {PREMIUM_CONTENT.supportMaterial.map(mat => (
             <div key={mat.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                <div>
                   <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-slate-800 mb-1">{mat.title}</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mat.type} • {mat.size}</p>
                </div>
                <button className="mt-8 flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all">
                   {mat.icon} Baixar Agora
                </button>
             </div>
           ))}
        </div>
      </section>

      {/* Binaural Beats Section */}
      <section>
        <div className="flex items-center gap-2 mb-8">
           <Zap className="w-6 h-6 text-purple-600" />
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Neuro-Frequências de Foco</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {PREMIUM_CONTENT.soundscapes.map(sound => (
             <div 
               key={sound.id}
               className={`relative p-10 rounded-[48px] overflow-hidden group cursor-pointer transition-all border ${activeSound === sound.id ? 'border-amber-400 ring-4 ring-amber-400/10' : 'border-slate-100'}`}
               onClick={() => setActiveSound(activeSound === sound.id ? null : sound.id)}
             >
                <div className={`absolute inset-0 bg-gradient-to-br ${sound.color} opacity-90 transition-opacity group-hover:opacity-100`} />
                <div className="relative z-10 flex items-center justify-between text-white">
                   <div>
                      <h3 className="text-2xl font-black mb-2">{sound.title}</h3>
                      <p className="text-white/70 text-sm font-medium">Ondas Delta/Beta para regulação cognitiva.</p>
                   </div>
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      {activeSound === sound.id && isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-1" />}
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* IA Health Concierge */}
      <section className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div>
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                 <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Relatórios para Especialistas</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                 Exporte logs completos formatados para levar na consulta com seu neuropediatra ou psicólogo. A IA Serene resume padrões de sono, crises e progresso semanal.
              </p>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
                 Gerar PDF Clínico <ArrowRight className="w-4 h-4" />
              </button>
           </div>
           <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-200">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 font-black">AI</div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Resumo Semanal</p>
                    <p className="text-sm font-bold text-slate-800">Paciente: Ricardo (Foco TEA)</p>
                 </div>
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                 "Observamos uma melhora de 30% na tolerância a estímulos auditivos após o uso das Neuro-Frequências nas manhãs de terça e quarta."
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Premium;
