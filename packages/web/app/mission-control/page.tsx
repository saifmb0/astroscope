'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import ChatBubble from '@/components/ChatBubble';
import { searchNASALessons, NASALesson } from '@/lib/nasa-api';
import { queryGeminiWithContext } from '@/lib/gemini-api';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isStreaming?: boolean;
  citations?: NASALesson[];
}

interface ProcessLog {
  message: string;
  status: 'pending' | 'active' | 'complete';
  timestamp: Date;
}

export default function MissionControlPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useMockData, setUseMockData] = useState(false);
  const [processLogs, setProcessLogs] = useState<ProcessLog[]>([]);
  const [showProcessTerminal, setShowProcessTerminal] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    'What is the status of Artemis II?',
    'Tell me about Mars Perseverance rover',
    'How does the ISS life support work?',
    'Challenges of deep space missions?',
  ];

  // Auto-scroll effect - triggers on messages AND during streaming
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const addProcessLog = (message: string, status: ProcessLog['status'] = 'pending') => {
    setProcessLogs(prev => [...prev, { message, status, timestamp: new Date() }]);
  };

  const updateLastLogStatus = (status: ProcessLog['status']) => {
    setProcessLogs(prev => {
      const newLogs = [...prev];
      if (newLogs.length > 0) {
        newLogs[newLogs.length - 1].status = status;
      }
      return newLogs;
    });
  };

  const handleSendMessage = async (queryText: string = inputValue) => {
    if (!queryText.trim() || isProcessing) return;

    const userMessageId = `user-${Date.now()}`;
    const aiMessageId = `ai-${Date.now()}`;

    // Add user message
    setMessages(prev => [...prev, { id: userMessageId, text: queryText, isUser: true }]);
    setInputValue('');
    setIsProcessing(true);
    setProcessLogs([]);
    setShowProcessTerminal(true);

    try {
      // Process Log Step 1: Uplink
      addProcessLog('UPLINK ESTABLISHED - Mission Control Online', 'active');
      await new Promise(resolve => setTimeout(resolve, 500));
      updateLastLogStatus('complete');

      // Process Log Step 2: Query NASA
      addProcessLog('Querying NASA LLIS Database...', 'active');
      const nasaLessons = await searchNASALessons(queryText, useMockData);
      updateLastLogStatus('complete');
      
      addProcessLog(`Retrieved ${nasaLessons.length} mission records`, 'complete');

      // Process Log Step 3: AI Analysis
      await new Promise(resolve => setTimeout(resolve, 300));
      addProcessLog('Initializing Gemini AI Analysis...', 'active');

      const context = nasaLessons
        .map(lesson => `[${lesson.id}] Mission: ${lesson.mission}\nTitle: ${lesson.title}\nAbstract: ${lesson.abstract}`)
        .join('\n\n');

      const fullResponse = (await queryGeminiWithContext(queryText, context)).text;
      updateLastLogStatus('complete');
      
      addProcessLog('Analysis Complete', 'complete');

      // Hide process terminal after brief delay
      setTimeout(() => setShowProcessTerminal(false), 2000);

      // Add AI message placeholder
      setMessages(prev => [...prev, { 
        id: aiMessageId, 
        text: '', 
        isUser: false, 
        isStreaming: true,
        citations: nasaLessons 
      }]);

      // Stream word-by-word
      const words = fullResponse.split(' ');
      let accumulated = '';
      
      for (let i = 0; i < words.length; i++) {
        accumulated += (i > 0 ? ' ' : '') + words[i];
        
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: accumulated, isStreaming: true }
            : msg
        ));
        
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      // Finalize message
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: accumulated, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error('Error processing query:', error);
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        text: 'I encountered an issue processing your request. Please try again.',
        isUser: false,
      }]);
      setShowProcessTerminal(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden pt-20">
      {/* Compact Header */}
      <div className="glass-effect border-b border-white/10 py-4 flex-shrink-0">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-gradient flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-[#00D9FF]" />
                Mission Control
              </h1>
              <p className="text-sm text-white/60 mt-1">
                AI-powered NASA mission insights
              </p>
            </div>
            
            {/* Mock Data Toggle */}
            <div className="flex items-center space-x-2 glass-effect px-3 py-1.5 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setUseMockData(true)}
                className={`px-2 py-1 rounded transition-all ${
                  useMockData ? 'bg-[#00D9FF] text-white font-semibold' : 'text-white/60'
                }`}
              >
                Mock
              </button>
              <button
                onClick={() => setUseMockData(false)}
                className={`px-2 py-1 rounded transition-all ${
                  !useMockData ? 'bg-[#9D4EDD] text-white font-semibold' : 'text-white/60'
                }`}
              >
                Live
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container - SCROLLABLE AREA ONLY */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="container mx-auto max-w-4xl px-6 py-6">
          {messages.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD] rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gradient">
                Ready for Mission
              </h2>
              <p className="text-white/50 text-sm mb-6">
                Ask me anything about NASA missions
              </p>
            </div>
          ) : (
            // Messages with tight spacing
            <div className="space-y-2">
              {messages.map((message) => (
                <div key={message.id}>
                  <ChatBubble
                    message={message.text}
                    isUser={message.isUser}
                    isStreaming={message.isStreaming}
                  />
                  
                  {/* Citations as embedded chips with dividing line */}
                  {!message.isUser && message.citations && message.citations.length > 0 && !message.isStreaming && (
                    <div className="ml-14 mt-3 mb-4">
                      <div className="border-t border-white/10 pt-3">
                        <div className="flex flex-wrap gap-2">
                          {message.citations.map((citation, idx) => (
                            <a
                              key={idx}
                              href={`https://llis.nasa.gov/lesson/${citation.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs hover:bg-white/15 transition-all cursor-pointer"
                            >
                              <span className="font-mono text-[#00D9FF]">{citation.id}</span>
                              <span className="text-white/70">•</span>
                              <span className="text-white/90 max-w-[200px] truncate">{citation.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Process Terminal - Sliding Panel */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          showProcessTerminal ? 'h-48' : 'h-0'
        } overflow-hidden border-t border-white/10 glass-effect`}
      >
        <div className="container mx-auto px-6 py-3 max-w-4xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-[#00D9FF] text-sm font-semibold">
              <Terminal className="w-4 h-4" />
              <span>Process Log</span>
            </div>
            <button
              onClick={() => setShowProcessTerminal(false)}
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1 font-mono text-xs">
            {processLogs.map((log, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-2 ${
                  log.status === 'complete' ? 'text-green-400' :
                  log.status === 'active' ? 'text-yellow-400' :
                  'text-white/40'
                }`}
              >
                <span className="font-bold">
                  {log.status === 'complete' ? '✓' : log.status === 'active' ? '⟳' : '○'}
                </span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area - FIXED AT BOTTOM */}
      <div className="glass-effect border-t border-white/10 py-4 flex-shrink-0">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Suggested Queries (compact) */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mb-3 justify-center">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(query)}
                  disabled={isProcessing}
                  className="text-xs px-3 py-1.5 rounded-full glass-effect hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10"
                >
                  {query}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="flex gap-3 items-end">
            <div className="flex-1 glass-effect rounded-2xl border border-white/20 px-4 py-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any NASA mission..."
                className="w-full bg-transparent outline-none text-white placeholder-white/40"
                disabled={isProcessing}
              />
            </div>
            
            <button
              onClick={() => handleSendMessage()}
              disabled={isProcessing || !inputValue.trim()}
              className={`p-4 rounded-2xl transition-all flex-shrink-0 ${
                isProcessing || !inputValue.trim()
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] text-white hover:shadow-lg hover:shadow-[#00D9FF]/30'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
