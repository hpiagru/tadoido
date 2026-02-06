
import React, { useState } from 'react';
import { 
  Users, Award, ShieldCheck, Search, Filter, CreditCard, TrendingUp, 
  MoreHorizontal, CheckCircle2, XCircle, Clock, Download, Image as ImageIcon, 
  Settings, Link as LinkIcon, QrCode, MessageSquare, UserPlus, FileText, ExternalLink,
  Plus, Save, Trash2, Smartphone, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Banner, PaymentGatewayConfig, Professional, PatientData } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'banners' | 'payments' | 'matching' | 'pros'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data atualizado
  const [banners, setBanners] = useState<Banner[]>([
    { id: '1', title: 'Consultas a partir de R$ 100,00', imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853', link: '/professionals', active: true },
    { id: '2', title: 'Setembro Amarelo', imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7', link: '/campaigns', active: true },
    { id: '3', title: 'Cuida de Mim Neon UX', imageUrl: 'https://images.unsplash.com/photo-1614850523296-e811cfbaf163', link: '/relax', active: false },
  ]);

  const [paymentConfig, setPaymentConfig] = useState<PaymentGatewayConfig>({
    pixKey: '00020126580014BR.GOV.BCB.PIX...',
    pixName: 'Cuida de Mim LTDA',
    active: true
  });

  const professionals: Professional[] = [
    { id: '1', name: 'Dr. Junior Final Feliz', specialty: ['Relacionamentos'], rating: 4.8, plan: 'unlimited', paymentStatus: 'paid', verified: true, crp_crm: '12345', crp: '06/12345-SP', expirationDate: '12/12/2025', imageUrl: '', availability: '', attendanceMode: 'online' },
    { id: '2', name: 'Shirlei Tantam', specialty: ['Psicologia TCC'], rating: 4.9, plan: 'basic', paymentStatus: 'paid', verified: true, crp_crm: '67890', crp: '06/67890-SP', expirationDate: '10/06/2025', imageUrl: '', availability: '', attendanceMode: 'hibrido' },
  ];

  const pendingPatients: PatientData[] = [
    { id: 'p1', name: 'Ricardo Alencar', email: 'ric@email.com', whatsapp: '1199999999', address: 'SP', feels: 'Muita ansiedade noturna', previousTreatment: false, previousReason: '', takesMedication: false, medicationDetails: '' },
  ];

  const renderOverview = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Usuários Totais', val: '2.482', change: '+12%', icon: <Users className="text-indigo-500" />, color: 'bg-indigo-50' },
          { label: 'Especialistas', val: '184', change: '+5%', icon: <Award className="text-emerald-500" />, color: 'bg-emerald-50' },
          { label: 'Receita Mensal', val: 'R$ 12.450', change: '+18%', icon: <CreditCard className="text-rose-500" />, color: 'bg-rose-50' },
          { label: 'Aprovações', val: '12', change: 'Pendentes', icon: <ShieldCheck className="text-amber-500" />, color: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
             <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center`}>{stat.icon}</div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.change.includes('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                   {stat.change}
                </span>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800 tracking-tight">{stat.val}</p>
             </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-500" /> API WhatsApp (Conector)
            </h3>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase">Status do Gateway</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">CONECTADO</span>
               </div>
               <input 
                 className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm mb-4 outline-none focus:ring-2 focus:ring-indigo-500/20" 
                 placeholder="API KEY (Twilio/Evolution/etc)"
                 defaultValue="sk_live_51M..."
                 type="password"
               />
               <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-slate-800">Testar Conexão</button>
            </div>
         </div>
         
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Próximas Expirações</h3>
            <div className="space-y-4">
               {professionals.map(pro => (
                 <div key={pro.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xs">{pro.name[0]}</div>
                       <div>
                          <p className="text-sm font-bold text-slate-800">{pro.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Expira em: {pro.expirationDate}</p>
                       </div>
                    </div>
                    <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline">Renovar</button>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  const renderBanners = () => (
    <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-black text-slate-800">Gestão de Banners</h2>
         <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-200">
            <Plus className="w-4 h-4" /> Novo Banner
         </button>
      </div>

      <div className="bg-slate-950 rounded-[40px] p-10 border border-purple-500/30 shadow-2xl shadow-purple-900/20 relative overflow-hidden group">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
               <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-purple-500/30">
                  <Zap className="w-3 h-3 fill-current" /> Design Neon Ativo
               </div>
               <h3 className="text-4xl font-black text-white mb-4 leading-tight">
                  Campanha <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Cuida de Mim Neon UX</span>
               </h3>
               <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                  Configurado: <span className="text-white">"Consultas a partir de R$ 100,00"</span>.
               </p>
               <div className="flex gap-4">
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30">
                     <Settings className="w-4 h-4" /> Editar Tipografia
                  </button>
                  <button className="bg-white/10 text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10">
                     Visualizar Live
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {banners.map(b => (
           <div key={b.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <img src={b.imageUrl} className="h-40 w-full object-cover" />
              <div className="p-6">
                 <h4 className="font-bold text-slate-800 mb-1">{b.title}</h4>
                 <p className="text-xs text-slate-400 mb-4 truncate">{b.link}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-10 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Administração Central</h1>
          <p className="text-slate-500 font-medium">Controle total da plataforma.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
           {['overview', 'banners', 'payments', 'matching'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                 activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
               }`}
             >
               <span className="capitalize">{tab}</span>
             </button>
           ))}
        </div>
      </header>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'banners' && renderBanners()}
    </div>
  );
};

export default AdminDashboard;
