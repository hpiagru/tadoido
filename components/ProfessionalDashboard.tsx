
import React, { useState } from 'react';
import { 
  Calendar, Users, MessageSquare, Clock, Award, Star, Settings, ChevronRight, 
  Check, X, FileText, Smartphone, Link as LinkIcon, AlertCircle, Save, TrendingUp, Sparkles, UserPlus
} from 'lucide-react';

const ProfessionalDashboard: React.FC = () => {
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveDocs = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 fade-in pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Portal do Especialista</h1>
          <p className="text-slate-500 italic">Olá, Jr. Final Feliz. Sua visibilidade está em alta!</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm">
             <div className="text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Selo de Verificação</p>
                <p className="text-lg font-bold text-emerald-600 flex items-center gap-2">PLATINA <Award className="w-5 h-5 text-amber-500" /></p>
             </div>
          </div>
        </div>
      </header>

      {/* NOVO: IA Market Insights - Notificação de demanda */}
      <section className="bg-slate-950 rounded-[40px] p-10 text-white border border-purple-500/30 shadow-2xl relative overflow-hidden group">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
               <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-purple-500/30">
                  <Sparkles className="w-3 h-3 fill-current" /> Insights de Demanda por IA
               </div>
               <h3 className="text-3xl font-black mb-4 leading-tight">
                  Sua área está com <br />
                  <span className="text-purple-400 drop-shadow-[0_0_10px_#a855f7]">Alta Procura Hoje</span>
               </h3>
               <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                     <TrendingUp className="w-5 h-5 text-emerald-400" />
                     <p className="text-sm font-medium">Existem <span className="text-white font-black text-lg">12</span> novos pacientes buscando apoio em <span className="text-purple-300">Ansiedade</span> na sua região.</p>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                     <UserPlus className="w-5 h-5 text-blue-400" />
                     <p className="text-sm font-medium">Outros <span className="text-white font-black text-lg">5</span> pacientes pediram indicação de <span className="text-purple-300">Coaching de Carreira</span>.</p>
                  </div>
               </div>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Fique atento aos matches automáticos via WhatsApp.</p>
            </div>
            <div className="hidden lg:flex justify-end">
               <div className="w-48 h-48 bg-purple-600/10 rounded-full flex items-center justify-center border border-purple-500/20 animate-pulse">
                  <TrendingUp className="w-20 h-20 text-purple-400" />
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Docs & Config Card */}
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8 md:col-span-1">
            <div>
               <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <FileText className="w-5 h-5 text-indigo-500" /> Documentação
               </h3>
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl mb-4">
                  <p className="text-[10px] text-blue-700 font-bold leading-tight">
                    Hospede seus documentos em um Google Drive e cole o link abaixo para nossa auditoria.
                  </p>
               </div>
               <div className="relative mb-3">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20" 
                    placeholder="Link do Google Drive..."
                    value={googleDriveLink}
                    onChange={(e) => setGoogleDriveLink(e.target.value)}
                  />
               </div>
               <button 
                 onClick={handleSaveDocs}
                 className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
               >
                 {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                 {isSaved ? 'Salvo!' : 'Atualizar Link'}
               </button>
            </div>

            <div className="pt-8 border-t border-slate-50">
               <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Smartphone className="w-5 h-5 text-emerald-500" /> Canal WhatsApp
               </h3>
               <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div>
                     <p className="text-[10px] font-black text-emerald-600 uppercase">Status</p>
                     <p className="text-xs font-bold text-slate-800">API Conectada</p>
                  </div>
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
               </div>
            </div>
         </div>

         {/* Patients & Schedule */}
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800">Próximos Agendamentos</h3>
               <Calendar className="w-5 h-5 text-slate-500" />
            </div>
            
            <div className="space-y-4">
               {[
                 { name: 'Ana Souza', time: '14:30', date: 'Hoje', status: 'Confirmada', type: 'Match IA' },
                 { name: 'Ricardo Alencar', time: '10:00', date: 'Amanhã', status: 'Confirmada', type: 'Match IA' }
               ].map((appt, i) => (
                 <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-bold text-slate-300 shadow-sm">{appt.name[0]}</div>
                       <div>
                          <p className="font-bold text-slate-800">{appt.name}</p>
                          <span className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">{appt.type}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                          <p className="text-xs font-bold text-slate-700">{appt.date} às {appt.time}</p>
                          <p className="text-[10px] font-black uppercase text-emerald-500">Confirmada</p>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
