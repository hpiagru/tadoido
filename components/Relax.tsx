
import React, { useState, useEffect, useRef } from 'react';
import { Play, Wind, Clock, ChevronRight, Pause, X, Music, Volume2, Sparkles, Zap, Award, Shield, Brain, Moon, Bed } from 'lucide-react';
import { MOCK_MEDITATIONS, MOCK_SOUNDS } from '../constants';

const Relax: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inspire' | 'Segure' | 'Expire'>('Inspire');
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [selectedMeditation, setSelectedMeditation] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const meditations = MOCK_MEDITATIONS;
  const standardMeditations = meditations.filter(m => !m.id.startsWith('adv') && !m.id.startsWith('sleep'));
  const advancedMeditations = meditations.filter(m => m.id.startsWith('adv'));
  const sleepExercises = meditations.filter(m => m.id.startsWith('sleep') || m.category === 'Sono');

  const filteredStandard = activeCategory === 'Todas' 
    ? standardMeditations 
    : standardMeditations.filter(m => m.category === activeCategory);

  // Reprodução de Sons Ambientes (Audio API)
  useEffect(() => {
    if (activeSound) {
      const soundData = MOCK_SOUNDS.find(s => s.id === activeSound);
      if (soundData) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        audioRef.current = new Audio(soundData.url);
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
        audioRef.current.play().catch(err => {
          console.warn("Auto-play bloqueado pelo navegador. Clique novamente.", err);
          setActiveSound(null);
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, [activeSound]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Ciclo de Respiração
  useEffect(() => {
    if (!isBreathing) return;
    let timer: any;
    const runCycle = () => {
      setBreathPhase('Inspire');
      timer = setTimeout(() => {
        setBreathPhase('Segure');
        timer = setTimeout(() => {
          setBreathPhase('Expire');
          timer = setTimeout(runCycle, 4000);
        }, 4000);
      }, 4000);
    };
    runCycle();
    return () => clearTimeout(timer);
  }, [isBreathing]);

  // Progresso do Player de Meditação
  useEffect(() => {
    let interval: any;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => prev + 0.5);
      }, 1000);
    } else if (progress >= 100) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handlePlayMeditation = (med: any) => {
    setSelectedMeditation(med);
    setIsPlaying(true);
    setProgress(0);
  };

  return (
    <div className="space-y-12 fade-in pb-20">
      {/* Biofeedback Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[48px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl border border-white/5">
        <div className="max-w-md text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3 fill-current" /> Bio-Ritmo Ativo
          </div>
          <h2 className="text-4xl font-black mb-6">Respiração de Coerência</h2>
          <p className="text-slate-400 mb-8 leading-relaxed font-medium">
            Sincronize sua frequência cardíaca para reduzir o cortisol instantaneamente.
          </p>
          <button
            onClick={() => setIsBreathing(!isBreathing)}
            className="w-full md:w-auto bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-50 transition-all"
          >
            {isBreathing ? 'Finalizar Sessão' : 'Iniciar Respiração'}
          </button>
        </div>

        <div className="relative flex items-center justify-center w-64 h-64">
           <div className={`absolute inset-0 rounded-full border-4 border-indigo-500/20 transition-all duration-[4000ms] ${isBreathing && breathPhase === 'Inspire' ? 'scale-125 opacity-100' : 'scale-75 opacity-20'}`} />
           <div className={`w-40 h-40 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 transition-transform duration-[4000ms] ${isBreathing && breathPhase === 'Inspire' ? 'scale-110' : 'scale-90'}`}>
              <span className="text-xl font-black uppercase tracking-widest text-white">
                {isBreathing ? breathPhase : <Wind className="w-12 h-12 text-indigo-400" />}
              </span>
           </div>
        </div>
      </section>

      {/* Sons Ambientes Reais */}
      <section>
         <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Sons da Natureza</h2>
              <p className="text-slate-500 font-medium italic">Teste os sons reais abaixo para imersão sonora imediata.</p>
            </div>
            {activeSound && (
              <div className="flex items-center gap-4 bg-white px-6 py-2 rounded-2xl border border-slate-100 shadow-sm animate-in slide-in-from-right-4">
                 <Volume2 className="w-4 h-4 text-slate-400" />
                 <input 
                   type="range" min="0" max="1" step="0.01" value={volume} 
                   onChange={(e) => setVolume(parseFloat(e.target.value))}
                   className="w-24 accent-indigo-600"
                 />
              </div>
            )}
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_SOUNDS.map(sound => (
               <button 
                  key={sound.id}
                  onClick={() => setActiveSound(activeSound === sound.id ? null : sound.id)}
                  className={`p-6 rounded-[32px] border transition-all flex flex-col items-center gap-3 group ${
                     activeSound === sound.id 
                     ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 shadow-sm'
                  }`}
               >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${activeSound === sound.id ? 'bg-white/10 text-white' : sound.color}`}>
                     {sound.icon}
                  </div>
                  <span className="text-xs font-bold">{sound.title}</span>
                  {activeSound === sound.id && (
                     <div className="flex gap-1.5 items-center mt-1">
                        <div className="w-1 h-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1 h-5 bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce" />
                     </div>
                  )}
               </button>
            ))}
         </div>
      </section>

      {/* Biblioteca de Meditação */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Biblioteca de Meditação</h2>
            <p className="text-slate-500 font-medium">Equilíbrio diário para suas emoções.</p>
          </div>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {['Todas', 'Ansiedade', 'Sono', 'Foco', 'Relaxamento'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStandard.map((med) => (
            <div 
              key={med.id} 
              className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => handlePlayMeditation(med)}
            >
              <div className="relative h-56">
                <img src={med.image} alt={med.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 px-3 py-1 rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-lg">
                    {med.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-2xl">
                    <Play className="w-8 h-8 fill-current translate-x-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{med.title}</h3>
                   <div className="flex items-center gap-4 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {med.duration}</span>
                      <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> {med.level}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Player Overlay */}
      {selectedMeditation && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-xl rounded-[60px] overflow-hidden shadow-2xl relative border border-white/20">
            <button 
              onClick={() => { setSelectedMeditation(null); setIsPlaying(false); }}
              className="absolute top-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-80">
              <img src={selectedMeditation.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Music className={`w-20 h-20 text-indigo-500/30 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] ${isPlaying ? 'animate-pulse' : ''}`} />
              </div>
            </div>

            <div className="p-12 pt-0 text-center relative z-10">
              <div className="flex flex-col items-center gap-2 mb-4">
                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                   Abordagem: {selectedMeditation.technique || 'Geral'}
                 </span>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedMeditation.title}</h2>
              </div>
              <p className="text-slate-500 font-medium mb-10 px-8 leading-relaxed italic">"{selectedMeditation.description}"</p>

              <div className="mb-12 px-8">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Em andamento</span>
                  <span>{selectedMeditation.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8">
                <button className="text-slate-300 hover:text-indigo-600 transition-colors"><Volume2 className="w-8 h-8" /></button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-24 h-24 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current translate-x-1" />}
                </button>
                <button className="text-slate-300 hover:text-indigo-600 transition-colors"><Volume2 className="w-8 h-8 rotate-180" /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relax;
