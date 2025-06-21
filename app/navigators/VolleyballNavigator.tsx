import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ComponentProps } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BinionTheme } from "../theme/binion-theme"
import { DailyChallengesScreen } from "../screens/DailyChallengesScreen"
import { GameSituationScreen } from "../screens/GameSituationScreen"

export type VolleyballTabParamList = {
  DailyChallenges: undefined
  GameSituations: undefined
  Progress: undefined
}

const Tab = createBottomTabNavigator<VolleyballTabParamList>()

export function VolleyballNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            height: bottom + 70,
            backgroundColor: BinionTheme.colors.backgroundPrimary,
            borderTopWidth: 1,
            borderTopColor: BinionTheme.colors.gridSecondary,
          },
        ],
        tabBarItemStyle: {
          paddingTop: 12,
          paddingBottom: 4,
        },
        tabBarActiveTintColor: BinionTheme.colors.accent,
        tabBarInactiveTintColor: BinionTheme.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: BinionTheme.typography.sizes.xs,
          fontWeight: "600",
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="DailyChallenges"
        component={DailyChallengesScreen}
        options={{
          tabBarLabel: "Challenges",
          tabBarIcon: ({ color, size }) => <TabIcon icon="🏐" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="GameSituations"
        component={GameSituationScreen}
        options={{
          tabBarLabel: "Game IQ",
          tabBarIcon: ({ color, size }) => <TabIcon icon="🧠" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarLabel: "Progress",
          tabBarIcon: ({ color, size }) => <TabIcon icon="📊" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

// Simple icon component using emoji
const TabIcon = ({ icon, color, size }: { icon: string; color: string; size: number }) => {
  const { Text } = require("../components")
  return (
    <Text
      style={{
        fontSize: size,
        lineHeight: size * 1.2, // Add proper line height for emoji
        color: color,
        opacity: 0.8,
        textAlign: "center",
      }}
    >
      {icon}
    </Text>
  )
}

// Placeholder Progress Screen
const ProgressScreen = () => {
  const { Text } = require("../components")
  const { View, StyleSheet } = require("react-native")
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + BinionTheme.spacing.lg }]}>
        <Text preset="heading" style={styles.headerTitle}>
          Progress
        </Text>
        <Text style={styles.headerSubtitle}>Track your volleyball improvement</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.comingSoon}>Coming Soon!</Text>
        <Text style={styles.description}>
          View your training stats, achievement badges, and skill progression charts.
        </Text>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: BinionTheme.colors.backgroundPrimary,
  },
  header: {
    alignItems: "center",
    padding: BinionTheme.spacing.lg,
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: BinionTheme.spacing.lg,
  },
  comingSoon: {
    fontSize: BinionTheme.typography.sizes.xxl,
    fontWeight: "700",
    color: BinionTheme.colors.accent,
    marginBottom: BinionTheme.spacing.md,
  },
  description: {
    fontSize: BinionTheme.typography.sizes.md,
    color: BinionTheme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
}
