
import React from 'react';
import { MENTAL_HEALTH_CAMPAIGNS } from '../constants';
import { Sparkles, Calendar, Info, Heart } from 'lucide-react';

const Campaigns: React.FC = () => {
  return (
    <div className="space-y-10 fade-in pb-20">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Calendário do Bem-Estar</h1>
        <p className="text-slate-500 italic">No Cuida de Mim, todo mês é tempo de acolhimento.</p>
      </header>

      <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-xl mb-12">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4">
              Campanha Ativa
            </div>
            <h2 className="text-4xl font-black mb-4">Estamos no Setembro Amarelo</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              A valorização da vida é o foco deste mês. Nossa IA e especialistas estão prontos para oferecer escuta ativa e acolhimento sem julgamentos. Falar é a melhor solução.
            </p>
            <div className="flex gap-4">
               <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold hover:bg-yellow-400 transition-all">Conteúdo Exclusivo</button>
               <button className="border border-slate-700 px-6 py-3 rounded-2xl font-bold">Ver Estatísticas</button>
            </div>
          </div>
          <div className="w-48 h-48 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
             <Heart className="w-24 h-24 text-slate-900" />
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MENTAL_HEALTH_CAMPAIGNS.map((camp, i) => (
          <div key={i} className={`p-8 rounded-[40px] border border-slate-100 ${camp.color} transition-all hover:scale-[1.02] group`}>
            <div className="flex justify-between items-start mb-6">
              <span className={`text-[10px] font-black uppercase tracking-widest ${camp.text} bg-white/50 px-3 py-1 rounded-full`}>
                {camp.month}
              </span>
              <Calendar className={`w-5 h-5 ${camp.text} opacity-50`} />
            </div>
            <h3 className={`text-2xl font-bold ${camp.text} mb-3`}>{camp.name}</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">{camp.desc}</p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
               <Info className="w-4 h-4" />
               Foco: {camp.theme}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-[40px] p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
         <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center">
            <Sparkles className="text-emerald-500 w-10 h-10" />
         </div>
         <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900">IA e Conscientização</h3>
            <p className="text-slate-500 text-sm">Nossa inteligência artificial é treinada mensalmente para adaptar suas sugestões de acordo com o foco da campanha nacional vigente.</p>
         </div>
         <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold">Quero saber mais</button>
      </div>
    </div>
  );
};

export default Campaigns;
