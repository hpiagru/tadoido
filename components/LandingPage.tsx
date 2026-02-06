
import React from 'react';
import { 
  Heart, Sparkles, ShieldCheck, ArrowRight, CheckCircle, 
  Target, TrendingUp, Brain, Activity, BookOpen, 
  Smile, Baby, Crown, Star, Flame, Stethoscope, Microscope, Zap, Users,
  Briefcase
} from 'lucide-react';
import { AppView, UserRole } from '../types';
import { PLANS } from '../constants';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  onSetRole: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSetRole }) => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
               <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tighter">Cuida de Mim</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('login')} className="hidden md:block text-xs font-black text-slate-500 hover:text-indigo-600 uppercase tracking-widest transition-colors">
              Entrar
            </button>
            <button onClick={() => { onSetRole('patient'); onNavigate('register-patient'); }} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95">
              Começar Agora
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-indigo-100 animate-bounce">
            <Sparkles className="w-4 h-4 fill-current" /> Psicologia Clínica & Neurodiversidade
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Tratando a alma, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 drop-shadow-sm">curando o corpo.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            A primeira plataforma que une <strong>IA Clínica</strong> à expertise de <strong>Psicólogos CRP</strong> para tratar TDAH, Autismo e a Causa Raiz do seu sofrimento.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button onClick={() => { onSetRole('patient'); onNavigate('register-patient'); }} className="w-full md:w-auto bg-indigo-600 text-white px-12 py-6 rounded-[32px] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3">
              Fazer Triagem Gratuita <ArrowRight className="w-6 h-6" />
            </button>
            <button onClick={() => onNavigate('register-pro')} className="w-full md:w-auto bg-white text-slate-900 border-2 border-slate-100 px-10 py-6 rounded-[32px] font-black text-lg hover:border-indigo-600 transition-all flex items-center justify-center gap-3">
              Sou Profissional <Users className="w-6 h-6 text-indigo-500" />
            </button>
          </div>
        </div>
        {/* Background blobs */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      </header>

      {/* Manifesto */}
      <section className="py-32 bg-slate-900 text-white text-center px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
           <Flame className="w-16 h-16 text-amber-400 mx-auto mb-10 animate-pulse" />
           <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-6">Nosso Manifesto</h2>
           <p className="text-3xl md:text-5xl font-light leading-tight italic">
             "Acreditamos que a saúde mental não é um luxo, mas o alicerce de uma vida digna. Não oferecemos apenas 'conselhos', entregamos <span className="text-white font-black underline decoration-indigo-500 underline-offset-8">Psicologia de Evidências</span> para quem cansou de apenas sobreviver."
           </p>
           <div className="mt-16 flex justify-center gap-12 grayscale opacity-50">
              <div className="flex flex-col items-center"><Microscope className="w-8 h-8 mb-2" /><span className="text-[9px] font-black uppercase">Ciência</span></div>
              <div className="flex flex-col items-center"><ShieldCheck className="w-8 h-8 mb-2" /><span className="text-[9px] font-black uppercase">Ética</span></div>
              <div className="flex flex-col items-center"><Activity className="w-8 h-8 mb-2" /><span className="text-[9px] font-black uppercase">Resultado</span></div>
           </div>
        </div>
      </section>

      {/* Seção Estratégica para Psicólogos */}
      <section className="py-32 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Você cuida da clínica. <br /><span className="text-emerald-600">A IA Cuida da Agenda.</span></h2>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 font-medium">
                Psicólogo, pare de perder tempo com triagens manuais e captação incerta. No <strong>Cuida de Mim</strong>, nossa IA faz a triagem clínica pesada e conecta você a pacientes que realmente precisam da sua expertise.
              </p>
              <ul className="space-y-4 mb-10">
                 <li className="flex items-center gap-3 font-bold text-slate-700"><CheckCircle className="text-emerald-500" /> Agenda Cheia com Matchmaking Inteligente</li>
                 <li className="flex items-center gap-3 font-bold text-slate-700"><CheckCircle className="text-emerald-500" /> Relatórios de Pré-Ficha formatados pela IA</li>
                 <li className="flex items-center gap-3 font-bold text-slate-700"><CheckCircle className="text-emerald-500" /> Pagamento Garantido e Fluxo Simplificado</li>
              </ul>
              <button onClick={() => onNavigate('register-pro')} className="bg-emerald-600 text-white px-10 py-5 rounded-3xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-3">
                 Quero ser um Especialista Credenciado <ArrowRight className="w-6 h-6" />
              </button>
           </div>
           <div className="relative">
              <div className="bg-white p-10 rounded-[64px] shadow-2xl border border-emerald-100">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 font-black">CRP</div>
                    <div>
                       <p className="text-sm font-black text-slate-900">Dr. Marcos Neuro</p>
                       <p className="text-xs text-slate-400 font-bold uppercase">Membro desde 2023</p>
                    </div>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-500 text-sm leading-relaxed mb-6">
                    "O Cuida de Mim mudou minha forma de clinicar. Recebo o paciente com um histórico completo gerado pela IA, o que economiza pelo menos 3 sessões de anamnese básica."
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400">
                       <Star className="w-4 h-4 fill-current" />
                       <Star className="w-4 h-4 fill-current" />
                       <Star className="w-4 h-4 fill-current" />
                       <Star className="w-4 h-4 fill-current" />
                       <Star className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Feedback Real</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Como a Psicologia te ajuda? */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Como a Psicologia te ajuda?</h2>
            <p className="text-xl text-slate-500 font-medium">Muito além da conversa: uma reestruturação da sua vida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Regulação Cognitiva", 
                desc: "Aprenda a controlar o fluxo de pensamentos que gera ansiedade e paralisia.",
                icon: <Brain className="w-10 h-10 text-indigo-600" />,
                color: "bg-indigo-50"
              },
              { 
                title: "Saúde Psicossomática", 
                desc: "Identifique como traumas se manifestam em dores físicas, insônia e fadiga crônica.",
                icon: <Stethoscope className="w-10 h-10 text-rose-600" />,
                color: "bg-rose-50"
              },
              { 
                title: "Resiliência Preditiva", 
                desc: "Desenvolva ferramentas para antecipar gatilhos e reagir com clareza emocional.",
                icon: <Zap className="w-10 h-10 text-amber-600" />,
                color: "bg-amber-50"
              },
            ].map((item, i) => (
              <div key={i} className="p-12 rounded-[48px] border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
                <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-8 shadow-sm`}>
                   {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foco na Psicossoma: Tratando a Causa Raiz */}
      <section className="py-32 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
             <div className="bg-white p-12 rounded-[64px] shadow-2xl border border-white relative">
                <div className="absolute -top-6 -right-6 bg-indigo-600 text-white p-6 rounded-full shadow-xl">
                   <Target className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6">Tratando a Causa Raiz</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Nossa IA exclusiva analisa seus logs de humor para detectar padrões de <strong>Psicossomatização</strong>. Muitas vezes, aquela dor nas costas ou dor de cabeça constante é o grito de um trauma não processado.
                </p>
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <CheckCircle className="text-indigo-600 w-6 h-6" />
                      <span className="font-bold text-slate-800">Mapeamento de Gatilhos Físicos</span>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <CheckCircle className="text-indigo-600 w-6 h-6" />
                      <span className="font-bold text-slate-800">Conexão Mente-Corpo baseada em TCC</span>
                   </div>
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
             <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Foco na <br /><span className="text-indigo-600">Psicossoma.</span></h2>
             <p className="text-xl text-slate-500 leading-relaxed mb-10 font-medium">
                Não somos um app de 'calma'. Somos um sistema de investigação clínica. Ajudamos você a entender por que seu corpo reage quando sua mente se cala.
             </p>
             <button onClick={() => { onSetRole('patient'); onNavigate('register-patient'); }} className="text-indigo-600 font-black flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-sm">
                Entenda seu corpo agora <ArrowRight className="w-5 h-5" />
              </button>
          </div>
        </div>
      </section>

      {/* Onde a Psicologia Atua? */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-5xl font-black text-slate-900 mb-6">Onde a Psicologia Atua?</h2>
             <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Conectamos você aos melhores Psicólogos CRP e Médicos especializados em diversas frentes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Neurodiversidade", desc: "TDAH e Autismo (TEA) em adultos e crianças.", icon: <Baby className="w-6 h-6" />, color: "bg-purple-100 text-purple-600" },
              { title: "Psicoterapia Individual", desc: "Tratamento profundo para traumas e fobias.", icon: <Users className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
              { title: "Psicologia do Trabalho", desc: "Burnout, estresse corporativo e liderança.", icon: <Briefcase className="w-6 h-6" />, color: "bg-emerald-100 text-emerald-600" },
              { title: "Emergência Clínica", desc: "Acolhimento em crises de pânico e luto.", icon: <Activity className="w-6 h-6" />, color: "bg-rose-100 text-rose-600" },
            ].map((box, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all">
                <div className={`w-14 h-14 ${box.color} rounded-2xl flex items-center justify-center mb-6`}>
                   {box.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{box.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosso Diferencial */}
      <section className="py-32 bg-slate-900 text-white rounded-[64px] mx-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 relative z-10 flex flex-col lg:flex-row items-center gap-20">
           <div className="flex-1">
              <h2 className="text-5xl font-black mb-8 leading-tight">O Diferencial <br /><span className="text-indigo-400">Cuida de Mim.</span></h2>
              <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30 shrink-0"><CheckCircle className="text-indigo-400" /></div>
                    <div>
                       <h4 className="text-xl font-bold mb-2">Pre-Ficha Clínica IA</h4>
                       <p className="text-slate-400 text-sm">Geramos um relatório técnico baseado no seu diário para o Psicólogo já saber por onde começar.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30 shrink-0"><Microscope className="text-indigo-400" /></div>
                    <div>
                       <h4 className="text-xl font-bold mb-2">Termômetro Clínico</h4>
                       <p className="text-slate-400 text-sm">Monitoramento 24/7 da sua urgência emocional com indicação direta para especialistas.</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="flex-1 bg-white/5 backdrop-blur-3xl p-12 rounded-[56px] border border-white/10 shadow-2xl relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/40 rounded-full blur-[80px]" />
              <div className="flex items-center gap-4 mb-10">
                 <Crown className="w-10 h-10 text-amber-400" />
                 <h3 className="text-2xl font-black">Planos de Cuidado</h3>
              </div>
              <div className="space-y-6">
                 {PLANS.filter(p => p.id !== 'free').map((p, i) => (
                   <div key={i} className={`p-6 rounded-3xl border ${p.popular ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5 border-white/10'}`}>
                      <div className="flex justify-between items-center mb-2">
                         <span className="font-bold">{p.name}</span>
                         <span className="text-xl font-black">R$ {p.price}</span>
                      </div>
                      <p className="text-xs opacity-60 mb-4">Acesso a todos os materiais TEA/TDAH e IA Pro.</p>
                      <button onClick={() => onNavigate('register-patient')} className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest ${p.popular ? 'bg-white text-indigo-900' : 'bg-indigo-500 text-white'}`}>Selecionar</button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Psicoterapia e Abordagem Clínica */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-4xl font-black text-slate-900 mb-8">Psicoterapia vs Abordagem Clínica</h2>
           <p className="text-lg text-slate-500 leading-relaxed mb-12">
             Muitas vezes, a <strong>Psicoterapia</strong> é vista como 'apenas falar'. Nossa <strong>Abordagem Clínica</strong> foca em metas e resultados baseados em evidências científicas. 
             O "Cuida de Mim" é a ponte que garante que o que você vive no dia a dia chegue de forma estruturada ao seu terapeuta, 
             acelerando o tratamento e focando no que realmente importa.
           </p>
           <div className="flex flex-wrap justify-center gap-10">
              <div className="flex items-center gap-3 font-bold text-slate-800"><CheckCircle className="text-indigo-600" /> Escuta Ética</div>
              <div className="flex items-center gap-3 font-bold text-slate-800"><CheckCircle className="text-indigo-600" /> Sigilo CRP</div>
              <div className="flex items-center gap-3 font-bold text-slate-800"><CheckCircle className="text-indigo-600" /> IA Coadjuvante</div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-slate-900 text-white rounded-t-[64px]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"><Heart className="w-7 h-7 text-white fill-current" /></div>
                  <span className="font-black text-3xl tracking-tighter">Cuida de Mim</span>
               </div>
               <p className="text-slate-400 text-lg max-w-sm font-medium leading-relaxed">
                  Tratando a alma, curando o corpo. A evolução do cuidado mental digital.
               </p>
            </div>
            <div>
               <h5 className="font-black uppercase tracking-widest text-xs text-indigo-400 mb-8">Navegação</h5>
               <ul className="space-y-4 text-slate-400 font-bold">
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('register-pro')}>Sou Psicólogo</li>
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('register-patient')}>Sou Paciente</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Nosso Manifesto</li>
               </ul>
            </div>
            <div>
               <h5 className="font-black uppercase tracking-widest text-xs text-indigo-400 mb-8">Suporte</h5>
               <ul className="space-y-4 text-slate-400 font-bold">
                  <li className="hover:text-white cursor-pointer transition-colors">Ajuda 24h</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Privacidade (LGPD)</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Ética Clínica</li>
               </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">© 2024 Cuida de Mim • Clínica IA Registro: 88721</p>
             <div className="flex gap-6">
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <Star className="w-5 h-5 text-amber-400 fill-current" />
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
