import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface AiChatResponse {
  message: string;
  role: string;
  sessionId?: string;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  constructor(private api: ApiService) {}

  chatAsGuest(message: string, history: ChatMessage[]): Observable<AiChatResponse> {
    return this.api.post<AiChatResponse>('/ai/chat/guest', {
      message,
      history: history.map(m => ({ role: m.role, content: m.content }))
    });
  }

  chatAsUser(message: string, history: ChatMessage[]): Observable<AiChatResponse> {
    return this.api.post<AiChatResponse>('/ai/chat/user', {
      message,
      history: history.map(m => ({ role: m.role, content: m.content }))
    });
  }

  chatAsOrganizer(message: string, history: ChatMessage[]): Observable<AiChatResponse> {
    return this.api.post<AiChatResponse>('/ai/chat/organizer', {
      message,
      history: history.map(m => ({ role: m.role, content: m.content }))
    });
  }

  generateItinerary(destination: string, days: number, tripType: string, preferences: string): Observable<AiChatResponse> {
    return this.api.post<AiChatResponse>('/ai/generate-itinerary', { destination, days: days.toString(), tripType, preferences });
  }
}
