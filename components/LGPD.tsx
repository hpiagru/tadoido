
import React from 'react';
import { ShieldCheck, Lock, Eye, Trash2, FileText, ChevronLeft } from 'lucide-react';
import { AppView } from '../types';

const LGPD: React.FC<{ onNavigate: (view: AppView) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto fade-in py-10 px-6">
      <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 text-slate-500 mb-8 hover:text-slate-900 transition-colors">
        <ChevronLeft className="w-5 h-5" /> Voltar
      </button>

      <div className="bg-white rounded-[48px] p-12 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Privacidade & LGPD</h1>
            <p className="text-slate-500 font-medium italic">Seus dados são sagrados.</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-10">
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3"><Lock className="w-5 h-5 text-indigo-500" /> Criptografia Ponta-a-Ponta</h3>
            <p className="text-slate-600 leading-relaxed">
              No <strong>Cuida de Mim</strong>, suas conversas com a IA Serene e seus diários são criptografados. Nem mesmo nossa equipe técnica possui acesso ao conteúdo de suas sessões ou notas pessoais sem sua autorização explícita para triagem clínica.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3"><Eye className="w-5 h-5 text-emerald-500" /> Transparência Total</h3>
            <p className="text-slate-600 leading-relaxed">
              Coletamos apenas os dados necessários para seu atendimento: Nome, CPF (para emissão de nota fiscal clínica), e logs de humor para análise de urgência. Você tem o direito de solicitar um relatório de todos os dados que possuímos a qualquer momento.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3"><Trash2 className="w-5 h-5 text-rose-500" /> Direito ao Esquecimento</h3>
            <p className="text-slate-600 leading-relaxed">
              Caso decida encerrar sua jornada conosco, você pode solicitar a exclusão permanente de todos os seus logs de diário e histórico de IA. De acordo com a regulamentação clínica, mantemos apenas registros fiscais e de agendamento obrigatórios por lei.
            </p>
          </section>

          <section className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
            <FileText className="w-6 h-6 text-slate-400 mt-1" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Encarregado de Dados (DPO)</p>
              <p className="text-sm font-medium text-slate-700">dpo@cuidademim.app</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LGPD;
