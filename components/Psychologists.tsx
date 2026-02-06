
import React, { useState } from 'react';
import { 
  Star, Video, Calendar, Shield, MapPin, Monitor, Layers, 
  Sparkles, CheckCircle, QrCode, Copy, Check, Clock, X,
  ExternalLink, BookOpen, ToggleLeft, ToggleRight, FileText, Loader2,
  ShieldCheck, AlertCircle, Info
} from 'lucide-react';
import { MOCK_PSYCHOLOGISTS } from '../constants';
import { AppView, AttendanceMode, Professional } from '../types';
import { geminiService } from '../services/geminiService';

interface PsychologistsProps {
  onNavigate: (view: AppView) => void;
  logs: any[];
}

const PsychologistCard: React.FC<{ psychologist: Professional; logs: any[]; isRecommended?: boolean }> = ({ psychologist, logs, isRecommended }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'payment' | 'scheduling' | 'confirmed'>('info');
  const [selectedMode, setSelectedMode] = useState<'online' | 'presencial' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareJournal, setShareJournal] = useState(false);
  const [isGeneratingFicha, setIsGeneratingFicha] = useState(false);

  const finalPrice = selectedMode === 'online' ? 100 : (200 * 0.75); // 25% OFF

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }));
    }
    return days;
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("PIX-VALIDO-CUIDADEMIM");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white rounded-[40px] overflow-hidden border ${isRecommended ? 'border-indigo-200 shadow-2xl' : 'border-slate-100'} hover:shadow-xl transition-all duration-500 flex flex-col`}>
      {isRecommended && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest py-2 text-center flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-current" /> Recomendação IA
        </div>
      )}
      
      <div className="p-8 flex-1">
        <div className="flex items-start justify-between mb-8">
          <div className="relative">
            <img src={psychologist.imageUrl} alt={psychologist.name} className="w-24 h-24 rounded-[32px] object-cover shadow-xl border-4 border-white" />
            <div className="absolute -bottom-3 -right-3 bg-white px-2 py-1.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-1 text-[10px] font-black text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" /> {psychologist.rating}
            </div>
          </div>
          <div className="text-right">
             <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                <CheckCircle className="w-3 h-3" /> Psicólogo CRP
             </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{psychologist.name}</h3>
          <p className="text-xs text-slate-500 mb-4 font-medium italic">{psychologist.specialty.join(', ')}</p>
        </div>

        {activeTab === 'info' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Modalidades Disponíveis</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { setSelectedMode('online'); setActiveTab('payment'); }} className="flex flex-col items-center gap-3 p-6 bg-blue-50 border border-blue-100 rounded-3xl hover:bg-blue-100 transition-all">
                <Monitor className="w-8 h-8 text-blue-600" />
                <div className="text-center"><p className="text-[10px] font-black uppercase text-blue-400">Online</p><p className="text-sm font-bold text-blue-900">R$ 100</p></div>
              </button>
              <button onClick={() => { setSelectedMode('presencial'); setActiveTab('payment'); }} className="flex flex-col items-center gap-3 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl hover:bg-emerald-100 transition-all relative overflow-hidden group">
                <div className="absolute top-2 right-2 bg-amber-400 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase animate-pulse">25% OFF</div>
                <MapPin className="w-8 h-8 text-emerald-600" />
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase text-emerald-400">Presencial</p>
                  <p className="text-sm font-bold text-emerald-900">R$ 150</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="bg-slate-900 p-6 rounded-[32px] text-white">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Agendamento</p>
                <p className="text-xl font-black">R$ {finalPrice.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl mb-4 flex justify-center"><QrCode className="w-32 h-32 text-slate-900" /></div>
              <button onClick={handleCopyPix} className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copiado!' : 'Copiar PIX'}
              </button>
            </div>
            <button onClick={() => setActiveTab('scheduling')} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase hover:bg-indigo-700 shadow-xl transition-all">Paguei e Quero Escolher Dia</button>
          </div>
        )}

        {activeTab === 'scheduling' && (
          <div className="space-y-6 animate-in zoom-in-95">
             <div className="space-y-4">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1. Escolha o Dia</p>
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {getNextDays().map(day => (
                    <button 
                      key={day} 
                      onClick={() => setSelectedDate(day)}
                      className={`flex-shrink-0 px-4 py-3 rounded-2xl text-[10px] font-black uppercase border transition-all ${selectedDate === day ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
                    >
                      {day}
                    </button>
                  ))}
               </div>
             </div>

             <div className="space-y-4">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2. Escolha o Horário</p>
               <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:30', '14:00', '16:00', '17:30'].map(h => (
                    <button 
                      key={h} 
                      onClick={() => setSelectedSlot(h)}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all ${selectedSlot === h ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-500'}`}
                    >
                      {h}
                    </button>
                  ))}
               </div>
             </div>

             <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="flex items-start gap-3">
                   <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                   <p className="text-[10px] text-amber-700 leading-relaxed font-bold uppercase">
                      Regras: Cancelamento grátis até 24h antes. Remarcações seguem a mesma regra.
                   </p>
                </div>
             </div>

             <button 
              disabled={!selectedDate || !selectedSlot}
              onClick={() => setActiveTab('confirmed')} 
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase shadow-xl transition-all disabled:opacity-30"
             >
               Finalizar Agendamento
             </button>
          </div>
        )}

        {activeTab === 'confirmed' && (
          <div className="text-center py-10 space-y-6 animate-in zoom-in-95">
             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><CheckCircle className="w-10 h-10 text-emerald-600" /></div>
             <h3 className="text-2xl font-black text-slate-900">Consulta Confirmada!</h3>
             <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-sm font-bold text-slate-700">{selectedDate} às {selectedSlot}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Modalidade: {selectedMode}</p>
             </div>
             <button onClick={() => setActiveTab('info')} className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-xs uppercase">Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Psychologists: React.FC<PsychologistsProps> = ({ onNavigate, logs }) => {
  return (
    <div className="space-y-12 fade-in pb-20">
      <header className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase mb-8 border border-indigo-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Rede de Especialistas Cuida de Mim
            </div>
            <h2 className="text-5xl font-black mb-6 leading-tight tracking-tight">Atendimento Ético e Profissional.</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Sua saúde mental é nossa prioridade. Todos os profissionais são validados pelo CRP.</p>
        </div>
      </header>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PSYCHOLOGISTS.map((pro) => (
            <PsychologistCard key={pro.id} psychologist={pro} logs={logs} isRecommended={pro.id === '1'} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Psychologists;
