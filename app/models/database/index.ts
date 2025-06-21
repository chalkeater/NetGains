import { Database } from "@nozbe/watermelondb"
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import { schema } from "./schema"
import {
  User,
  DailyChallenge,
  GameSituation,
  ChallengeProgress,
  SituationProgress,
  Achievement,
  UserAchievement,
  DailyStats,
} from "./models"

// Create SQLite adapter
const adapter = new SQLiteAdapter({
  schema,
  dbName: "NetGainsDB",
  // Optional: Additional configuration
  jsi: true, // Use JSI for better performance (iOS/Android)
  onSetUpError: (error) => {
    console.error("Database setup error:", error)
  },
})

// Create database instance
export const database = new Database({
  adapter,
  modelClasses: [
    User,
    DailyChallenge,
    GameSituation,
    ChallengeProgress,
    SituationProgress,
    Achievement,
    UserAchievement,
    DailyStats,
  ],
})

// Export models for easy access
export {
  User,
  DailyChallenge,
  GameSituation,
  ChallengeProgress,
  SituationProgress,
  Achievement,
  UserAchievement,
  DailyStats,
}

// Helper function to get collections
export const getCollections = () => ({
  users: database.get<User>("users"),
  dailyChallenges: database.get<DailyChallenge>("daily_challenges"),
  gameSituations: database.get<GameSituation>("game_situations"),
  challengeProgress: database.get<ChallengeProgress>("challenge_progress"),
  situationProgress: database.get<SituationProgress>("situation_progress"),
  achievements: database.get<Achievement>("achievements"),
  userAchievements: database.get<UserAchievement>("user_achievements"),
  dailyStats: database.get<DailyStats>("daily_stats"),
})
