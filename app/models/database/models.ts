import { Model } from "@nozbe/watermelondb"
import { field, date, readonly, relation, children } from "@nozbe/watermelondb/decorators"

export class User extends Model {
  static table = "users"

  @field("name") declare name: string
  @field("age") declare age: number
  @field("skill_level") declare skillLevel: string
  @field("position") declare position?: string
  @readonly @date("created_at") declare createdAt: Date
  @readonly @date("updated_at") declare updatedAt: Date

  @children("challenge_progress") declare challengeProgress: any[]
  @children("situation_progress") declare situationProgress: any[]
  @children("user_achievements") declare userAchievements: any[]
  @children("daily_stats") declare dailyStats: any[]
}

export class DailyChallenge extends Model {
  static table = "daily_challenges"

  @field("title") declare title: string
  @field("description") declare description: string
  @field("category") declare category: string
  @field("difficulty_level") declare difficultyLevel: number
  @field("duration_minutes") declare durationMinutes: number
  @field("equipment_needed") declare equipmentNeeded: string
  @field("instructions") declare instructions: string
  @field("coaching_points") declare coachingPoints: string
  @field("is_partner_required") declare isPartnerRequired: boolean
  @readonly @date("created_at") declare createdAt: Date

  @children("challenge_progress") declare progress: any[]
}

export class GameSituation extends Model {
  static table = "game_situations"

  @field("title") declare title: string
  @field("description") declare description: string
  @field("category") declare category: string
  @field("difficulty_level") declare difficultyLevel: number
  @field("scenario_data") declare scenarioData: string
  @field("correct_answer") declare correctAnswer: string
  @field("explanation") declare explanation: string
  @readonly @date("created_at") declare createdAt: Date

  @children("situation_progress") declare progress: any[]

  get scenarioDataParsed() {
    try {
      return JSON.parse(this.scenarioData)
    } catch {
      return {}
    }
  }
}

export class ChallengeProgress extends Model {
  static table = "challenge_progress"

  @field("user_id") declare userId: string
  @field("challenge_id") declare challengeId: string
  @readonly @date("completed_at") declare completedAt: Date
  @field("performance_rating") declare performanceRating?: number
  @field("notes") declare notes?: string
  @field("streak_count") declare streakCount: number

  @relation("users", "user_id") declare user: User
  @relation("daily_challenges", "challenge_id") declare challenge: DailyChallenge
}

export class SituationProgress extends Model {
  static table = "situation_progress"

  @field("user_id") declare userId: string
  @field("situation_id") declare situationId: string
  @readonly @date("attempted_at") declare attemptedAt: Date
  @field("is_correct") declare isCorrect: boolean
  @field("time_taken_seconds") declare timeTakenSeconds?: number
  @field("selected_answer") declare selectedAnswer: string

  @relation("users", "user_id") declare user: User
  @relation("game_situations", "situation_id") declare situation: GameSituation
}

export class Achievement extends Model {
  static table = "achievements"

  @field("name") declare name: string
  @field("description") declare description: string
  @field("icon") declare icon: string
  @field("category") declare category: string
  @field("criteria") declare criteria: string
  @field("points") declare points: number
  @readonly @date("created_at") declare createdAt: Date

  @children("user_achievements") declare userAchievements: any[]

  get criteriaParsed() {
    try {
      return JSON.parse(this.criteria)
    } catch {
      return {}
    }
  }
}

export class UserAchievement extends Model {
  static table = "user_achievements"

  @field("user_id") declare userId: string
  @field("achievement_id") declare achievementId: string
  @readonly @date("unlocked_at") declare unlockedAt: Date

  @relation("users", "user_id") declare user: User
  @relation("achievements", "achievement_id") declare achievement: Achievement
}

export class DailyStats extends Model {
  static table = "daily_stats"

  @field("user_id") declare userId: string
  @field("date") declare date: string
  @field("challenges_completed") declare challengesCompleted: number
  @field("situations_attempted") declare situationsAttempted: number
  @field("situations_correct") declare situationsCorrect: number
  @field("total_practice_minutes") declare totalPracticeMinutes: number
  @field("streak_active") declare streakActive: boolean

  @relation("users", "user_id") declare user: User

  get accuracyPercentage() {
    if (this.situationsAttempted === 0) return 0
    return Math.round((this.situationsCorrect / this.situationsAttempted) * 100)
  }
}
