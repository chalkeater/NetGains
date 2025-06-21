import { appSchema, tableSchema } from '@nozbe/watermelondb/Schema'

export const schema = appSchema({
  version: 1,
  tables: [
    // User profile table
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'age', type: 'number' },
        { name: 'skill_level', type: 'string' }, // beginner, intermediate, advanced
        { name: 'position', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),

    // Daily challenges table
    tableSchema({
      name: 'daily_challenges',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'category', type: 'string' }, // serving, passing, setting, attacking, blocking, digging
        { name: 'difficulty_level', type: 'number' }, // 1-5
        { name: 'duration_minutes', type: 'number' },
        { name: 'equipment_needed', type: 'string' },
        { name: 'instructions', type: 'string' },
        { name: 'coaching_points', type: 'string' },
        { name: 'is_partner_required', type: 'boolean' },
        { name: 'created_at', type: 'number' },
      ],
    }),

    // Game situations table
    tableSchema({
      name: 'game_situations',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'category', type: 'string' }, // serve_receive, transition, defense, end_game
        { name: 'difficulty_level', type: 'number' },
        { name: 'scenario_data', type: 'string' }, // JSON string for court positions, player positions
        { name: 'correct_answer', type: 'string' },
        { name: 'explanation', type: 'string' },
        { name: 'created_at', type: 'number' },
      ],
    }),

    // User progress on daily challenges
    tableSchema({
      name: 'challenge_progress',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'challenge_id', type: 'string', isIndexed: true },
        { name: 'completed_at', type: 'number' },
        { name: 'performance_rating', type: 'number', isOptional: true }, // 1-5 stars
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'streak_count', type: 'number' },
      ],
    }),

    // User progress on game situations
    tableSchema({
      name: 'situation_progress',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'situation_id', type: 'string', isIndexed: true },
        { name: 'attempted_at', type: 'number' },
        { name: 'is_correct', type: 'boolean' },
        { name: 'time_taken_seconds', type: 'number', isOptional: true },
        { name: 'selected_answer', type: 'string' },
      ],
    }),

    // Achievements/badges table
    tableSchema({
      name: 'achievements',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'icon', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'criteria', type: 'string' }, // JSON string describing unlock criteria
        { name: 'points', type: 'number' },
        { name: 'created_at', type: 'number' },
      ],
    }),

    // User achievements (unlocked badges)
    tableSchema({
      name: 'user_achievements',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'achievement_id', type: 'string', isIndexed: true },
        { name: 'unlocked_at', type: 'number' },
      ],
    }),

    // Daily stats for tracking improvement
    tableSchema({
      name: 'daily_stats',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'date', type: 'string', isIndexed: true }, // YYYY-MM-DD format
        { name: 'challenges_completed', type: 'number' },
        { name: 'situations_attempted', type: 'number' },
        { name: 'situations_correct', type: 'number' },
        { name: 'total_practice_minutes', type: 'number' },
        { name: 'streak_active', type: 'boolean' },
      ],
    }),
  ],
}) 