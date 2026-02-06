
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Activity, Pill, History, Send, Loader2, Sparkles, ChevronLeft } from 'lucide-react';
import { PatientData, AppView } from '../types';
import { geminiService } from '../services/geminiService';

interface PatientRegistrationProps {
  onNavigate: (view: AppView) => void;
  onSetTreatmentPlan: (plan: string) => void;
}

const PatientRegistration: React.FC<PatientRegistrationProps> = ({ onNavigate, onSetTreatmentPlan }) => {
  const [loading, setLoading] = useState(false);
  // Fixed: Added 'id' property to satisfy the requirements of the PatientData interface
  const [formData, setFormData] = useState<PatientData>({
    id: '',
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    feels: '',
    previousTreatment: false,
    previousReason: '',
    takesMedication: false,
    medicationDetails: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular salvamento e gerar plano com IA
    const plan = await geminiService.generateTreatmentPlan(formData);
    onSetTreatmentPlan(plan);
    setLoading(false);
    onNavigate('treatment-plan');
  };

  return (
    <div className="max-w-2xl mx-auto fade-in pb-10">
      <button 
        // Fixed navigation: changed 'professionals' to 'psychologists'
        onClick={() => onNavigate('psychologists')}
        className="flex items-center gap-2 text-slate-500 mb-6 hover:text-slate-800 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Voltar para especialistas
      </button>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 opacity-80" />
            <h1 className="text-2xl font-bold">Pré-Diagnóstico Serene</h1>
          </div>
          <p className="text-indigo-100 text-sm italic">
            Suas respostas ajudam nossa IA e profissionais a entenderem como melhor apoiar você.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User className="w-3 h-3" /> Nome Completo
              </label>
              <input
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-3 h-3" /> E-mail
              </label>
              <input
                required
                type="email"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Phone className="w-3 h-3" /> WhatsApp
              </label>
              <input
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Endereço/CEP
              </label>
              <input
                required
                placeholder="Para indicar profissionais próximos"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3" /> Como você se sente hoje?
            </label>
            <textarea
              required
              placeholder="Descreva brevemente seus sintomas ou o que motivou a busca por ajuda..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 h-32 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
              value={formData.feels}
              onChange={e => setFormData({...formData, feels: e.target.value})}
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-500" /> Já fez tratamento antes?
              </label>
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-indigo-600"
                checked={formData.previousTreatment}
                onChange={e => setFormData({...formData, previousTreatment: e.target.checked})}
              />
            </div>
            {formData.previousTreatment && (
              <input
                placeholder="Quando e por que buscou ajuda anteriormente?"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={formData.previousReason}
                onChange={e => setFormData({...formData, previousReason: e.target.value})}
              />
            )}

            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Pill className="w-4 h-4 text-indigo-500" /> Toma remédios regularmente?
              </label>
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-indigo-600"
                checked={formData.takesMedication}
                onChange={e => setFormData({...formData, takesMedication: e.target.checked})}
              />
            </div>
            {formData.takesMedication && (
              <input
                placeholder="Quais remédios e para quê?"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={formData.medicationDetails}
                onChange={e => setFormData({...formData, medicationDetails: e.target.value})}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analisando Diagnóstico...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Finalizar e Gerar Plano de IA
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
