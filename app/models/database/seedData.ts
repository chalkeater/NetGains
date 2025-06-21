import { database, getCollections } from "./index"

// Sample daily challenges data
const dailyChallenges = [
  // Serving challenges
  {
    title: "Target Serving",
    description: "Develop serving accuracy with target practice",
    category: "serving",
    difficultyLevel: 1,
    durationMinutes: 15,
    equipmentNeeded: "Volleyball, targets (cones, towels, or markers)",
    instructions:
      "Set up 6 targets in different areas of the court. Serve 20 balls, aiming for different targets each time. Score 1 point for hitting within 3 feet of target.",
    coachingPoints:
      "Keep your toss consistent, contact the ball at the highest point, follow through towards your target",
    isPartnerRequired: false,
  },
  {
    title: "Consistency Challenge",
    description: "Build serving consistency under pressure",
    category: "serving",
    difficultyLevel: 2,
    durationMinutes: 20,
    equipmentNeeded: "Volleyball",
    instructions:
      "Serve 15 balls in a row. If you miss the court, start over. Goal is to get 15 consecutive serves in bounds.",
    coachingPoints:
      "Focus on rhythm and routine. Take your time between serves. Breathe and reset after each serve.",
    isPartnerRequired: false,
  },
  {
    title: "Power Serve Development",
    description: "Increase serving power and speed",
    category: "serving",
    difficultyLevel: 3,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball, measuring tape",
    instructions:
      "Practice jump serves or top-spin serves. Focus on arm swing speed and contact point. Measure distance and track improvement.",
    coachingPoints: "Use your legs for power, snap your wrist on contact, aim for topspin rotation",
    isPartnerRequired: false,
  },

  // Passing challenges
  {
    title: "Wall Passing",
    description: "Improve passing accuracy and control",
    category: "passing",
    difficultyLevel: 1,
    durationMinutes: 15,
    equipmentNeeded: "Volleyball, wall",
    instructions:
      "Stand 6 feet from wall. Pass ball to wall, let it bounce once, then pass again. Count consecutive passes. Goal: 25 in a row.",
    coachingPoints: "Platform stays steady, angle arms to target, use legs for power",
    isPartnerRequired: false,
  },
  {
    title: "Partner Passing",
    description: "Develop passing accuracy with a partner",
    category: "passing",
    difficultyLevel: 2,
    durationMinutes: 20,
    equipmentNeeded: "Volleyball",
    instructions:
      "Stand 15 feet apart. Pass ball back and forth without letting it hit the ground. Count consecutive passes. Goal: 50 in a row.",
    coachingPoints:
      "Communicate with your partner, get to the ball early, pass to your partner's chest",
    isPartnerRequired: true,
  },
  {
    title: "Moving Passes",
    description: "Practice passing while moving",
    category: "passing",
    difficultyLevel: 3,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball, cones",
    instructions:
      "Set up cones in a square. Move around cones while passing ball to yourself. Complete 3 rounds without dropping.",
    coachingPoints: "Stay low, move feet quickly, keep platform steady while moving",
    isPartnerRequired: false,
  },

  // Setting challenges
  {
    title: "Wall Setting",
    description: "Develop setting touch and accuracy",
    category: "setting",
    difficultyLevel: 1,
    durationMinutes: 15,
    equipmentNeeded: "Volleyball, wall",
    instructions:
      "Stand arms length from wall. Set ball to wall repeatedly. Goal: 30 consecutive sets with good form.",
    coachingPoints: "Use fingertips, create window with hands, push ball up and forward",
    isPartnerRequired: false,
  },
  {
    title: "Target Setting",
    description: "Improve setting accuracy to specific targets",
    category: "setting",
    difficultyLevel: 2,
    durationMinutes: 20,
    equipmentNeeded: "Volleyball, targets, partner",
    instructions:
      "Set up targets at different attack positions. Partner tosses ball, you set to specified target. Score based on accuracy.",
    coachingPoints: "Square up to target, consistent hand position, follow through to target",
    isPartnerRequired: true,
  },
  {
    title: "Quick Set Challenge",
    description: "Develop speed and accuracy for quick attacks",
    category: "setting",
    difficultyLevel: 3,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball, partner",
    instructions:
      "Partner delivers passes from different angles. Practice quick sets (1-ball) with speed and accuracy. Time each set.",
    coachingPoints: "Minimize hand movement, release quickly, maintain accuracy under pressure",
    isPartnerRequired: true,
  },

  // Attacking challenges
  {
    title: "Approach Footwork",
    description: "Perfect your attack approach",
    category: "attacking",
    difficultyLevel: 1,
    durationMinutes: 15,
    equipmentNeeded: "Cones or markers",
    instructions:
      "Practice 4-step approach (right-left-right-left for righties). Focus on acceleration and jump timing. Do 20 approaches.",
    coachingPoints:
      "Start slow, accelerate through approach, plant both feet for jump, swing both arms up",
    isPartnerRequired: false,
  },
  {
    title: "Toss and Hit",
    description: "Develop attacking mechanics",
    category: "attacking",
    difficultyLevel: 2,
    durationMinutes: 20,
    equipmentNeeded: "Volleyball",
    instructions:
      "Toss ball to yourself and attack. Focus on contact point and arm swing. Do 30 attacks, varying attack angles.",
    coachingPoints: "Contact ball at highest point, snap wrist, aim for sharp angles",
    isPartnerRequired: false,
  },
  {
    title: "Tool the Block",
    description: "Learn to use the block effectively",
    category: "attacking",
    difficultyLevel: 3,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball, partner or wall",
    instructions:
      "Practice hitting off the blocker's hands. Aim to hit the block and have ball land out of bounds on opponent's side.",
    coachingPoints: "Hit high on block, aim for blocker's outside hand, use wrist snap for angle",
    isPartnerRequired: true,
  },

  // Blocking challenges
  {
    title: "Block Timing",
    description: "Develop proper blocking timing",
    category: "blocking",
    difficultyLevel: 1,
    durationMinutes: 15,
    equipmentNeeded: "Volleyball, wall or partner",
    instructions:
      "Practice block timing against wall or partner. Focus on jumping with the attacker, not before. Do 25 blocks.",
    coachingPoints: "Watch the attacker's approach, jump when they jump, reach over net",
    isPartnerRequired: false,
  },
  {
    title: "Footwork and Positioning",
    description: "Improve blocking footwork and court coverage",
    category: "blocking",
    difficultyLevel: 2,
    durationMinutes: 20,
    equipmentNeeded: "Cones, volleyball",
    instructions:
      "Set up cones at different net positions. Practice moving between positions and blocking. Focus on efficient footwork.",
    coachingPoints: "Use shuffle steps, keep hands up, maintain balance at net",
    isPartnerRequired: false,
  },
  {
    title: "Reading the Attacker",
    description: "Learn to read and react to attacking cues",
    category: "blocking",
    difficultyLevel: 3,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball, partner",
    instructions:
      "Partner attacks from different positions. Focus on reading their approach and hand position to predict attack direction.",
    coachingPoints:
      "Watch attacker's shoulders and hand position, adjust block angle based on set location",
    isPartnerRequired: true,
  },

  // Digging challenges
  {
    title: "Reaction Digs",
    description: "Improve digging reaction time",
    category: "digging",
    difficultyLevel: 1,
    durationMinutes: 15,
    equipmentNeeded: "Volleyball, wall",
    instructions:
      "Stand close to wall. Throw ball hard at wall and dig the rebound. Vary angles and speeds. Do 30 digs.",
    coachingPoints: "Stay low, react quickly, dig ball up and forward",
    isPartnerRequired: false,
  },
  {
    title: "Sprawl Digging",
    description: "Develop diving and sprawling techniques",
    category: "digging",
    difficultyLevel: 2,
    durationMinutes: 20,
    equipmentNeeded: "Volleyball, mats (optional)",
    instructions:
      "Practice diving for balls just out of reach. Focus on safe landing technique. Do 20 dives in each direction.",
    coachingPoints: "Extend with one arm, land on chest/stomach, roll safely, call the ball",
    isPartnerRequired: false,
  },
  {
    title: "Defensive Positioning",
    description: "Learn proper defensive positioning",
    category: "digging",
    difficultyLevel: 3,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball, cones, partner",
    instructions:
      "Set up defensive positions for different attacks. Partner attacks, you position and dig. Focus on reading and positioning.",
    coachingPoints: "Start in ready position, read the set, adjust position based on attack angle",
    isPartnerRequired: true,
  },

  // Combination challenges
  {
    title: "Pass-Set-Attack",
    description: "Combine multiple skills in sequence",
    category: "combination",
    difficultyLevel: 2,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball",
    instructions:
      "Toss ball to yourself, pass to target, set to yourself, then attack. Complete 15 successful sequences.",
    coachingPoints:
      "Maintain tempo, keep ball in front of body, transition smoothly between skills",
    isPartnerRequired: false,
  },
  {
    title: "Serve Receive to Attack",
    description: "Practice game-like serve receive transitions",
    category: "combination",
    difficultyLevel: 3,
    durationMinutes: 30,
    equipmentNeeded: "Volleyball, partner",
    instructions:
      "Partner serves, you receive and transition to attack. Focus on first touch quality and quick transition.",
    coachingPoints: "Platform to target, move quickly after pass, approach with purpose",
    isPartnerRequired: true,
  },

  // Endurance challenges
  {
    title: "Cardio Volleyball",
    description: "Build volleyball-specific endurance",
    category: "endurance",
    difficultyLevel: 2,
    durationMinutes: 20,
    equipmentNeeded: "Volleyball",
    instructions:
      "Continuous rally against wall for 2 minutes, rest 30 seconds. Repeat 5 times. Use different skills each round.",
    coachingPoints: "Maintain good form even when tired, control breathing, stay focused",
    isPartnerRequired: false,
  },
  {
    title: "Suicide Sprints",
    description: "Develop court movement and agility",
    category: "endurance",
    difficultyLevel: 3,
    durationMinutes: 15,
    equipmentNeeded: "Cones or court lines",
    instructions:
      "Sprint to 10-foot line and back, then 20-foot line and back, then end line and back. Rest 90 seconds, repeat 5 times.",
    coachingPoints: "Touch each line, maintain speed throughout, use proper running form",
    isPartnerRequired: false,
  },

  // Mental training challenges
  {
    title: "Pressure Serving",
    description: "Develop mental toughness in pressure situations",
    category: "mental",
    difficultyLevel: 2,
    durationMinutes: 20,
    equipmentNeeded: "Volleyball",
    instructions:
      "Create pressure scenarios. Must make 8/10 serves to 'win the match'. Start over if you fail. Track attempts needed.",
    coachingPoints: "Develop pre-serve routine, focus on process not outcome, stay confident",
    isPartnerRequired: false,
  },
  {
    title: "Visualization Training",
    description: "Practice mental imagery for performance",
    category: "mental",
    difficultyLevel: 1,
    durationMinutes: 15,
    equipmentNeeded: "None",
    instructions:
      "Sit quietly and visualize perfect execution of each skill. See, feel, and hear each movement in detail.",
    coachingPoints:
      "Use all senses in visualization, practice both successful and challenging scenarios",
    isPartnerRequired: false,
  },

  // Specialty challenges
  {
    title: "Libero Skills",
    description: "Focus on defensive specialist skills",
    category: "specialty",
    difficultyLevel: 2,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball, partner",
    instructions:
      "Practice serve receive, digging, and accurate passing. Focus on ball control and court coverage.",
    coachingPoints:
      "Stay low, move feet quickly, pass accurately to target, communicate constantly",
    isPartnerRequired: true,
  },
  {
    title: "Setter Training",
    description: "Develop setter-specific skills",
    category: "specialty",
    difficultyLevel: 3,
    durationMinutes: 30,
    equipmentNeeded: "Volleyball, multiple partners",
    instructions:
      "Practice sets to all positions from different pass locations. Focus on tempo and accuracy.",
    coachingPoints: "Square to target, vary tempo, communicate with hitters, make good decisions",
    isPartnerRequired: true,
  },

  // Recovery and flexibility
  {
    title: "Volleyball Flexibility",
    description: "Improve flexibility for volleyball performance",
    category: "flexibility",
    difficultyLevel: 1,
    durationMinutes: 20,
    equipmentNeeded: "None",
    instructions:
      "Complete volleyball-specific stretching routine. Hold each stretch for 30 seconds, focus on shoulders, hips, and ankles.",
    coachingPoints: "Don't bounce, breathe deeply, stretch both sides equally",
    isPartnerRequired: false,
  },
  {
    title: "Injury Prevention",
    description: "Strengthen areas prone to volleyball injuries",
    category: "strength",
    difficultyLevel: 2,
    durationMinutes: 25,
    equipmentNeeded: "Resistance bands (optional)",
    instructions:
      "Shoulder stability exercises, ankle strengthening, and core work. Focus on volleyball-specific movements.",
    coachingPoints: "Control the movement, focus on quality over quantity, progress gradually",
    isPartnerRequired: false,
  },

  // Advanced challenges
  {
    title: "Advanced Footwork",
    description: "Master complex footwork patterns",
    category: "footwork",
    difficultyLevel: 3,
    durationMinutes: 20,
    equipmentNeeded: "Cones, ladder (optional)",
    instructions:
      "Complex footwork patterns combining lateral movement, backpedaling, and direction changes. Mirror volleyball movements.",
    coachingPoints:
      "Stay light on feet, maintain low center of gravity, focus on efficient movement",
    isPartnerRequired: false,
  },
  {
    title: "Game Situation Reactions",
    description: "React to multiple game scenarios quickly",
    category: "reactions",
    difficultyLevel: 3,
    durationMinutes: 25,
    equipmentNeeded: "Volleyball, partner",
    instructions:
      "Partner calls out random game situations, you must react appropriately (dig, block, attack, etc.). 50 scenarios total.",
    coachingPoints: "React quickly, maintain good form, communicate your actions",
    isPartnerRequired: true,
  },
]

// Sample game situations
const gameSituations = [
  {
    title: "Serve Receive Formation",
    description: "Choose the correct serve receive formation",
    category: "serve_receive",
    difficultyLevel: 1,
    scenarioData: JSON.stringify({
      situation: "Opponent serving from right back position",
      playerPositions: ["LB", "MB", "RB", "LF", "MF", "RF"],
      courtAreas: ["zones1-6"],
    }),
    correctAnswer: "W Formation",
    explanation:
      "W formation provides best coverage for serves to the middle and deep areas of the court.",
  },
  {
    title: "Transition Attack",
    description: "Identify the best attacking option",
    category: "transition",
    difficultyLevel: 2,
    scenarioData: JSON.stringify({
      situation: "Your team digs a ball, setter is in front row",
      options: ["Quick attack", "Outside attack", "Back row attack", "Dump set"],
      blockers: ["Middle blocker ready", "Outside blocker late"],
    }),
    correctAnswer: "Quick attack",
    explanation:
      "With the middle blocker ready but outside blocker late, a quick attack exploits the timing advantage.",
  },
  {
    title: "Defensive Positioning",
    description: "Position your team for the opponent's attack",
    category: "defense",
    difficultyLevel: 2,
    scenarioData: JSON.stringify({
      situation: "Opponent has strong outside hitter attacking from position 4",
      blockOptions: ["Single block", "Double block", "Triple block"],
      backRowOptions: ["Rotation defense", "Perimeter defense", "Middle-back defense"],
    }),
    correctAnswer: "Double block with rotation defense",
    explanation:
      "Double block takes away cross-court attack, rotation defense covers the sharp angle and tip.",
  },
  {
    title: "End Game Strategy",
    description: "Choose the best strategy in a close game",
    category: "end_game",
    difficultyLevel: 3,
    scenarioData: JSON.stringify({
      situation: "Score is 23-24, your team is receiving serve",
      serverStrength: "Strong server",
      teamState: "Nervous energy",
      options: ["Call timeout", "Aggressive receive", "Safe receive", "Substitute"],
    }),
    correctAnswer: "Call timeout",
    explanation:
      "Timeout helps calm nerves, allows coaching, and breaks opponent's serving rhythm.",
  },
  {
    title: "Rotation Coverage",
    description: "Cover the court during rotation",
    category: "serve_receive",
    difficultyLevel: 2,
    scenarioData: JSON.stringify({
      situation: "Your setter is in back row, you need serve receive coverage",
      rotation: "Setter in position 1",
      weakness: "Gap between positions 5 and 6",
    }),
    correctAnswer: "Adjust libero position to cover seam",
    explanation:
      "Libero should shift to cover the seam between positions 5 and 6, most vulnerable area.",
  },
  {
    title: "Out of System Play",
    description: "Decide how to handle a poor pass",
    category: "transition",
    difficultyLevel: 2,
    scenarioData: JSON.stringify({
      situation: "Pass goes to position 2, setter running from position 1",
      attackerOptions: ["Wait for setter", "Emergency set", "Free ball over"],
      timeRemaining: "Limited time",
    }),
    correctAnswer: "Emergency set",
    explanation:
      "When setter can't reach the ball, nearest player should set to keep the offense alive.",
  },
  {
    title: "Blocking Assignment",
    description: "Choose your blocking responsibility",
    category: "defense",
    difficultyLevel: 3,
    scenarioData: JSON.stringify({
      situation: "Opponent has quick attacker and outside attacker approaching",
      yourPosition: "Middle blocker",
      setterTendency: "Usually sets outside",
      ballLocation: "Perfect pass",
    }),
    correctAnswer: "Honor the quick, then transition",
    explanation:
      "Must respect the quick attack first, then transition to help with outside if ball doesn't go quick.",
  },
  {
    title: "Serve Strategy",
    description: "Target the best serving zone",
    category: "serve_receive",
    difficultyLevel: 2,
    scenarioData: JSON.stringify({
      situation: "Opponent has weak passer in position 5",
      alternatives: ["Serve to weak passer", "Serve to seam", "Serve short", "Serve deep"],
      gameState: "Close game",
    }),
    correctAnswer: "Serve to weak passer",
    explanation:
      "Target the weakness to create poor passes that limit opponent's attacking options.",
  },
  {
    title: "Substitution Decision",
    description: "Decide when to substitute",
    category: "end_game",
    difficultyLevel: 3,
    scenarioData: JSON.stringify({
      situation: "Your best attacker is struggling, score is close",
      benchOptions: ["Defensive specialist", "Fresh attacker", "Experienced player"],
      momentum: "Opponent has momentum",
    }),
    correctAnswer: "Fresh attacker",
    explanation: "Fresh legs and confidence can change momentum and provide new attacking threat.",
  },
  {
    title: "Free Ball Handling",
    description: "Organize your team for a free ball",
    category: "transition",
    difficultyLevel: 1,
    scenarioData: JSON.stringify({
      situation: "Opponent sends easy ball over net",
      teamOptions: ["Quick attack", "Run full offense", "Setter dumps", "Safe attack"],
      playerPositions: "All in good position",
    }),
    correctAnswer: "Run full offense",
    explanation:
      "Free ball is best opportunity to run complete offense with multiple attacking options.",
  },
]

// Sample achievements
const achievements = [
  {
    name: "First Serve",
    description: "Complete your first serving challenge",
    icon: "🏐",
    category: "serving",
    criteria: JSON.stringify({ challengesCompleted: 1, category: "serving" }),
    points: 10,
  },
  {
    name: "Ace Machine",
    description: "Complete 10 serving challenges",
    icon: "🎯",
    category: "serving",
    criteria: JSON.stringify({ challengesCompleted: 10, category: "serving" }),
    points: 50,
  },
  {
    name: "Streak Master",
    description: "Maintain a 7-day practice streak",
    icon: "🔥",
    category: "consistency",
    criteria: JSON.stringify({ streakDays: 7 }),
    points: 100,
  },
  {
    name: "Volleyball IQ",
    description: "Answer 20 game situations correctly",
    icon: "🧠",
    category: "game_sense",
    criteria: JSON.stringify({ correctAnswers: 20 }),
    points: 75,
  },
  {
    name: "All-Around Player",
    description: "Complete challenges in all categories",
    icon: "⭐",
    category: "versatility",
    criteria: JSON.stringify({ categoriesCompleted: 6 }),
    points: 150,
  },
]

export const seedDatabase = async () => {
  try {
    const collections = getCollections()

    // Check if data already exists
    const existingChallenges = await collections.dailyChallenges.query().fetchCount()

    if (existingChallenges > 0) {
      console.log("Database already seeded")
      return
    }

    await database.write(async () => {
      // Create daily challenges
      for (const challenge of dailyChallenges) {
        await collections.dailyChallenges.create((record) => {
          record.title = challenge.title
          record.description = challenge.description
          record.category = challenge.category
          record.difficultyLevel = challenge.difficultyLevel
          record.durationMinutes = challenge.durationMinutes
          record.equipmentNeeded = challenge.equipmentNeeded
          record.instructions = challenge.instructions
          record.coachingPoints = challenge.coachingPoints
          record.isPartnerRequired = challenge.isPartnerRequired
          record.createdAt = new Date()
        })
      }

      // Create game situations
      for (const situation of gameSituations) {
        await collections.gameSituations.create((record) => {
          record.title = situation.title
          record.description = situation.description
          record.category = situation.category
          record.difficultyLevel = situation.difficultyLevel
          record.scenarioData = situation.scenarioData
          record.correctAnswer = situation.correctAnswer
          record.explanation = situation.explanation
          record.createdAt = new Date()
        })
      }

      // Create achievements
      for (const achievement of achievements) {
        await collections.achievements.create((record) => {
          record.name = achievement.name
          record.description = achievement.description
          record.icon = achievement.icon
          record.category = achievement.category
          record.criteria = achievement.criteria
          record.points = achievement.points
          record.createdAt = new Date()
        })
      }
    })

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}
