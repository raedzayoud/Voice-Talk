// src/app/services/gemini.service.ts
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    // ⚠️ Mets ta vraie API Key ici
    this.genAI = new GoogleGenerativeAI(
      'AIzaSyBWXVrWX2OjkTGiJADOaU0p7JsMIy8Z6tU'
    );
  }

  async transcribeAudio(
    base64Audio: string,
    mimeType: string
  ): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
      });

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: mimeType, // ex: "audio/webm" ou "audio/mpeg"
            data: base64Audio,
          },
        },
        { text: 'Transcribe this audio .' },
      ]);

      return result.response.text(); // Récupère le texte généré
    } catch (error) {
      console.error('Erreur Gemini:', error);
      throw error;
    }
  }
}
