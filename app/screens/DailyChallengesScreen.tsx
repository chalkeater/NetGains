import { observer } from "mobx-react-lite"
import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Text } from "../components"
import { BinionTheme, BinionComponents } from "../theme/binion-theme"
import { GridOverlay } from "../components/GridOverlay"
import { getCollections, DailyChallenge } from "../models/database"
import { seedDatabase } from "../models/database/seedData"

interface ChallengeCardProps {
  challenge: DailyChallenge
  onSelect: (challenge: DailyChallenge) => void
  completed?: boolean
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onSelect,
  completed = false,
}) => {
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return BinionTheme.colors.success
      case 2:
        return BinionTheme.colors.warning
      case 3:
        return BinionTheme.colors.error
      default:
        return BinionTheme.colors.info
    }
  }

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner"
      case 2:
        return "Intermediate"
      case 3:
        return "Advanced"
      default:
        return "Unknown"
    }
  }

  return (
    <TouchableOpacity
      style={[styles.challengeCard, completed && styles.completedCard]}
      onPress={() => onSelect(challenge)}
      activeOpacity={0.8}
    >
      <GridOverlay intensity="fine" />

      {/* Challenge Header */}
      <View style={styles.challengeHeader}>
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(challenge.difficultyLevel) },
          ]}
        >
          <Text style={styles.difficultyText}>{getDifficultyText(challenge.difficultyLevel)}</Text>
        </View>
      </View>

      {/* Challenge Info */}
      <View style={styles.challengeInfo}>
        <Text style={styles.challengeDescription}>{challenge.description}</Text>
        <View style={styles.challengeDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{challenge.durationMinutes} min</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{challenge.category}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Partner:</Text>
            <Text style={styles.detailValue}>
              {challenge.isPartnerRequired ? "Required" : "Optional"}
            </Text>
          </View>
        </View>
      </View>

      {/* Completion Status */}
      {completed && (
        <View style={styles.completionBadge}>
          <Text style={styles.completionText}>✓ Completed</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export const DailyChallengesScreen: React.FC = observer(() => {
  const [challenges, setChallenges] = useState<DailyChallenge[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    loadChallenges()
  }, [])

  const loadChallenges = async () => {
    try {
      // Seed database if needed
      await seedDatabase()

      const collections = getCollections()
      const allChallenges = await collections.dailyChallenges.query().fetch()
      setChallenges(allChallenges)
      setLoading(false)
    } catch (error) {
      console.error("Error loading challenges:", error)
      Alert.alert("Error", "Failed to load challenges")
      setLoading(false)
    }
  }

  const handleChallengeSelect = (challenge: DailyChallenge) => {
    Alert.alert(
      challenge.title,
      `${challenge.instructions}\n\nCoaching Points:\n${challenge.coachingPoints}\n\nEquipment: ${challenge.equipmentNeeded}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Start Challenge", onPress: () => startChallenge(challenge) },
      ],
    )
  }

  const startChallenge = (challenge: DailyChallenge) => {
    // TODO: Navigate to challenge detail screen or start timer
    Alert.alert("Challenge Started!", `Good luck with ${challenge.title}!`)
  }

  const filteredChallenges = selectedCategory
    ? challenges.filter((c) => c.category === selectedCategory)
    : challenges

  const categories = [...new Set(challenges.map((c) => c.category))]

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <GridOverlay intensity="medium" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading challenges...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <GridOverlay intensity="medium" />

      {/* Header */}
      <View style={styles.header}>
        <Text preset="heading" style={styles.headerTitle}>
          Daily Challenges
        </Text>
        <Text style={styles.headerSubtitle}>Train like a champion, one challenge at a time</Text>
      </View>

      {/* Challenge List */}
      <ScrollView
        style={styles.challengeList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.challengeListContent}
      >
        {filteredChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onSelect={handleChallengeSelect}
            completed={false} // TODO: Check completion status from database
          />
        ))}
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BinionTheme.colors.backgroundPrimary,
    position: "relative",
  },
  header: {
    alignItems: "center",
    padding: BinionTheme.spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: BinionTheme.typography.sizes.lg,
    color: BinionTheme.colors.textSecondary,
    fontWeight: BinionTheme.typography.weights.medium,
  },
  headerTitle: {
    color: BinionTheme.colors.textPrimary,
    marginBottom: BinionTheme.spacing.sm,
  },
  headerSubtitle: {
    fontSize: BinionTheme.typography.sizes.md,
    color: BinionTheme.colors.textSecondary,
    textAlign: "center",
  },
  challengeList: {
    flex: 1,
  },
  challengeListContent: {
    padding: BinionTheme.spacing.md,
    paddingBottom: BinionTheme.spacing.xxxl,
  },
  challengeCard: {
    ...BinionComponents.ChallengeCard,
    marginBottom: BinionTheme.spacing.lg,
  },
  completedCard: {
    opacity: 0.7,
    borderColor: BinionTheme.colors.success,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: BinionTheme.spacing.md,
  },
  challengeTitle: {
    fontSize: BinionTheme.typography.sizes.xl,
    fontWeight: BinionTheme.typography.weights.bold,
    color: BinionTheme.colors.textPrimary,
    flex: 1,
    marginRight: BinionTheme.spacing.md,
  },
  difficultyBadge: {
    paddingHorizontal: BinionTheme.spacing.sm,
    paddingVertical: BinionTheme.spacing.xs,
    borderRadius: BinionTheme.borderRadius.sm,
  },
  difficultyText: {
    fontSize: BinionTheme.typography.sizes.xs,
    color: BinionTheme.colors.secondary,
    fontWeight: BinionTheme.typography.weights.bold,
  },
  challengeInfo: {
    marginBottom: BinionTheme.spacing.md,
  },
  challengeDescription: {
    fontSize: BinionTheme.typography.sizes.md,
    color: BinionTheme.colors.textSecondary,
    marginBottom: BinionTheme.spacing.md,
    lineHeight: 22,
  },
  challengeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: BinionTheme.spacing.xs,
  },
  detailLabel: {
    fontSize: BinionTheme.typography.sizes.sm,
    color: BinionTheme.colors.textMuted,
    fontWeight: BinionTheme.typography.weights.medium,
    marginRight: BinionTheme.spacing.xs,
  },
  detailValue: {
    fontSize: BinionTheme.typography.sizes.sm,
    color: BinionTheme.colors.textPrimary,
    fontWeight: BinionTheme.typography.weights.semibold,
    textTransform: "capitalize",
  },
  completionBadge: {
    position: "absolute",
    top: BinionTheme.spacing.md,
    right: BinionTheme.spacing.md,
    backgroundColor: BinionTheme.colors.success,
    paddingHorizontal: BinionTheme.spacing.sm,
    paddingVertical: BinionTheme.spacing.xs,
    borderRadius: BinionTheme.borderRadius.sm,
  },
  completionText: {
    fontSize: BinionTheme.typography.sizes.xs,
    color: BinionTheme.colors.secondary,
    fontWeight: BinionTheme.typography.weights.bold,
  },
})
