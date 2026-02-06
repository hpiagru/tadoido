
import React from 'react';
import { Sparkles, ClipboardCheck, ArrowRight, UserCheck, MessageCircle } from 'lucide-react';
import { AppView } from '../types';

interface TreatmentPlanProps {
  plan: string;
  onNavigate: (view: AppView) => void;
}

const TreatmentPlan: React.FC<TreatmentPlanProps> = ({ plan, onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden mb-10">
        <div className="bg-indigo-600 p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Direcionamento IA</h1>
              <p className="text-indigo-100 text-sm">Baseado no seu pré-diagnóstico</p>
            </div>
          </div>
          <ClipboardCheck className="w-10 h-10 opacity-20" />
        </div>

        <div className="p-10">
          <div className="prose prose-indigo max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
            {plan}
          </div>

          <div className="mt-12 p-8 bg-indigo-50 rounded-[32px] border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Próximo Passo Recomendado</h3>
              <p className="text-slate-600 text-sm mb-4">
                Agora que temos um direcionamento inicial, recomendamos agendar uma conversa com um de nossos especialistas credenciados.
              </p>
              <button 
                // Fixed navigation: changed 'professionals' to 'psychologists'
                onClick={() => onNavigate('psychologists')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                Ver Profissionais Indicados
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="w-40 h-40 bg-white rounded-3xl p-4 flex flex-col items-center justify-center shadow-sm">
               <UserCheck className="w-12 h-12 text-indigo-500 mb-2" />
               <span className="text-[10px] font-black text-slate-400 uppercase text-center leading-tight">Credenciados Serene</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mb-20">
        <button 
          onClick={() => onNavigate('coach')}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          <MessageCircle className="w-5 h-5 text-indigo-400" />
          Conversar com Mentora Serene
        </button>
      </div>
    </div>
  );
};

export default TreatmentPlan;
