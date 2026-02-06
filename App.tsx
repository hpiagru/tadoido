
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import Relax from './components/Relax';
import Premium from './components/Premium';
import Journal from './components/Journal';
import Psychologists from './components/Psychologists'; // Atualizado
import ProRegistration from './components/ProRegistration';
import PatientRegistration from './components/PatientRegistration';
import TreatmentPlan from './components/TreatmentPlan';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import AdminDashboard from './components/AdminDashboard';
import Campaigns from './components/Campaigns';
import InvestorPitch from './components/InvestorPitch';
import MoodReports from './components/MoodReports';
import PatientProfile from './components/PatientProfile';
import Auth from './components/Auth';
import { AppView, Mood, MoodLog, UserRole } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('landing');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [treatmentPlan, setTreatmentPlan] = useState<string>('');
  const [hasDiagnosis, setHasDiagnosis] = useState(false);
  const [isCrisisMode, setIsCrisisMode] = useState(false);

  useEffect(() => {
    const initialLogs: MoodLog[] = [
      { id: '1', mood: 'Good', timestamp: Date.now() - 86400000 * 6, note: 'Trabalho fluindo bem.', tags: ['Trabalho'] },
      { id: '2', mood: 'Neutral', timestamp: Date.now() - 86400000 * 5, note: 'Rotina normal.', tags: ['Descanso'] },
    ];
    setMoodLogs(initialLogs);
  }, []);

  const handleAddMood = useCallback((mood: Mood) => {
    const newLog: MoodLog = {
      id: Math.random().toString(36).substr(2, 9),
      mood,
      timestamp: Date.now(),
      note: '',
      tags: ['Check-in']
    };
    setMoodLogs(prev => [...prev, newLog]);
  }, []);

  const handleAddJournalEntry = async (note: string, tags: string[]) => {
    const hasRisco = await geminiService.detectCrisis(note);
    if (hasRisco) setIsCrisisMode(true);
    const detectedMood = await geminiService.analyzeMood(note);
    const newLog: MoodLog = {
      id: Math.random().toString(36).substr(2, 9),
      mood: detectedMood,
      timestamp: Date.now(),
      note,
      tags
    };
    setMoodLogs(prev => [...prev, newLog]);
  };

  const handleSetTreatmentPlan = (plan: string) => {
    setTreatmentPlan(plan);
    setHasDiagnosis(true);
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'admin') setActiveView('admin-dashboard');
    else if (role === 'professional') setActiveView('pro-dashboard');
    else setActiveView('dashboard');
  };

  useEffect(() => {
    const publicViews: AppView[] = ['landing', 'login', 'register-patient', 'register-pro', 'investor-pitch'];
    if (userRole === 'guest' && !publicViews.includes(activeView)) {
      setActiveView('landing');
    }
  }, [userRole, activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'landing': return <LandingPage onNavigate={setActiveView} onSetRole={setUserRole} />;
      case 'login': return <Auth onLogin={handleLogin} onNavigate={setActiveView} />;
      case 'dashboard': return <Dashboard logs={moodLogs} onAddMood={handleAddMood} onNavigate={setActiveView} />;
      case 'coach': return <AICoach />;
      case 'relax': return <Relax />;
      case 'premium': return <Premium />;
      case 'reports': return <MoodReports logs={moodLogs} />;
      case 'journal': return <Journal logs={moodLogs} onAddLog={handleAddJournalEntry} />;
      case 'profile': return <PatientProfile />;
      case 'psychologists': return <Psychologists onNavigate={setActiveView} logs={moodLogs} />;
      case 'register-pro': return <ProRegistration onNavigate={setActiveView} />;
      case 'register-patient': return <PatientRegistration onNavigate={setActiveView} onSetTreatmentPlan={handleSetTreatmentPlan} />;
      case 'treatment-plan': return <TreatmentPlan plan={treatmentPlan} onNavigate={setActiveView} />;
      case 'pro-dashboard': return <ProfessionalDashboard />;
      case 'admin-dashboard': return <AdminDashboard />;
      case 'campaigns': return <Campaigns />;
      case 'investor-pitch': return <InvestorPitch />;
      default: return <LandingPage onNavigate={setActiveView} onSetRole={setUserRole} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      userRole={userRole} 
      setUserRole={setUserRole}
      isCrisisMode={isCrisisMode}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
