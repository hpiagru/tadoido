
import React, { useState } from 'react';
// Added Sparkles to the lucide-react imports
import { ShieldCheck, Award, FileText, Clock, ChevronLeft, Upload, CheckCircle2, Monitor, MapPin, Layers, CreditCard, QrCode, Copy, Check, Sparkles } from 'lucide-react';
import { AppView, AttendanceMode, ProPlan } from '../types';

interface ProRegistrationProps {
  onNavigate: (view: AppView) => void;
}

const ProRegistration: React.FC<ProRegistrationProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<AttendanceMode>('online');
  const [selectedPlan, setSelectedPlan] = useState<ProPlan>('basic');
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136cuidademim-pix-recebimento-site-oficial5204000053039865405199.005802BR5925CUIDA DE MIM SAUDE MENTAL6009SAO PAULO62070503***6304E2B1");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center fade-in py-20">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <Clock className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Credenciamento em Análise</h1>
        <p className="text-slate-600 mb-10 leading-relaxed">
          Recebemos seus dados, documentos e a confirmação do plano escolhido. 
          Nossa equipe validará seu registro e o pagamento em até <strong>72 horas úteis</strong>. 
          Fique atento ao seu e-mail!
        </p>
        <button 
          onClick={() => onNavigate('dashboard')}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all"
        >
          Voltar para o Início
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto fade-in pb-10">
      <button 
        // Fixed navigation: changed 'professionals' to 'psychologists'
        onClick={() => onNavigate('psychologists')}
        className="flex items-center gap-2 text-slate-500 mb-6 hover:text-slate-800 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Voltar
      </button>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-emerald-600 p-10 text-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Credenciamento Profissional</h1>
            </div>
            <div className="text-xs font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
              Passo {step} de 3
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-white' : 'bg-white/30'}`} />
          </div>
        </div>

        <div className="p-10">
          {step === 1 ? (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registro (CRP/CRM)</label>
                  <input className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="Ex: 06/12345" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Especialidade</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 outline-none">
                    <option>Psicologia TCC</option>
                    <option>Psicanálise</option>
                    <option>Psiquiatria</option>
                    <option>Terapia de Casal</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2 tracking-widest">Modalidade</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button type="button" onClick={() => setMode('online')} className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${mode === 'online' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-slate-100 text-slate-500'}`}><Monitor className="w-6 h-6" /><span className="text-xs font-bold">Online</span></button>
                  <button type="button" onClick={() => setMode('presencial')} className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${mode === 'presencial' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-slate-100 text-slate-500'}`}><MapPin className="w-6 h-6" /><span className="text-xs font-bold">Presencial</span></button>
                  <button type="button" onClick={() => setMode('hibrido')} className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${mode === 'hibrido' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-slate-100 text-slate-500'}`}><Layers className="w-6 h-6" /><span className="text-xs font-bold">Híbrido</span></button>
                </div>
              </div>

              <button onClick={() => setStep(2)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg">Continuar</button>
            </div>
          ) : step === 2 ? (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Escolha seu Plano Anual</h2>
                  <p className="text-slate-500 text-sm">O credenciamento garante visibilidade na rede e agendamento automático.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    onClick={() => setSelectedPlan('basic')}
                    className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all ${selectedPlan === 'basic' ? 'border-emerald-500 bg-emerald-50 shadow-xl scale-105' : 'border-slate-100 hover:border-emerald-200'}`}
                  >
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                           <Award className="text-emerald-500 w-6 h-6" />
                        </div>
                        {selectedPlan === 'basic' && <CheckCircle2 className="text-emerald-500 w-6 h-6" />}
                     </div>
                     <h3 className="text-lg font-bold text-slate-800 mb-1">Plano Essencial</h3>
                     <p className="text-xs text-slate-500 mb-6">Até 20 indicações da IA/ano</p>
                     <p className="text-3xl font-black text-slate-900 mb-4">R$ 199,00<span className="text-sm font-normal text-slate-400">/ano</span></p>
                  </div>

                  <div 
                    onClick={() => setSelectedPlan('unlimited')}
                    className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all ${selectedPlan === 'unlimited' ? 'border-emerald-500 bg-emerald-50 shadow-xl scale-105' : 'border-slate-100 hover:border-emerald-200'}`}
                  >
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                           <Sparkles className="text-emerald-500 w-6 h-6" />
                        </div>
                        {selectedPlan === 'unlimited' && <CheckCircle2 className="text-emerald-500 w-6 h-6" />}
                     </div>
                     <h3 className="text-lg font-bold text-slate-800 mb-1">Plano Ilimitado</h3>
                     <p className="text-xs text-slate-500 mb-6">Indicações e agenda ilimitadas</p>
                     <p className="text-3xl font-black text-slate-900 mb-4">R$ 399,00<span className="text-sm font-normal text-slate-400">/ano</span></p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold">Voltar</button>
                  <button onClick={() => setStep(3)} className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg">Confirmar e Pagar</button>
               </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <div className="bg-slate-900 p-8 rounded-[40px] text-white">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <CreditCard className="text-emerald-400" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pagamento PIX</p>
                        <p className="text-lg font-bold">Total: {selectedPlan === 'basic' ? 'R$ 199,00' : 'R$ 399,00'}</p>
                     </div>
                  </div>

                  <div className="flex flex-col items-center bg-white p-6 rounded-[32px] mb-8">
                     <div className="w-48 h-48 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
                        <QrCode className="w-40 h-40 text-slate-900" />
                        <div className="absolute inset-0 bg-emerald-500/10" />
                     </div>
                     <p className="text-slate-400 text-[10px] font-bold uppercase mb-4">Escaneie o QR Code acima</p>
                     
                     <div className="w-full space-y-2">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-center">Ou copie o código abaixo</p>
                        <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 w-full overflow-hidden">
                           <input 
                              readOnly 
                              value="00020126580014BR.GOV.BCB.PIX0136cuidademim..." 
                              className="bg-transparent text-[10px] text-slate-400 flex-1 outline-none" 
                           />
                           <button onClick={handleCopyPix} className="p-2 hover:bg-white rounded-lg transition-colors text-emerald-600">
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <button 
                     onClick={() => setSubmitted(true)}
                     className="w-full bg-emerald-500 text-slate-900 py-4 rounded-2xl font-black hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                  >
                     Já realizei o pagamento
                  </button>
               </div>
               
               <p className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  Seu acesso será liberado após a compensação do PIX e validação documental.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProRegistration;
