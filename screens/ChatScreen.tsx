/**
 * Chat Screen - Conversational AI interface for NASA mission intelligence
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { GlassCard } from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { DEMO_QUERIES } from '../constants/data';
import NasaDataService from '../services/NasaDataService';
import GeminiService from '../services/GeminiService';
import { ChatMessage, SanitizedLesson } from '../types/nasa';

export default function ChatScreen({ route }: any) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentContext, setCurrentContext] = useState<SanitizedLesson[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const { initialQuery } = route.params || {};

  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    // Clear input
    setInputText('');

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Add loading message
    const loadingMessage: ChatMessage = {
      id: `${Date.now()}-loading`,
      role: 'assistant',
      content: 'Analyzing deep space archives...',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Step 1: Search NASA data
      const searchResult = await NasaDataService.searchLessons(messageText);
      
      if (searchResult.lessons.length === 0) {
        throw new Error('No relevant lessons found');
      }

      // Step 2: Sanitize lessons with Gemini
      const sanitized = await GeminiService.sanitizeLessons(
        searchResult.lessons.slice(0, 5)
      );

      setCurrentContext(sanitized);

      // Step 3: Generate AI response
      const aiResult = await GeminiService.answerQuestion(messageText, sanitized);

      // Remove loading message and add real response
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isLoading);
        const aiMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: aiResult.answer,
          timestamp: new Date(),
          lessonIds: aiResult.citedLessonIds,
        };
        return [...filtered, aiMessage];
      });

    } catch (error: any) {
      console.error('Chat error:', error);

      // Remove loading and show error
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isLoading);
        const errorMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `I encountered an issue processing your request: ${error.message}. This might be due to API configuration. Please check your Gemini API key in the .env file.`,
          timestamp: new Date(),
        };
        return [...filtered, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLessonIdPress = async (lessonId: number) => {
    const lesson = await NasaDataService.getLessonById(lessonId);
    if (lesson) {
      // Show lesson details (you could navigate to a detail screen)
      const detailMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `**Lesson ${lessonId}: ${lesson.title}**\n\n${lesson.abstract}\n\n**Mission:** ${lesson.mission || 'N/A'}\n**Center:** ${lesson.center || 'N/A'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, detailMessage]);
    }
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.role === 'user';

    if (message.isLoading) {
      return (
        <View key={message.id} style={styles.messageContainer}>
          <GlassCard style={styles.assistantBubble}>
            <View style={styles.loadingContainer}>
              <LoadingSpinner size={20} />
              <Text style={styles.loadingText}>{message.content}</Text>
            </View>
          </GlassCard>
        </View>
      );
    }

    return (
      <View 
        key={message.id} 
        style={[
          styles.messageContainer,
          isUser && styles.userMessageContainer,
        ]}
      >
        <GlassCard 
          style={isUser ? styles.userBubble : styles.assistantBubble}
          gradient={isUser}
          gradientColors={isUser ? [Colors.primary, Colors.primaryDark] : undefined}
        >
          <Text style={isUser ? styles.userText : styles.assistantText}>
            {message.content}
          </Text>
          
          {/* Render cited lesson IDs as clickable links */}
          {message.lessonIds && message.lessonIds.length > 0 && (
            <View style={styles.citationsContainer}>
              <Text style={styles.citationsLabel}>Referenced Lessons:</Text>
              <View style={styles.citationButtons}>
                {message.lessonIds.map(id => (
                  <TouchableOpacity
                    key={id}
                    style={styles.citationButton}
                    onPress={() => handleLessonIdPress(id)}
                  >
                    <Text style={styles.citationText}>ID: {id}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </GlassCard>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🛸</Text>
              <Text style={styles.emptyTitle}>AstroScope Mission Intelligence</Text>
              <Text style={styles.emptySubtitle}>
                Ask me anything about NASA missions, failures, and lessons learned
              </Text>
              
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>Try asking:</Text>
                {DEMO_QUERIES.slice(0, 4).map((query, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionButton}
                    onPress={() => handleSendMessage(query)}
                  >
                    <Text style={styles.suggestionText}>"{query}"</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            messages.map(renderMessage)
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <GlassCard style={styles.inputCard}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask about NASA missions..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              maxLength={500}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
            >
              <Text style={styles.sendButtonText}>
                {isLoading ? '⏳' : '🚀'}
              </Text>
            </TouchableOpacity>
          </GlassCard>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  messageContainer: {
    marginBottom: Spacing.md,
    maxWidth: '85%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  userBubble: {
    backgroundColor: Colors.primary,
  },
  assistantBubble: {
    backgroundColor: Colors.glass,
  },
  userText: {
    color: Colors.text,
    fontSize: Typography.fontSize.md,
    lineHeight: 22,
  },
  assistantText: {
    color: Colors.text,
    fontSize: Typography.fontSize.md,
    lineHeight: 22,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontStyle: 'italic',
  },
  citationsContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.glassBorder,
  },
  citationsLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  citationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  citationButton: {
    backgroundColor: Colors.glassHighlight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  citationText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl * 2,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  suggestionsContainer: {
    width: '100%',
    marginTop: Spacing.lg,
  },
  suggestionsTitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  suggestionButton: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  suggestionText: {
    color: Colors.text,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  inputContainer: {
    padding: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.md,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.sm,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: Typography.fontSize.md,
    maxHeight: 100,
    paddingHorizontal: Spacing.sm,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.glass,
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 24,
  },
});
