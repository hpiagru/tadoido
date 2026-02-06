
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { MoodLog } from '../types';
import { MOOD_CONFIG } from '../constants';
import { geminiService } from '../services/geminiService';
import { Sparkles, Loader2, Calendar, TrendingUp, Info } from 'lucide-react';

interface MoodReportsProps {
  logs: MoodLog[];
}

const MoodReports: React.FC<MoodReportsProps> = ({ logs }) => {
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Calcular distribuição de humor
  const moodCounts = logs.reduce((acc, log) => {
    acc[log.mood] = (acc[log.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(moodCounts).map(([key, val]) => ({
    name: MOOD_CONFIG[key as any].label,
    value: val,
    color: MOOD_CONFIG[key as any].color.split(' ')[1].replace('text-', '') // Hack para pegar a cor base
  }));

  // Corrigir cores para o gráfico
  const COLORS: Record<string, string> = {
    'Excelente': '#10b981',
    'Bem': '#10b981',
    'Neutro': '#3b82f6',
    'Mal': '#f97316',
    'Péssimo': '#ef4444'
  };

  const barData = logs.slice(-15).map(log => ({
    date: new Date(log.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    value: MOOD_CONFIG[log.mood].value,
    mood: MOOD_CONFIG[log.mood].label
  }));

  const fetchInsight = async () => {
    if (logs.length < 3) return;
    setLoadingInsight(true);
    const text = await geminiService.generateMoodInsights(logs);
    setInsight(text);
    setLoadingInsight(false);
  };

  useEffect(() => {
    fetchInsight();
  }, []);

  return (
    <div className="space-y-10 fade-in pb-20">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Relatório Emocional</h1>
        <p className="text-slate-500 font-medium italic">Visão profunda sobre seus padrões e bem-estar.</p>
      </header>

      {/* Insight Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
               <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold">Insight do Mentor Serene</h2>
          </div>
          
          <div className="min-h-[100px] flex items-center">
            {loadingInsight ? (
              <div className="flex items-center gap-3 text-indigo-200">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="font-bold uppercase tracking-widest text-[10px]">Analisando seus registros...</span>
              </div>
            ) : (
              <p className="text-indigo-50 leading-relaxed font-medium">
                {insight || (logs.length < 3 ? "Registre pelo menos 3 humores para gerar insights automáticos." : "Clique para gerar novos insights.")}
              </p>
            )}
          </div>

          <button 
            onClick={fetchInsight}
            disabled={loadingInsight || logs.length < 3}
            className="mt-8 px-6 py-3 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all disabled:opacity-50"
          >
            Atualizar Insights
          </button>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Distribuição de Humor */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Distribuição de Humor
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#6366f1'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
             {pieData.map(d => (
               <div key={d.name} className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[d.name] }} />
                 <span className="text-[10px] font-black uppercase text-slate-400">{d.name}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Histórico de Intensidade */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
           <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-emerald-500" />
             Intensidade Diária
           </h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                 <YAxis hide domain={[0, 6]} />
                 <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                 />
                 <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-8 flex items-start gap-6">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <Info className="text-slate-400" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-1">Como usar estes dados?</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Seus relatórios podem ser mostrados ao seu terapeuta credenciado na rede Cuida de Mim. 
            Eles ajudam o profissional a entender seu histórico entre as sessões e focar nos momentos de maior instabilidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodReports;
