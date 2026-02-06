
import React, { useState, useRef } from 'react';
import { 
  User, Mail, Smartphone, MapPin, Calendar, Clock, ChevronRight, Edit3, 
  ShieldCheck, CheckCircle2, AlertCircle, Camera, Share2, Copy, Check, 
  Instagram, Twitter, Facebook, MessageCircle, Video, ExternalLink 
} from 'lucide-react';
import { Appointment, PatientData } from '../types';

const PatientProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<PatientData>({
    id: 'p123',
    name: 'Ricardo Alencar',
    email: 'ricardo@email.com',
    whatsapp: '11 98877-6655',
    address: 'São Paulo, SP',
    feels: 'Ansiedade moderada',
    previousTreatment: true,
    previousReason: 'Estresse no trabalho',
    takesMedication: false,
    medicationDetails: '',
    favoriteSocial: 'Instagram',
    profilePhoto: ''
  });

  const mockAppointments: Appointment[] = [
    { id: 'a1', doctorId: '2', doctorName: 'Jr Final Feliz', date: '2024-06-25', time: '14:30', mode: 'online', status: 'confirmed', meetingLink: 'https://meet.google.com/abc-defg-hij' },
    { id: 'a2', doctorId: '1', doctorName: 'Shirlei Tantam', date: '2024-06-20', time: '10:00', mode: 'presencial', status: 'completed' },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyInvite = () => {
    const link = "https://cuidademim.app/register?ref=ricardo123";
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialOptions = [
    { id: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
    { id: 'Twitter/X', icon: <Twitter className="w-4 h-4" /> },
    { id: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
    { id: 'WhatsApp', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const handleStartSession = (appt: Appointment) => {
    if (appt.mode === 'online') {
      window.open(appt.meetingLink || 'https://meet.google.com/new', '_blank');
    } else {
      alert(`Consulte o endereço da clínica para sua consulta presencial com ${appt.doctorName}.`);
    }
  };

  return (
    <div className="space-y-10 fade-in pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Minha Conta</h1>
          <p className="text-slate-500 font-medium italic">Gerencie seus dados e convide amigos.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-500 shadow-lg transition-all"
        >
          {isEditing ? 'Salvar Alterações' : <><Edit3 className="w-4 h-4" /> Editar Perfil</>}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex justify-center mb-8 relative">
                <div className="w-32 h-32 bg-indigo-50 rounded-[40px] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                  {profile.profilePhoto ? (
                    <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-indigo-400" />
                  )}
                </div>
                {isEditing && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-1/2 translate-x-16 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 text-indigo-600 hover:scale-110 transition-transform"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                  {isEditing ? (
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                  ) : (
                    <p className="text-lg font-bold text-slate-800">{profile.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</label>
                  <p className="text-sm font-medium text-slate-600">{profile.email}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp</label>
                  <p className="text-sm font-medium text-slate-600">{profile.whatsapp}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl w-fit">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Conta Verificada</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl">
             <div className="flex items-center gap-3 mb-4">
                <Share2 className="w-6 h-6 text-indigo-200" />
                <h3 className="text-xl font-bold">Espalhe o Cuidado</h3>
             </div>
             <p className="text-indigo-100 text-sm mb-6 leading-relaxed font-medium">Convide um amigo e ajude a democratizar a saúde mental.</p>
             <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between gap-3 border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest truncate opacity-60">cuidademim.app/ref=...</p>
                <button onClick={handleCopyInvite} className="bg-white text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 transition-colors">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Minha Agenda
            </h2>
            
            <div className="space-y-4">
              {mockAppointments.map(appt => (
                <div key={appt.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-indigo-200 transition-all group gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Clock className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{appt.doctorName}</p>
                      <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        <span>{new Date(appt.date).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <span>{appt.time}</span>
                        <span>•</span>
                        <span className={appt.mode === 'online' ? 'text-blue-500' : 'text-emerald-500'}>{appt.mode}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {appt.status === 'confirmed' && (
                      <button 
                        onClick={() => handleStartSession(appt)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg"
                      >
                        {appt.mode === 'online' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {appt.mode === 'online' ? 'Google Meet' : 'Ver Local'}
                      </button>
                    )}
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                      appt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {appt.status === 'confirmed' ? 'Confirmado' : 'Concluído'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
