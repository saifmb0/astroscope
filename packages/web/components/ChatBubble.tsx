import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isStreaming?: boolean;
}

export default function ChatBubble({ message, isUser, isStreaming = false }: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`flex gap-3 ${isUser ? 'flex-row-reverse max-w-md' : 'flex-row max-w-2xl'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD]' 
            : 'bg-white/5 backdrop-blur-xl border border-white/10'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-[#00D9FF]" />
          )}
        </div>

        {/* Message Bubble with Aggressive Rounding */}
        <div className={`px-5 py-3 ${
          isUser 
            ? 'bg-gradient-to-br from-[#00D9FF]/20 to-[#9D4EDD]/20 border border-[#00D9FF]/30 rounded-3xl rounded-br-md' 
            : 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl rounded-bl-md'
        }`}>
          <div className={`${isUser ? 'text-right' : 'text-left'}`}>
            <div 
              className="text-white/90 leading-relaxed text-[15px] whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(message) }}
            />
            {isStreaming && (
              <span className="inline-block w-1.5 h-4 bg-[#00D9FF] animate-pulse ml-1 rounded-full"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Markdown formatter for better readability
function formatMarkdown(text: string): string {
  let formatted = text;
  
  // Bold text: **text** or __text__
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00D9FF] font-semibold">$1</strong>');
  formatted = formatted.replace(/__(.*?)__/g, '<strong class="text-[#00D9FF] font-semibold">$1</strong>');
  
  // Bullet points: - text or * text
  formatted = formatted.replace(/^[\-\*]\s(.+)$/gm, '<div class="flex gap-2 my-1"><span class="text-[#00D9FF] font-bold">•</span><span>$1</span></div>');
  
  // Numbered lists: 1. text
  formatted = formatted.replace(/^\d+\.\s(.+)$/gm, '<div class="flex gap-2 my-1"><span class="text-[#9D4EDD] font-semibold">→</span><span>$1</span></div>');
  
  // Inline code: `code`
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-white/10 px-2 py-0.5 rounded text-[#00D9FF] text-sm font-mono">$1</code>');
  
  // Headers: ## text or ### text
  formatted = formatted.replace(/^###\s(.+)$/gm, '<h3 class="text-base font-bold text-[#9D4EDD] mt-3 mb-1">$1</h3>');
  formatted = formatted.replace(/^##\s(.+)$/gm, '<h2 class="text-lg font-bold text-[#00D9FF] mt-4 mb-2">$1</h2>');
  
  // Line breaks (double newline = paragraph)
  formatted = formatted.replace(/\n\n/g, '<div class="h-3"></div>');
  
  return formatted;
}
