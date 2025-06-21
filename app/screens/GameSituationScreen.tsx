import { observer } from "mobx-react-lite"
import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Text } from "../components"
import { BinionTheme, BinionComponents } from "../theme/binion-theme"
import { getCollections, GameSituation } from "../models/database"
import { seedDatabase } from "../models/database/seedData"

interface SituationCardProps {
  situation: GameSituation
  onSelect: (situation: GameSituation) => void
}

const SituationCard: React.FC<SituationCardProps> = ({ situation, onSelect }) => {
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
      style={styles.situationCard}
      onPress={() => onSelect(situation)}
      activeOpacity={0.8}
    >
      {/* Situation Header */}
      <View style={styles.situationHeader}>
        <Text style={styles.situationTitle}>{situation.title}</Text>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(situation.difficultyLevel) },
          ]}
        >
          <Text style={styles.difficultyText}>{getDifficultyText(situation.difficultyLevel)}</Text>
        </View>
      </View>

      {/* Situation Info */}
      <View style={styles.situationInfo}>
        <Text style={styles.situationDescription}>{situation.description}</Text>
        <View style={styles.situationDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{situation.category.replace("_", " ")}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Level:</Text>
            <Text style={styles.detailValue}>{getDifficultyText(situation.difficultyLevel)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const GameSituationScreen: React.FC = observer(() => {
  const [situations, setSituations] = useState<GameSituation[]>([])
  const [loading, setLoading] = useState(true)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    loadSituations()
  }, [])

  const loadSituations = async () => {
    try {
      // Seed database if needed
      await seedDatabase()

      const collections = getCollections()
      const allSituations = await collections.gameSituations.query().fetch()
      setSituations(allSituations)
      setLoading(false)
    } catch (error) {
      console.error("Error loading situations:", error)
      Alert.alert("Error", "Failed to load game situations")
      setLoading(false)
    }
  }

  const handleSituationSelect = (situation: GameSituation) => {
    Alert.alert(
      situation.title,
      `${situation.description}\n\nWhat would you do in this situation?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Answer", onPress: () => showSituationQuestion(situation) },
      ],
    )
  }

  const showSituationQuestion = (situation: GameSituation) => {
    // TODO: Navigate to situation detail screen with interactive questions
    Alert.alert(
      "Volleyball IQ Test",
      `Scenario: ${situation.description}\n\nCorrect Answer: ${situation.correctAnswer}\n\nExplanation: ${situation.explanation}`,
    )
  }

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading game situations...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text preset="heading" style={styles.headerTitle}>
          Game Situations
        </Text>
        <Text style={styles.headerSubtitle}>Test your volleyball IQ with real game scenarios</Text>
      </View>

      {/* Situation List */}
      <ScrollView
        style={styles.situationList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.situationListContent}
      >
        {situations.map((situation) => (
          <SituationCard
            key={situation.id}
            situation={situation}
            onSelect={handleSituationSelect}
          />
        ))}
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: BinionTheme.colors.backgroundPrimary,
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: BinionTheme.spacing.lg,
  },
  headerSubtitle: {
    color: BinionTheme.colors.textSecondary,
    fontSize: BinionTheme.typography.sizes.md,
    textAlign: "center",
  },
  headerTitle: {
    color: BinionTheme.colors.textPrimary,
    marginBottom: BinionTheme.spacing.sm,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: BinionTheme.colors.textSecondary,
    fontSize: BinionTheme.typography.sizes.lg,
    fontWeight: "500",
  },
  situationList: {
    flex: 1,
  },
  situationListContent: {
    padding: BinionTheme.spacing.md,
    paddingBottom: BinionTheme.spacing.xxxl,
  },
  situationCard: {
    ...BinionComponents.SituationCard,
    marginBottom: BinionTheme.spacing.lg,
  },
  situationHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: BinionTheme.spacing.md,
  },
  situationTitle: {
    color: BinionTheme.colors.textPrimary,
    flex: 1,
    fontSize: BinionTheme.typography.sizes.xl,
    fontWeight: "700",
    marginRight: BinionTheme.spacing.md,
  },
  difficultyBadge: {
    borderRadius: BinionTheme.borderRadius.sm,
    paddingHorizontal: BinionTheme.spacing.sm,
    paddingVertical: BinionTheme.spacing.xs,
  },
  difficultyText: {
    color: BinionTheme.colors.secondary,
    fontSize: BinionTheme.typography.sizes.xs,
    fontWeight: "700",
  },
  situationInfo: {
    marginBottom: BinionTheme.spacing.md,
  },
  situationDescription: {
    color: BinionTheme.colors.textSecondary,
    fontSize: BinionTheme.typography.sizes.md,
    lineHeight: 22,
    marginBottom: BinionTheme.spacing.md,
  },
  situationDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: BinionTheme.spacing.xs,
  },
  detailLabel: {
    color: BinionTheme.colors.textMuted,
    fontSize: BinionTheme.typography.sizes.sm,
    fontWeight: "500",
    marginRight: BinionTheme.spacing.xs,
  },
  detailValue: {
    color: BinionTheme.colors.textPrimary,
    fontSize: BinionTheme.typography.sizes.sm,
    fontWeight: "600",
    textTransform: "capitalize",
  },
})
