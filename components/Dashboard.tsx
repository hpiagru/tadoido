
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOOD_CONFIG } from '../constants';
import { Mood, MoodLog, AppView } from '../types';
import { geminiService } from '../services/geminiService';
import { 
  Brain, TrendingUp, ShieldCheck, Anchor, Wind, 
  BookOpen, ArrowRight, Zap, Sparkles, AlertCircle, Thermometer
} from 'lucide-react';

interface DashboardProps {
  logs: MoodLog[];
  onAddMood: (mood: Mood) => void;
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ logs, onAddMood, onNavigate }) => {
  const [urgency, setUrgency] = useState<'Low' | 'Moderate' | 'High' | 'Critical'>('Low');
  const [loadingUrgency, setLoadingUrgency] = useState(false);

  useEffect(() => {
    const checkUrgency = async () => {
      if (logs.length > 0) {
        setLoadingUrgency(true);
        const level = await geminiService.analyzeClinicalUrgency(logs);
        setUrgency(level);
        setLoadingUrgency(false);
      }
    };
    checkUrgency();
  }, [logs]);

  const chartData = logs.slice(-7).map(log => ({
    date: new Date(log.timestamp).toLocaleDateString('pt-BR', { weekday: 'short' }),
    value: MOOD_CONFIG[log.mood].value,
    label: MOOD_CONFIG[log.mood].label
  }));

  const getUrgencyConfig = () => {
    switch(urgency) {
      case 'Critical': return { color: 'text-red-600 bg-red-100', label: 'Urgência Crítica', desc: 'Busque ajuda imediata ou agende um psicólogo agora.', width: 'w-full' };
      case 'High': return { color: 'text-orange-600 bg-orange-100', label: 'Urgência Alta', desc: 'Sua saúde mental precisa de atenção profissional.', width: 'w-3/4' };
      case 'Moderate': return { color: 'text-amber-600 bg-amber-100', label: 'Atenção Moderada', desc: 'Considere conversar com um especialista em breve.', width: 'w-1/2' };
      default: return { color: 'text-emerald-600 bg-emerald-100', label: 'Estabilidade', desc: 'Mantenha seus hábitos de autocuidado.', width: 'w-1/4' };
    }
  };

  const urgencyConfig = getUrgencyConfig();

  return (
    <div className="space-y-10 fade-in pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Painel de Saúde Mental</h1>
          <p className="text-slate-500 font-medium italic">Monitoramento clínico assistido por IA.</p>
        </div>
        <div className="flex gap-2 p-1.5 bg-white rounded-[24px] border border-slate-100 shadow-sm">
          {(Object.keys(MOOD_CONFIG) as Mood[]).map((m) => (
            <button
              key={m}
              onClick={() => onAddMood(m)}
              className="p-3 rounded-2xl hover:bg-slate-50 transition-all flex flex-col items-center gap-1 group"
            >
              <span className="text-2xl">{MOOD_CONFIG[m].icon}</span>
              <span className="text-[9px] text-slate-400 font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">{MOOD_CONFIG[m].label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Termômetro Clínico */}
      <section className={`p-8 rounded-[40px] border transition-all ${urgencyConfig.color} border-current/10 flex flex-col md:flex-row items-center justify-between gap-8`}>
        <div className="flex items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg">
             <Thermometer className={`w-8 h-8 ${urgencyConfig.color.split(' ')[0]}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status Clínico</span>
              {loadingUrgency && <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />}
            </div>
            <h3 className="text-2xl font-black">{urgencyConfig.label}</h3>
            <p className="text-sm font-medium opacity-80">{urgencyConfig.desc}</p>
          </div>
        </div>
        <div className="w-full md:w-64 space-y-3">
           <div className="h-4 w-full bg-white/50 rounded-full overflow-hidden">
              <div className={`h-full bg-current transition-all duration-1000 ${urgencyConfig.width}`} />
           </div>
           <button 
            onClick={() => onNavigate('psychologists')}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all"
           >
             Agendar com Psicólogo
           </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 'coach', title: 'Grounding IA', icon: <Anchor />, color: 'bg-indigo-50 text-indigo-600', desc: 'Triagem cognitiva rápida.' },
          { id: 'relax', title: 'Sons Reais', icon: <Wind />, color: 'bg-purple-50 text-purple-600', desc: 'Relaxamento imersivo.' },
          { id: 'journal', title: 'Diário Clínico', icon: <BookOpen />, color: 'bg-emerald-50 text-emerald-600', desc: 'Sua pre-ficha começa aqui.' },
        ].map((item, i) => (
          <button 
            key={i}
            onClick={() => onNavigate(item.id as AppView)}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-left flex items-start gap-4 group"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 h-80">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-8">
          <TrendingUp className="w-5 h-5 text-indigo-500" /> Histórico de Bem-estar
        </h2>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
            <YAxis hide domain={[0, 6]} />
            <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} />
            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fill="url(#colorMood)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
