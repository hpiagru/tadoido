
import React from 'react';
import { 
  Home, MessageCircle, Wind, BookOpen, Users, Smile, Meh, Frown, Heart,
  CloudLightning, BarChart3, Music, Waves, Trees, CloudRain, Moon, Bed, Crown, Sparkles, ShieldCheck, 
  Baby, BrainCircuit, FileText, Download, Star
} from 'lucide-react';
import { Mood, Professional } from './types';

export const MOOD_CONFIG: Record<Mood, { icon: React.ReactNode; color: string; value: number; label: string }> = {
  'Great': { icon: <Smile className="w-8 h-8" />, color: 'bg-green-100 text-green-600', value: 5, label: 'Excelente' },
  'Good': { icon: <Heart className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-600', value: 4, label: 'Bem' },
  'Neutral': { icon: <Meh className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', value: 3, label: 'Neutro' },
  'Bad': { icon: <Frown className="w-8 h-8" />, color: 'bg-orange-100 text-orange-600', value: 2, label: 'Mal' },
  'Awful': { icon: <CloudLightning className="w-8 h-8" />, color: 'bg-red-100 text-red-600', value: 1, label: 'Péssimo' },
};

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Painel', icon: <Home className="w-5 h-5" /> },
  { id: 'coach', label: 'Mentor IA', icon: <MessageCircle className="w-5 h-5" /> },
  { id: 'relax', label: 'Relaxar', icon: <Wind className="w-5 h-5" /> },
  { id: 'premium', label: 'Premium', icon: <Crown className="w-5 h-5" />, highlight: true },
  { id: 'journal', label: 'Diário', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'psychologists', label: 'Especialistas', icon: <Users className="w-5 h-5" /> },
];

export const MOCK_PSYCHOLOGISTS: Professional[] = [
  { 
    id: '1', 
    name: 'Dra. Shirley Tantam', 
    specialty: ['Psicóloga', 'TCC', 'Ansiedade Clínica'], 
    rating: 4.9, 
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', 
    availability: 'Seg a Sex, 09h às 17h', 
    crp: '06/99887-SP', 
    verified: true, 
    attendanceMode: 'hibrido', 
    priceInfo: 'Online R$ 100 / Presencial R$ 160' 
  },
  { 
    id: 'tdah-1', 
    name: 'Dr. Marcos Neuro', 
    specialty: ['Neuropediatra', 'TDAH', 'Autismo (TEA)'], 
    rating: 5.0, 
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', 
    availability: 'Ter e Qui, 08h às 14h', 
    crp: 'CRM 12345-SP', 
    verified: true, 
    attendanceMode: 'presencial', 
    priceInfo: 'Consulta R$ 250' 
  },
  { 
    id: '2', 
    name: 'Junior Final Feliz', 
    specialty: ['Psicanalista', 'Mentor de Carreira', 'Relacionamentos'], 
    rating: 4.8, 
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 
    availability: 'Seg a Sex, 10h às 19h', 
    crp: 'PSIC-SP/99002', 
    verified: true, 
    attendanceMode: 'online', 
    priceInfo: 'Sessão R$ 120' 
  },
];

export const MOCK_THERAPISTS = MOCK_PSYCHOLOGISTS;

export const MOCK_SOUNDS = [
  { id: 's1', title: 'Chuva Tropical', icon: <CloudRain className="w-6 h-6" />, color: 'bg-blue-50 text-blue-500', url: 'https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3' },
  { id: 's2', title: 'Ondas da Praia', icon: <Waves className="w-6 h-6" />, color: 'bg-cyan-50 text-cyan-500', url: 'https://assets.mixkit.co/active_storage/sfx/1113/1113-preview.mp3' },
];

export const PREMIUM_CONTENT = {
  soundscapes: [
    { id: 'p1', title: 'Foco Neural (TDAH)', url: 'https://assets.mixkit.co/active_storage/sfx/2355/2355-preview.mp3', color: 'from-purple-600 to-indigo-600' },
  ],
  meditations: [
    { id: 'pm1', title: 'Mente em Foco: TDAH Adulto', duration: '15 min', category: 'Premium', level: 'Intermediário', image: 'https://images.unsplash.com/photo-1614850523296-e811cfbaf163?auto=format&fit=crop&q=80&w=400' }
  ],
  supportMaterial: [
    { id: 'eb1', title: 'Guia de Rotinas: Crianças TEA', type: 'E-book PDF', size: '4.2MB', icon: <Download className="w-4 h-4" /> },
    { id: 'eb2', title: 'Checklist Escolar para TDAH', type: 'Infográfico', size: '1.5MB', icon: <Download className="w-4 h-4" /> },
    { id: 'eb3', title: 'Mapa Mental: Regulação Emocional', type: 'E-book PDF', size: '2.8MB', icon: <Download className="w-4 h-4" /> },
  ]
};

export const MOCK_MEDITATIONS = [
  { id: 'm1', title: 'Calma Profunda', duration: '10 min', category: 'Ansiedade', level: 'Iniciante', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773', technique: 'Mindfulness', description: 'Uma meditação guiada para reduzir a ansiedade.' },
  { id: 'm2', title: 'Foco no Agora', duration: '5 min', category: 'Foco', level: 'Intermediário', image: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471', technique: 'Respiração', description: 'Treine sua atenção plena.' },
  { id: 'adv1', title: 'Avançado: Coerência Cardíaca', duration: '20 min', category: 'Ansiedade', level: 'Avançado', image: 'https://images.unsplash.com/photo-1528319725582-ddc0a60bfc5f', technique: 'Biofeedback', description: 'Técnica avançada de regulação do sistema nervoso.' },
  { id: 'sleep1', title: 'Sono Profundo', duration: '30 min', category: 'Sono', level: 'Iniciante', image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487', technique: 'Relaxamento Progressivo', description: 'Prepare seu corpo para uma noite reparadora.' }
];

export const THERAPEUTIC_PROMPTS = [
  { id: 't1', title: 'Gratidão', prompt: 'Liste três coisas pelas quais você é grato hoje.' },
  { id: 't2', title: 'Superação', prompt: 'Qual desafio você enfrentou e como se sentiu ao lidar com ele?' },
  { id: 't3', title: 'Futuro', prompt: 'Como você se imagina daqui a um ano em relação ao seu bem-estar?' }
];

export const PLANS = [
  {
    id: 'free',
    name: 'Apoio Inicial',
    price: '0',
    features: ['Check-in de Humor diário', 'Diário emocional limitado', 'IA Mentora (Versão Base)', 'Sons da natureza básicos'],
    cta: 'Começar Grátis',
    popular: false
  },
  {
    id: 'premium',
    name: 'Equilíbrio Total',
    price: '34,90',
    features: ['IA Serene Pro (Personalizada)', 'Material de Apoio TDAH & TEA', 'Relatórios Clínicos para Médicos', 'Ondas Binaurais (Foco/Sono)', 'Descontos em Consultas'],
    cta: 'Assinar Premium',
    popular: true
  },
  {
    id: 'annual',
    name: 'Anual (Foco TEA/TDAH)',
    price: '299,00',
    period: '/ano',
    features: ['Tudo do plano mensal', 'Acesso vitalício aos materiais', 'Prioridade em agendamentos', '3 meses grátis de IA Pro'],
    cta: 'Economizar Agora',
    popular: false
  }
];

export const WRITING_PROMPTS = [
  "Como foi minha concentração hoje?",
  "O que me causou sobrecarga sensorial?",
  "Três vitórias de hoje (mesmo que pequenas).",
];

export const MENTAL_HEALTH_CAMPAIGNS = [
  { month: 'Janeiro', name: 'Janeiro Branco', desc: 'Conscientização sobre a saúde mental.', color: 'bg-white', text: 'text-slate-900', theme: 'Saúde Mental' },
  { month: 'Setembro', name: 'Setembro Amarelo', desc: 'Prevenção ao suicídio.', color: 'bg-yellow-50', text: 'text-yellow-700', theme: 'Valorização da Vida' },
  { month: 'Outubro', name: 'Outubro Rosa', desc: 'Saúde da mulher.', color: 'bg-pink-50', text: 'text-pink-700', theme: 'Prevenção' },
];
