
import React, { useState } from 'react';
import { Plus, Search, Calendar, MoreVertical, Tag, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';
import { MoodLog } from '../types';
import { MOOD_CONFIG, WRITING_PROMPTS } from '../constants';

interface JournalProps {
  logs: MoodLog[];
  onAddLog: (note: string, tags: string[]) => void;
}

const Journal: React.FC<JournalProps> = ({ logs, onAddLog }) => {
  const [newNote, setNewNote] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newNote.trim()) return;
    
    setIsAnalyzing(true);
    onAddLog(newNote, ['Saúde Mental', 'Reflexão Diária']);
    setNewNote('');
    setShowAdd(false);
    setIsAnalyzing(false);
  };

  const usePrompt = (prompt: string) => {
    setShowAdd(true);
    setNewNote(prev => (prev ? `${prev}\n\nReflexão: ${prompt}\n` : `Reflexão: ${prompt}\n`));
  };

  return (
    <div className="space-y-8 fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Seus Pensamentos</h1>
          <p className="text-slate-500 italic">Escrever reduz o estresse e constrói o autoconhecimento.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline font-semibold">Nova Entrada</span>
        </button>
      </header>

      {/* NEW: Prompts de Escrita Guiada */}
      <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
         <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Escrita Guiada</h2>
         </div>
         <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {WRITING_PROMPTS.map((prompt, i) => (
               <button 
                  key={i}
                  onClick={() => usePrompt(prompt)}
                  className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs font-bold text-slate-600 whitespace-nowrap hover:border-indigo-200 hover:text-indigo-600 transition-all"
               >
                  {prompt}
               </button>
            ))}
         </div>
      </section>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-indigo-100 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 mb-4 text-indigo-600 font-bold text-xs uppercase tracking-widest">
             <BookOpen className="w-4 h-4" /> Diário de Bordo
          </div>
          <textarea
            autoFocus
            disabled={isAnalyzing}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Escreva livremente... o que está na sua mente hoje?"
            className="w-full h-48 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 leading-relaxed disabled:opacity-50"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest">
               <AlertTriangle className="w-3.5 h-3.5" /> IA analisa riscos automaticamente
            </div>
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => { setShowAdd(false); setNewNote(''); }}
                className="px-6 py-2 text-slate-500 font-semibold hover:text-slate-800"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                disabled={isAnalyzing}
                className="px-8 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg flex items-center gap-2"
              >
                {isAnalyzing ? 'Analisando...' : 'Salvar Entrada'}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid gap-6">
        {logs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Nenhuma entrada no diário ainda. Comece sua primeira!</p>
          </div>
        ) : (
          logs.slice().reverse().map((log) => (
            <div key={log.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6 hover:shadow-md transition-shadow group">
              <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${MOOD_CONFIG[log.mood].color} group-hover:scale-105 transition-transform`}>
                {MOOD_CONFIG[log.mood].icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(log.timestamp).toLocaleDateString('pt-BR', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <button className="text-slate-300 hover:text-slate-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-slate-800 leading-relaxed mb-4 whitespace-pre-wrap">{log.note || 'Nenhuma nota adicionada para esta checagem.'}</p>
                <div className="flex flex-wrap gap-2">
                  {log.tags.map((tag, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase rounded-lg border border-slate-100">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
