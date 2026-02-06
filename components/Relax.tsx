
import React, { useState, useEffect, useRef } from 'react';
import { Play, Wind, Clock, ChevronRight, Pause, X, Music, Volume2, Sparkles, Zap, Award, Shield, Brain, Moon, Bed, Lock } from 'lucide-react';
import { MOCK_MEDITATIONS, MOCK_SOUNDS } from '../constants';

const Relax: React.FC<{ isPremium?: boolean; onNavigate: (view: any) => void }> = ({ isPremium = false, onNavigate }) => {
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
  const filteredMeditations = activeCategory === 'Todas' 
    ? meditations 
    : meditations.filter(m => m.category === activeCategory);

  useEffect(() => {
    if (activeSound) {
      const soundData = MOCK_SOUNDS.find(s => s.id === activeSound);
      if (soundData) {
        if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
        audioRef.current = new Audio(soundData.url);
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => setActiveSound(null));
      }
    } else {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    }
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, [activeSound]);

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

  const handlePlayMeditation = (med: any) => {
    if (med.category === 'Sono' && !med.isFree && !isPremium) {
      alert("Este exercício de sono avançado é exclusivo para membros Premium.");
      onNavigate('premium');
      return;
    }
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
          <p className="text-slate-400 mb-8 leading-relaxed font-medium">Sincronize sua frequência cardíaca para reduzir o estresse.</p>
          <button onClick={() => setIsBreathing(!isBreathing)} className="w-full md:w-auto bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-50">
            {isBreathing ? 'Finalizar Sessão' : 'Iniciar Respiração'}
          </button>
        </div>

        <div className="relative flex items-center justify-center w-64 h-64">
           <div className={`absolute inset-0 rounded-full border-4 border-indigo-500/20 transition-all duration-[4000ms] ${isBreathing && breathPhase === 'Inspire' ? 'scale-125 opacity-100' : 'scale-75 opacity-20'}`} />
           <div className={`w-40 h-40 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 transition-transform duration-[4000ms] ${isBreathing && breathPhase === 'Inspire' ? 'scale-110' : 'scale-90'}`}>
              <span className="text-xl font-black uppercase text-white">{isBreathing ? breathPhase : <Wind className="w-12 h-12 text-indigo-400" />}</span>
           </div>
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
            {['Todas', 'Ansiedade', 'Sono', 'Foco'].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-400 border-slate-100'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeditations.map((med) => (
            <div key={med.id} className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all cursor-pointer relative" onClick={() => handlePlayMeditation(med)}>
              {!med.isFree && med.category === 'Sono' && !isPremium && (
                <div className="absolute top-4 right-4 z-10 bg-amber-400 text-slate-900 p-2 rounded-xl shadow-lg">
                   <Lock className="w-4 h-4" />
                </div>
              )}
              <div className="relative h-56">
                <img src={med.image} alt={med.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                   <h3 className="text-xl font-bold text-white mb-1">{med.title}</h3>
                   <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">{med.duration} • {med.level}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedMeditation && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
          <div className="bg-white w-full max-w-xl rounded-[60px] overflow-hidden shadow-2xl relative p-12 text-center">
            <button onClick={() => setSelectedMeditation(null)} className="absolute top-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><X className="w-6 h-6" /></button>
            <h2 className="text-3xl font-black text-slate-900 mb-4">{selectedMeditation.title}</h2>
            <p className="text-slate-500 font-medium mb-10 italic">"{selectedMeditation.description}"</p>
            <div className="w-24 h-24 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl hover:scale-105 transition-all">
              <Play className="w-10 h-10 fill-current translate-x-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relax;
