
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, ShieldCheck, Anchor, BookOpen, Clock, X, ChevronRight, BrainCircuit } from 'lucide-react';
import { ChatMessage } from '../types';
import { geminiService } from '../services/geminiService';
import { THERAPEUTIC_PROMPTS } from '../constants';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Olá. Eu sou Serene, sua mentora de suporte emocional. Percebo que você está buscando um espaço de acolhimento. Como posso ajudar sua mente hoje?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeIntervention, setActiveIntervention] = useState<'grounding' | 'writing' | 'pause' | null>(null);
  const [groundingStep, setGroundingStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await geminiService.getChatResponse(messages, textToSend);
    
    setMessages(prev => [...prev, { role: 'model', content: response, timestamp: Date.now() }]);
    setIsLoading(false);
  };

  const startGrounding = () => {
    setActiveIntervention('grounding');
    setGroundingStep(5);
  };

  const renderIntervention = () => {
    switch (activeIntervention) {
      case 'grounding':
        const steps = {
          5: "Identifique 5 coisas que você pode VER agora.",
          4: "Identifique 4 coisas que você pode TOCAR.",
          3: "Identifique 3 coisas que você pode OUVIR.",
          2: "Identifique 2 coisas que você pode CHEIRAR.",
          1: "Identifique 1 coisa que você pode SABOREAR."
        };
        return (
          <div className="bg-indigo-900 text-white p-8 rounded-[40px] shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Anchor className="text-indigo-300 w-6 h-6" />
                <h3 className="font-bold text-lg">Aterramento 5-4-3-2-1</h3>
              </div>
              <button onClick={() => setActiveIntervention(null)}><X className="w-5 h-5 opacity-50" /></button>
            </div>
            <div className="space-y-6">
              <div className="text-center py-4">
                 <p className="text-4xl font-black mb-2 text-indigo-300">{groundingStep}</p>
                 <p className="text-lg font-medium leading-relaxed">{(steps as any)[groundingStep]}</p>
              </div>
              <button 
                onClick={() => groundingStep > 1 ? setGroundingStep(groundingStep - 1) : setActiveIntervention(null)}
                className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg"
              >
                {groundingStep > 1 ? 'Próximo Passo' : 'Concluir Exercício'}
              </button>
            </div>
          </div>
        );
      case 'writing':
        return (
          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[40px] animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="text-emerald-600 w-6 h-6" />
                <h3 className="font-bold text-emerald-900 text-lg">Escrita Terapêutica</h3>
              </div>
              <button onClick={() => setActiveIntervention(null)}><X className="w-5 h-5 text-emerald-400" /></button>
            </div>
            <div className="grid grid-cols-1 gap-3 mb-4">
              {THERAPEUTIC_PROMPTS.map(p => (
                <button 
                  key={p.id}
                  onClick={() => { handleSend(`Quero escrever sobre: ${p.title}. ${p.prompt}`); setActiveIntervention(null); }}
                  className="p-4 bg-white border border-emerald-100 rounded-2xl text-left hover:border-emerald-500 transition-all group"
                >
                  <p className="text-xs font-black text-emerald-600 uppercase mb-1">{p.title}</p>
                  <p className="text-sm text-slate-600 group-hover:text-emerald-900">{p.prompt}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 'pause':
        return (
          <div className="bg-amber-50 border border-amber-100 p-8 rounded-[40px] text-center animate-in slide-in-from-bottom-4 duration-500">
             <Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
             <h3 className="font-black text-amber-900 text-xl mb-3">Pausa Consciente (1 min)</h3>
             <p className="text-sm text-amber-700 leading-relaxed mb-8 font-medium">
               Pare tudo agora. Feche os olhos. Inspire pelo nariz contando até 4, segure por 2, solte pela boca contando até 6.
             </p>
             <button 
                onClick={() => { handleSend("Fiz uma pausa consciente de 1 minuto."); setActiveIntervention(null); }}
                className="bg-amber-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
              >
                Voltar ao Equilíbrio
              </button>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
             <button onClick={startGrounding} className="p-4 bg-white border border-slate-100 rounded-3xl hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-3 shadow-sm group">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform"><Anchor className="w-5 h-5" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Emergência</p>
                  <p className="text-xs font-bold">Aterramento</p>
                </div>
             </button>
             <button onClick={() => setActiveIntervention('writing')} className="p-4 bg-white border border-slate-100 rounded-3xl hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center gap-3 shadow-sm group">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform"><BookOpen className="w-5 h-5" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reflexão</p>
                  <p className="text-xs font-bold">Escrita Guiada</p>
                </div>
             </button>
             <button onClick={() => setActiveIntervention('pause')} className="p-4 bg-white border border-slate-100 rounded-3xl hover:border-amber-500 hover:text-amber-600 transition-all flex items-center gap-3 shadow-sm group">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform"><Clock className="w-5 h-5" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Foco</p>
                  <p className="text-xs font-bold">Pausa Consciente</p>
                </div>
             </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-3xl mx-auto fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Serene IA</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Mentor Ativo</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
           <ShieldCheck className="w-4 h-4 text-emerald-500" /> Conversa Criptografada
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`p-5 rounded-[32px] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center ml-2 p-4 bg-white rounded-2xl border border-slate-100 text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Processando...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="space-y-4">
        {renderIntervention()}

        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Compartilhe seus pensamentos aqui..."
            className="w-full bg-white border border-slate-200 rounded-[28px] py-5 pl-8 pr-16 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 shadow-lg transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-3 bottom-3 w-12 h-12 bg-indigo-600 text-white rounded-[20px] flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-center text-[9px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-black">
        Espaço Seguro • Escuta Ativa • Sem Julgamentos
      </p>
    </div>
  );
};

export default AICoach;
