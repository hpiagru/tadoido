
import React, { useState } from 'react';
import { 
  Star, Video, Calendar, Shield, MapPin, Monitor, Layers, 
  Sparkles, CheckCircle, QrCode, Copy, Check, Clock, X,
  ExternalLink, BookOpen, ToggleLeft, ToggleRight, FileText, Loader2,
  // Added missing icon import
  ShieldCheck
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
  const [copied, setCopied] = useState(false);
  const [shareJournal, setShareJournal] = useState(false);
  const [isGeneratingFicha, setIsGeneratingFicha] = useState(false);
  const [clinicalFicha, setClinicalFicha] = useState<string | null>(null);

  const basePrice = selectedMode === 'online' ? 100 : 160;
  const discount = (shareJournal && selectedMode === 'online') ? basePrice * 0.15 : 0;
  const finalPrice = basePrice - discount;

  const handleGenerateFicha = async () => {
    setIsGeneratingFicha(true);
    // Simulação de dados do paciente para a ficha
    const patientDataMock: any = { feels: "Relato do diário", previousTreatment: false, takesMedication: false };
    const ficha = await geminiService.generateClinicalPreFicha(patientDataMock, logs);
    setClinicalFicha(ficha);
    setIsGeneratingFicha(false);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("PIX-CRP-VALIDO-CUIDADEMIM");
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
             <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{psychologist.crp}</p>
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
              <button onClick={() => { setSelectedMode('presencial'); setActiveTab('payment'); }} className="flex flex-col items-center gap-3 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl hover:bg-emerald-100 transition-all">
                <MapPin className="w-8 h-8 text-emerald-600" />
                <div className="text-center"><p className="text-[10px] font-black uppercase text-emerald-400">Presencial</p><p className="text-sm font-bold text-emerald-900">R$ 160</p></div>
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
                    <span className="text-xs font-bold">Enviar Pre-Ficha Clínica</span>
                  </div>
                  <button onClick={() => { setShareJournal(!shareJournal); if(!shareJournal) handleGenerateFicha(); }}>
                    {shareJournal ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                  </button>
                </div>
                <p className="text-[10px] leading-relaxed opacity-80 font-medium italic">
                  Gere um resumo técnico do seu diário para o psicólogo ler antes da sessão. <strong>Ganhe 15% de desconto.</strong>
                </p>
                {isGeneratingFicha && <div className="mt-3 flex items-center gap-2 text-[9px] font-black uppercase"><Loader2 className="w-3 h-3 animate-spin" /> Gerando ficha técnica...</div>}
              </div>
            )}

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
            <button onClick={() => setActiveTab('scheduling')} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase hover:bg-indigo-700 shadow-xl transition-all">Paguei e Quero Agendar</button>
          </div>
        )}

        {activeTab === 'scheduling' && (
          <div className="space-y-6 animate-in zoom-in-95">
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Selecione o Horário</p>
               <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:30', '14:00', '16:00'].map(h => (
                    <button key={h} className="py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:border-indigo-500 transition-all">{h}</button>
                  ))}
               </div>
             </div>
             <button onClick={() => setActiveTab('confirmed')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase shadow-xl transition-all">Confirmar Consulta</button>
          </div>
        )}

        {activeTab === 'confirmed' && (
          <div className="text-center py-10 space-y-6 animate-in zoom-in-95">
             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><CheckCircle className="w-10 h-10 text-emerald-600" /></div>
             <h3 className="text-2xl font-black text-slate-900">Consulta Confirmada!</h3>
             {shareJournal && clinicalFicha && (
               <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <p className="text-[10px] font-black text-indigo-700 uppercase">Ficha Clínica Enviada</p>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-3">{clinicalFicha}</p>
               </div>
             )}
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
              <ShieldCheck className="w-3.5 h-3.5" /> Rede de Psicólogos CRP
            </div>
            <h2 className="text-5xl font-black mb-6 leading-tight tracking-tight">Atendimento Ético e Profissional.</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Todos os nossos profissionais possuem registro ativo no Conselho de Psicologia.</p>
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
