
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, PatientData, MoodLog } from "../types";

const SYSTEM_INSTRUCTION = `
Você é a voz do app "Cuida de Mim", um assistente de triagem em psicologia clínica.
Seu objetivo é acolher o usuário e ajudar a identificar se ele precisa de intervenção de um psicólogo CRP.

Diretrizes:
1. Responda SEMPRE em Português do Brasil com tom clínico e empático.
2. Utilize TCC e conceitos de Psicologia Baseada em Evidências.
3. Se houver risco de autolesão grave, indique o CVV (188) imediatamente e mude o status para CRÍTICO.
4. Explique que o app conecta a PSICÓLOGOS CLÍNICOS credenciados.
`;

export class GeminiService {
  async getChatResponse(history: ChatMessage[], currentMessage: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: currentMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });
      return response.text || "Estou aqui por você. Pode repetir?";
    } catch (error) {
      return "Estou em um momento de silêncio técnico. Tente novamente em breve.";
    }
  }

  async analyzeClinicalUrgency(logs: MoodLog[]): Promise<'Low' | 'Moderate' | 'High' | 'Critical'> {
    if (logs.length === 0) return 'Low';
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const historyStr = logs.slice(-10).map(l => `${l.mood}: ${l.note}`).join('\n');
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analise o histórico emocional abaixo e determine a urgência de busca por um PSICÓLOGO. 
        Retorne APENAS uma das palavras: Low, Moderate, High, Critical.
        Histórico:
        ${historyStr}`,
        config: { temperature: 0.1 }
      });
      const result = response.text?.trim() as any;
      return ['Low', 'Moderate', 'High', 'Critical'].includes(result) ? result : 'Moderate';
    } catch (error) {
      return 'Moderate';
    }
  }

  async generateClinicalPreFicha(data: PatientData, logs: MoodLog[]) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const historyStr = logs.slice(-15).map(l => `${new Date(l.timestamp).toLocaleDateString()}: ${l.mood} - ${l.note}`).join('\n');
      
      const prompt = `
        VOCÊ É UM ASSISTENTE DE TRIAGEM PSICOLÓGICA. Gere uma "Pre-Ficha Clínica" técnica para ser enviada a um PSICÓLOGO CRP.
        
        DADOS DO PACIENTE:
        - Queixa principal: ${data.feels}
        - Histórico anterior: ${data.previousTreatment ? 'Sim' : 'Não'}
        - Medicação: ${data.takesMedication ? data.medicationDetails : 'Nenhuma'}
        
        HISTÓRICO DO DIÁRIO (Últimos 15 dias):
        ${historyStr}
        
        ESTRUTURA DA FICHA:
        1. Súmula Psicopatológica (impressão inicial baseada nos logs).
        2. Padrões Identificados (ex: gatilhos, recorrência de humor baixo).
        3. Sugestão de Foco para 1ª Sessão.
        
        Linguagem: Técnica, objetiva e profissional para leitura de outro psicólogo.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { temperature: 0.3 }
      });
      return response.text || "Não foi possível gerar a ficha técnica no momento.";
    } catch (error) {
      return "Erro na geração do relatório clínico.";
    }
  }

  // Added missing generateTreatmentPlan method
  async generateTreatmentPlan(data: PatientData) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `
        Com base nos dados do paciente abaixo, gere um plano de tratamento inicial e acolhedor focado em Psicologia Baseada em Evidências (TCC).
        
        NOME: ${data.name}
        QUEIXA: ${data.feels}
        HISTÓRICO ANTERIOR: ${data.previousTreatment ? 'Sim' : 'Não'}
        MEDICAÇÃO: ${data.takesMedication ? data.medicationDetails : 'Não'}
        
        O plano deve incluir:
        1. Objetivos terapêuticos sugeridos.
        2. Técnicas de manejo de sintomas (ex: respiração, reestruturação cognitiva).
        3. Frequência recomendada para sessões.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { temperature: 0.5 }
      });
      return response.text || "Plano gerado com sucesso.";
    } catch (error) {
      return "Erro ao gerar plano de tratamento.";
    }
  }

  // Added missing generateMoodInsights method
  async generateMoodInsights(logs: MoodLog[]) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const historyStr = logs.slice(-7).map(l => `${l.mood}: ${l.note}`).join('\n');
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analise o histórico de humor e forneça um insight curto, empático e motivacional para o usuário.
        Histórico:
        ${historyStr}`,
        config: { temperature: 0.7 }
      });
      return response.text || "Continue cuidando de você!";
    } catch (error) {
      return "Mantenha o foco no seu bem-estar.";
    }
  }

  async detectCrisis(text: string): Promise<boolean> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Indício de risco suicida ou violência em: "${text}"? Retorne apenas RISCO ou OK.`,
        config: { temperature: 0.1 }
      });
      return response.text?.trim().toUpperCase() === 'RISCO';
    } catch (error) {
      return false;
    }
  }

  async analyzeMood(text: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Humor (Great/Good/Neutral/Bad/Awful) para: "${text}"`,
        config: { temperature: 0.1 }
      });
      return (response.text?.trim() as any) || 'Neutral';
    } catch (error) {
      return 'Neutral';
    }
  }
}

export const geminiService = new GeminiService();
