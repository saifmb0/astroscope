/**
 * Home Screen - Dashboard with trending risks and mission intelligence
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../components/GlassCard';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { TRENDING_QUERIES } from '../constants/data';
import NasaDataService from '../services/NasaDataService';
import { NasaLesson } from '../types/nasa';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const [trendingData, setTrendingData] = useState<Record<string, NasaLesson[]>>({});

  useEffect(() => {
    loadTrendingData();
  }, []);

  const loadTrendingData = async () => {
    const data: Record<string, NasaLesson[]> = {};
    
    for (const category of TRENDING_QUERIES) {
      const lessons = NasaDataService.getTrendingLessons(category.query);
      data[category.id] = lessons.slice(0, 3);
    }
    
    setTrendingData(data);
  };

  const handleTrendingPress = (query: string) => {
    navigation.navigate('Chat', { initialQuery: query });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={[Colors.backgroundSecondary, Colors.background] as any}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.logo}>🛸</Text>
          <View>
            <Text style={styles.title}>AstroScope</Text>
            <Text style={styles.subtitle}>Mission Intelligence</Text>
          </View>
        </View>
        <Text style={styles.tagline}>
          Powered by NASA's Lessons Learned Intelligence System
        </Text>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statValue}>12+</Text>
            <Text style={styles.statLabel}>Critical Lessons</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Missions Analyzed</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Risk Categories</Text>
          </GlassCard>
        </View>

        {/* Trending Risks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Risk Categories</Text>
          <Text style={styles.sectionSubtitle}>
            Explore critical lessons from NASA missions
          </Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          {TRENDING_QUERIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handleTrendingPress(item.query)}
            >
              <LinearGradient
                colors={item.gradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.trendingCard}
              >
                <Text style={styles.trendingIcon}>{item.icon}</Text>
                <Text style={styles.trendingTitle}>{item.title}</Text>
                <View style={styles.trendingBadge}>
                  <Text style={styles.trendingBadgeText}>
                    {trendingData[item.id]?.length || 0} lessons
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Start */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
        </View>

        <GlassCard style={styles.quickStartCard}>
          <Text style={styles.quickStartTitle}>Ask AstroScope AI</Text>
          <Text style={styles.quickStartText}>
            Get instant insights from decades of NASA mission experience. Ask about risks, failures, and lessons learned.
          </Text>
          <TouchableOpacity
            style={styles.quickStartButton}
            onPress={() => navigation.navigate('Chat')}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark] as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Start Conversation →</Text>
            </LinearGradient>
          </TouchableOpacity>
        </GlassCard>

        {/* Recent Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mission Highlights</Text>
        </View>

        {Object.entries(trendingData)
          .slice(0, 3)
          .map(([categoryId, lessons]) => {
            if (!lessons.length) return null;
            const category = TRENDING_QUERIES.find(q => q.id === categoryId);
            if (!category) return null;

            return (
              <GlassCard key={categoryId} style={styles.highlightCard}>
                <View style={styles.highlightHeader}>
                  <Text style={styles.highlightIcon}>{category.icon}</Text>
                  <Text style={styles.highlightCategory}>{category.title}</Text>
                </View>
                <Text style={styles.highlightTitle} numberOfLines={2}>
                  {lessons[0]?.title}
                </Text>
                <Text style={styles.highlightMission}>
                  {lessons[0]?.mission || 'NASA Mission'}
                </Text>
              </GlassCard>
            );
          })}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Spacing.xxl + 20,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  logo: {
    fontSize: 48,
    marginRight: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: '600',
  },
  tagline: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  carouselContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  trendingCard: {
    width: width * 0.4,
    height: 160,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  trendingIcon: {
    fontSize: 32,
  },
  trendingTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: 'bold',
    color: Colors.text,
  },
  trendingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  trendingBadgeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text,
    fontWeight: '600',
  },
  quickStartCard: {
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
  },
  quickStartTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  quickStartText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  quickStartButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: 'bold',
    color: Colors.text,
  },
  highlightCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  highlightIcon: {
    fontSize: 20,
    marginRight: Spacing.xs,
  },
  highlightCategory: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  highlightTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  highlightMission: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});
