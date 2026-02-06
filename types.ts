
export type Mood = 'Great' | 'Good' | 'Neutral' | 'Bad' | 'Awful';

export interface MoodLog {
  id: string;
  timestamp: number;
  mood: Mood;
  note: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  mode: 'online' | 'presencial';
  status: 'confirmed' | 'pending' | 'completed';
  meetingLink?: string;
  sharedJournal?: boolean;
  clinicalSummary?: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  imageUrl: string;
  availability: string;
  crp: string; // Foco em CRP para Psicólogos
  verified: boolean;
  attendanceMode: AttendanceMode;
  priceInfo?: string;
  plan?: ProPlan;
  // Added properties for admin dashboard and profile management
  paymentStatus?: 'paid' | 'pending';
  expirationDate?: string;
  crp_crm?: string; 
}

export type AttendanceMode = 'online' | 'presencial' | 'hibrido';
export type ProPlan = 'basic' | 'unlimited';
export type UserRole = 'guest' | 'patient' | 'professional' | 'admin';

export interface PatientData {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  address: string;
  feels: string;
  previousTreatment: boolean;
  previousReason: string;
  takesMedication: boolean;
  medicationDetails: string;
  appointments?: Appointment[];
  isPremium?: boolean;
  clinicalUrgency?: 'Low' | 'Moderate' | 'High' | 'Critical';
  // Added properties for patient profile
  favoriteSocial?: string;
  profilePhoto?: string;
}

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  active: boolean;
}

export interface PaymentGatewayConfig {
  pixKey: string;
  pixName: string;
  active: boolean;
}

export type AppView = 
  | 'landing' 
  | 'login'
  | 'dashboard' 
  | 'coach' 
  | 'relax' 
  | 'journal' 
  | 'psychologists' // Alterado de professionals
  | 'register-pro' 
  | 'register-patient' 
  | 'treatment-plan'
  | 'pro-dashboard'
  | 'admin-dashboard'
  | 'campaigns'
  | 'investor-pitch'
  | 'reports'
  | 'profile'
  | 'premium';
