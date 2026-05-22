import { Component, OnInit } from '@angular/core';
import { AiService, ChatMessage } from '../../../core/services/ai.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-ai-chat-bubble',
  templateUrl: './ai-chat-bubble.component.html',
  styleUrls: ['./ai-chat-bubble.component.scss']
})
export class AiChatBubbleComponent implements OnInit {
  isOpen = false;
  messages: ChatMessage[] = [];
  inputMessage = '';
  isLoading = false;
  isOrganizer = false;

  readonly WELCOME_MESSAGE = `Namaste! 🙏 I'm **Yatri**, your AI travel assistant.\n\nI can help you:\n✈️ Find the perfect trip for your family\n🛕 Discover religious tours and pilgrimages\n💍 Plan your dream honeymoon\n📋 Guide you through booking\n\nHow can I help you today?`;

  readonly QUICK_SUGGESTIONS = [
    '🛕 Religious tours near me',
    '💍 Best honeymoon packages',
    '👨‍👩‍👧 Family trips under ₹50,000',
    '🎒 Solo adventure trips',
    '📋 How does booking work?',
  ];

  constructor(private aiService: AiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isOrganizer = this.authService.isOrganizer();
    this.messages = [{
      role: 'assistant',
      content: this.WELCOME_MESSAGE,
      timestamp: new Date()
    }];
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendQuickSuggestion(suggestion: string): void {
    const cleanText = suggestion.replace(/^[🛕💍👨‍👩‍👧🎒📋]\s*/, '');
    this.inputMessage = cleanText;
    this.sendMessage();
  }

  sendMessage(): void {
    if (!this.inputMessage.trim() || this.isLoading) return;

    const userMessage = this.inputMessage.trim();
    this.inputMessage = '';
    this.isLoading = true;

    this.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    const historyForApi = this.messages.slice(0, -1);
    const chatObs = this.isOrganizer
      ? this.aiService.chatAsOrganizer(userMessage, historyForApi)
      : this.authService.isAuthenticated()
        ? this.aiService.chatAsUser(userMessage, historyForApi)
        : this.aiService.chatAsGuest(userMessage, historyForApi);

    chatObs.subscribe({
      next: (response) => {
        this.messages.push({
          role: 'assistant',
          content: response.message,
          timestamp: new Date()
        });
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({
          role: 'assistant',
          content: 'I\'m sorry, I\'m having trouble connecting right now. Please try again in a moment.',
          timestamp: new Date()
        });
        this.isLoading = false;
      }
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chat = document.querySelector('.chat-messages');
      if (chat) chat.scrollTop = chat.scrollHeight;
    }, 100);
  }

  formatMessage(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  clearChat(): void {
    this.messages = [{
      role: 'assistant',
      content: this.WELCOME_MESSAGE,
      timestamp: new Date()
    }];
  }
}
