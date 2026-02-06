
import React, { useState } from 'react';
import { 
  Target, TrendingUp, Users, ShieldCheck, Award, Heart, Briefcase, Globe, 
  ArrowRight, CheckCircle, ChevronLeft, ChevronRight, AlertCircle, Smartphone, 
  Zap, Lock, Users2, DollarSign
} from 'lucide-react';

const InvestorPitch: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Slide 1 — Capa",
      content: (
        <div className="text-center py-20 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-200">
            <Heart className="w-12 h-12 text-white fill-current" />
          </div>
          <h1 className="text-7xl font-black text-slate-900 mb-4 tracking-tighter">Cuida de Mim</h1>
          <p className="text-3xl font-bold text-indigo-500 mb-8">Tratando a alma, curando o corpo</p>
          <div className="inline-block px-6 py-2 bg-slate-100 rounded-full text-sm font-black uppercase tracking-widest text-slate-500">
            Plataforma Clínica de Saúde Mental & IA
          </div>
        </div>
      )
    },
    {
      title: "Slide 2 — O Problema",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10">
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-slate-900 leading-tight">A saúde mental vive uma crise global crescente</h2>
            <p className="text-xl text-slate-600">A maioria sofre em silêncio diante de barreiras intransponíveis.</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              "Milhões convivem com TDAH e Autismo sem suporte adequado",
              "Dificuldade em encontrar profissionais CRP especializados",
              "Traumas psicológicos manifestados em dores físicas",
              "Falta de ferramentas para monitoramento entre sessões"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-rose-50 p-6 rounded-3xl border border-rose-100">
                <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
                <span className="font-bold text-rose-900">{text}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Slide 3 — A Solução",
      content: (
        <div className="bg-slate-900 rounded-[60px] p-16 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-8">Cuida de Mim: IA Clínica</h2>
            <p className="text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
              Unimos IA de triagem com psicoterapia baseada em evidências para tratar a causa raiz.
            </p>
            <div className="flex flex-wrap gap-4">
              {["IA Clínica", "Apoio TDAH/TEA", "Foco Psicossoma", "Psicólogos CRP"].map((tag, i) => (
                <span key={i} className="px-6 py-3 bg-white/10 rounded-2xl font-bold text-indigo-400 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Slide 10 — Visão",
      content: (
        <div className="text-center py-10 max-w-2xl mx-auto">
          <h2 className="text-6xl font-black text-slate-900 mb-8">Nossa Visão</h2>
          <p className="text-2xl font-bold text-slate-600 mb-12">
            Democratizar a psicologia clínica ética e de alta performance.
          </p>
          <p className="text-3xl font-black text-indigo-500 italic">
            "Cuidar da mente é a base de toda cura física."
          </p>
        </div>
      )
    }
  ];

  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1); };
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };

  return (
    <div className="min-h-[80vh] flex flex-col fade-in">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          {slides[currentSlide].content}
        </div>
      </div>

      <div className="mt-auto py-10 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pitch Cuida de Mim</span>
          </div>
          
          <div className="flex gap-4">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 disabled:opacity-30"><ChevronLeft /></button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="px-10 h-14 bg-slate-900 text-white rounded-full font-black flex items-center gap-2">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorPitch;
