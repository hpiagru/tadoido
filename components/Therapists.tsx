
import React, { useState } from 'react';
import { 
  Star, Video, Calendar, Shield, MapPin, Monitor, Layers, 
  Sparkles, CheckCircle, QrCode, Copy, Check, Clock, AlertCircle, X,
  Info, Mail, Smartphone, PartyPopper, ExternalLink, BookOpen, ToggleLeft, ToggleRight
} from 'lucide-react';
import { MOCK_THERAPISTS } from '../constants';
import { AppView, AttendanceMode, Professional } from '../types';

interface TherapistsProps {
  onNavigate: (view: AppView) => void;
  hasDiagnosis?: boolean;
}

const getModeInfo = (mode: AttendanceMode) => {
  switch (mode) {
    case 'online': return { label: 'Online', icon: <Monitor className="w-3 h-3" />, color: 'text-blue-500 bg-blue-50' };
    case 'presencial': return { label: 'Presencial', icon: <MapPin className="w-3 h-3" />, color: 'text-emerald-500 bg-emerald-50' };
    case 'hibrido': return { label: 'Híbrido', icon: <Layers className="w-3 h-3" />, color: 'text-purple-500 bg-purple-50' };
  }
};

const TherapistCard: React.FC<{ therapist: Professional; isRecommended?: boolean }> = ({ therapist, isRecommended }) => {
  const mode = getModeInfo(therapist.attendanceMode);
  const [activeTab, setActiveTab] = useState<'info' | 'payment' | 'scheduling' | 'confirmed'>('info');
  const [selectedMode, setSelectedMode] = useState<'online' | 'presencial' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareJournal, setShareJournal] = useState(false);

  // Lógica de Desconto: 15% OFF se compartilhar o diário (apenas online)
  const basePrice = selectedMode === 'online' ? 100 : 160;
  const discount = (shareJournal && selectedMode === 'online') ? basePrice * 0.15 : 0;
  const finalPrice = basePrice - discount;

  const getWorkDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) days.push(date);
    }
    return days;
  };

  const getVacantSlots = () => {
    const slots = [];
    for (let h = 9; h < 17; h++) {
      if (h !== 12 && h !== 13) {
        slots.push(`${h.toString().padStart(2, '0')}:00`);
        slots.push(`${h.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("PIX-CUIDADEMIM-DEMO-LINK");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white rounded-[40px] overflow-hidden border ${isRecommended ? 'border-indigo-200 shadow-2xl' : 'border-slate-100'} hover:shadow-xl transition-all duration-500 flex flex-col`}>
      {isRecommended && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest py-2 text-center flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-current" /> Recomendação Especialista
        </div>
      )}
      
      <div className="p-8 flex-1">
        <div className="flex items-start justify-between mb-8">
          <div className="relative">
            <img src={therapist.imageUrl} alt={therapist.name} className="w-24 h-24 rounded-[32px] object-cover shadow-xl border-4 border-white" />
            <div className="absolute -bottom-3 -right-3 bg-white px-2 py-1.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-1 text-xs font-black text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" /> {therapist.rating}
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${mode.color}`}>
            {mode.icon} {mode.label}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{therapist.name}</h3>
          <p className="text-xs text-slate-500 mb-4 font-medium italic">{therapist.specialty.join(', ')}</p>
        </div>

        {activeTab === 'info' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Escolha a Modalidade</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { setSelectedMode('online'); setActiveTab('payment'); }} className="flex flex-col items-center gap-3 p-6 bg-blue-50 border border-blue-100 rounded-3xl hover:bg-blue-100 transition-all">
                <Monitor className="w-8 h-8 text-blue-600" />
                <div className="text-center"><p className="text-[10px] font-black uppercase text-blue-400">Online</p><p className="text-sm font-bold text-blue-900">R$ 100,00</p></div>
              </button>
              <button onClick={() => { setSelectedMode('presencial'); setActiveTab('payment'); }} className="flex flex-col items-center gap-3 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl hover:bg-emerald-100 transition-all">
                <MapPin className="w-8 h-8 text-emerald-600" />
                <div className="text-center"><p className="text-[10px] font-black uppercase text-emerald-400">Presencial</p><p className="text-sm font-bold text-emerald-900">R$ 160,00</p></div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            {selectedMode === 'online' && (
              <div className={`p-5 rounded-3xl border transition-all ${shareJournal ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className={`w-5 h-5 ${shareJournal ? 'text-indigo-200' : 'text-indigo-500'}`} />
                    <span className="text-xs font-bold">Compartilhar Diário IA</span>
                  </div>
                  <button onClick={() => setShareJournal(!shareJournal)}>
                    {shareJournal ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                  </button>
                </div>
                <p className="text-[10px] leading-relaxed opacity-80 font-medium">
                  Autorizo o profissional a ler minhas notas do diário para otimizar a sessão. <strong>Ganhe 15% de desconto imediato.</strong>
                </p>
              </div>
            )}

            <div className="bg-slate-900 p-6 rounded-[32px] text-white">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total a Pagar</p>
                <div className="text-right">
                  {discount > 0 && <p className="text-[10px] text-indigo-400 line-through">R$ {basePrice.toFixed(2)}</p>}
                  <p className="text-xl font-black">R$ {finalPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl mb-4 flex justify-center"><QrCode className="w-32 h-32 text-slate-900" /></div>
              <button onClick={handleCopyPix} className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copiado!' : 'Copiar Chave PIX'}
              </button>
            </div>
            <button onClick={() => setActiveTab('scheduling')} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase hover:bg-indigo-700 shadow-xl">Confirmar Pagamento</button>
          </div>
        )}

        {activeTab === 'scheduling' && (
          <div className="space-y-6 animate-in zoom-in-95">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {getWorkDays().map((date, idx) => {
                const dateStr = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
                return (
                  <button key={idx} onClick={() => setSelectedDate(dateStr)} className={`flex-shrink-0 px-4 py-3 rounded-2xl border text-xs font-bold ${selectedDate === dateStr ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500'}`}>
                    {dateStr}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {getVacantSlots().map((slot, idx) => (
                <button key={idx} onClick={() => setSelectedSlot(slot)} className={`py-3 rounded-xl text-xs font-bold ${selectedSlot === slot ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 border'}`}>
                  {slot}
                </button>
              ))}
            </div>
            <button disabled={!selectedSlot} onClick={() => setActiveTab('confirmed')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase disabled:opacity-50">Finalizar Agendamento</button>
          </div>
        )}

        {activeTab === 'confirmed' && (
          <div className="text-center py-10 space-y-6 animate-in zoom-in-95">
             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><PartyPopper className="w-10 h-10 text-emerald-600" /></div>
             <h3 className="text-2xl font-black text-slate-900">Agendado!</h3>
             <p className="text-slate-500 text-sm leading-relaxed">Sua consulta com <span className="font-bold">{therapist.name}</span> foi confirmada.</p>
             {selectedMode === 'online' && (
               <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 mb-4 tracking-tight">Link da Videochamada:</p>
                  <a href="https://meet.google.com/new" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-white text-blue-600 py-3 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-200 hover:bg-blue-100 transition-all">
                    <Video className="w-4 h-4" /> Entrar no Google Meet
                  </a>
               </div>
             )}
             <button onClick={() => setActiveTab('info')} className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-xs uppercase">Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Therapists: React.FC<TherapistsProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 fade-in pb-20">
      <header className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase mb-8 border border-indigo-500/30">
              <Shield className="w-3.5 h-3.5" /> Profissionais Verificados
            </div>
            <h2 className="text-5xl font-black mb-6 leading-tight tracking-tight">Especialistas à sua disposição.</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Agende sessões online via Google Meet ou presenciais com nossa rede de especialistas credenciados.</p>
        </div>
      </header>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_THERAPISTS.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} isRecommended={therapist.id === '2'} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Therapists;
