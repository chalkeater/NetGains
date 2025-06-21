// McArthur Binion-inspired theme for Net Gains volleyball app
// Incorporating geometric grids, layered textures, and personal narrative elements

export const BinionTheme = {
  colors: {
    // Base colors inspired by Binion's palette
    primary: "#1a1a1a", // Deep charcoal for grid lines
    secondary: "#f5f5f5", // Off-white for background documents
    accent: "#e74c3c", // Volleyball red for highlights

    // Grid colors
    gridPrimary: "#2c2c2c", // Dark grid lines
    gridSecondary: "#404040", // Lighter grid overlay
    gridAccent: "#666666", // Subtle grid highlight

    // Background layers (representing personal documents)
    backgroundPrimary: "#fafafa", // Main background
    backgroundSecondary: "#f0f0f0", // Secondary layer
    backgroundTertiary: "#e8e8e8", // Tertiary layer

    // Text colors
    textPrimary: "#1a1a1a", // Main text
    textSecondary: "#4a4a4a", // Secondary text
    textAccent: "#e74c3c", // Accent text
    textMuted: "#8a8a8a", // Muted text

    // Volleyball-specific colors
    court: "#d4af37", // Court/sand color
    net: "#2c2c2c", // Net color
    ball: "#f8f8f8", // Volleyball color

    // Achievement colors
    gold: "#ffd700",
    silver: "#c0c0c0",
    bronze: "#cd7f32",

    // Status colors
    success: "#27ae60",
    warning: "#f39c12",
    error: "#e74c3c",
    info: "#3498db",
  },

  spacing: {
    // Grid-based spacing system
    grid: 8, // Base grid unit
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  typography: {
    // Font weights mimicking hand-drawn quality
    weights: {
      light: "300" as const,
      regular: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
    },

    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      huge: 48,
    },
  },

  gridPatterns: {
    // Inspired by Binion's geometric grid patterns
    fine: {
      size: 2,
      opacity: 0.1,
      color: "#2c2c2c",
    },
    medium: {
      size: 4,
      opacity: 0.15,
      color: "#404040",
    },
    bold: {
      size: 8,
      opacity: 0.2,
      color: "#666666",
    },
  },

  shadows: {
    // Subtle shadows for layered effect
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999,
  },

  animation: {
    // Smooth transitions for interactive elements
    duration: {
      fast: 150,
      normal: 250,
      slow: 400,
    },
    easing: {
      easeInOut: "ease-in-out",
      easeOut: "ease-out",
      easeIn: "ease-in",
    },
  },

  layout: {
    // Grid-based layout system
    container: {
      maxWidth: 1200,
      padding: 16,
    },
    card: {
      padding: 16,
      margin: 8,
      backgroundColor: "#fafafa",
      borderRadius: 8,
    },
  },
}

// Component-specific styles inspired by Binion's aesthetic
export const BinionComponents = {
  GridOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    pointerEvents: "none" as const,
  },

  DocumentLayer: {
    backgroundColor: BinionTheme.colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: BinionTheme.colors.gridSecondary,
    borderRadius: BinionTheme.borderRadius.md,
    padding: BinionTheme.spacing.md,
    position: "relative" as const,
  },

  HandDrawnBorder: {
    borderWidth: 2,
    borderColor: BinionTheme.colors.gridPrimary,
    borderStyle: "solid" as const,
    // Simulate hand-drawn irregularity with subtle variations
  },

  ProgressGrid: {
    display: "flex" as const,
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: BinionTheme.spacing.sm,
  },

  AchievementBadge: {
    backgroundColor: BinionTheme.colors.accent,
    borderRadius: BinionTheme.borderRadius.round,
    padding: BinionTheme.spacing.sm,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    minWidth: 48,
    minHeight: 48,
  },

  StatCard: {
    ...BinionTheme.layout.card,
    borderWidth: 1,
    borderColor: BinionTheme.colors.gridSecondary,
    position: "relative" as const,
  },

  ChallengeCard: {
    backgroundColor: BinionTheme.colors.backgroundPrimary,
    borderRadius: BinionTheme.borderRadius.lg,
    padding: BinionTheme.spacing.lg,
    marginBottom: BinionTheme.spacing.md,
    borderWidth: 1,
    borderColor: BinionTheme.colors.gridSecondary,
    position: "relative" as const,
  },

  SituationCard: {
    backgroundColor: BinionTheme.colors.backgroundSecondary,
    borderRadius: BinionTheme.borderRadius.lg,
    padding: BinionTheme.spacing.lg,
    marginBottom: BinionTheme.spacing.md,
    borderWidth: 2,
    borderColor: BinionTheme.colors.gridPrimary,
    position: "relative" as const,
  },
}

// Grid pattern generators
export const createGridPattern = (size: number, opacity: number, color: string) => ({
  width: "100%",
  height: "100%",
  position: "absolute" as const,
  top: 0,
  left: 0,
  opacity,
  backgroundImage: `
    linear-gradient(${color} 1px, transparent 1px),
    linear-gradient(90deg, ${color} 1px, transparent 1px)
  `,
  backgroundSize: `${size}px ${size}px`,
  pointerEvents: "none" as const,
})

// Utility functions for Binion-inspired styling
export const BinionUtils = {
  // Create layered background effect
  createDocumentLayer: (depth: number = 0) => ({
    backgroundColor:
      depth === 0
        ? BinionTheme.colors.backgroundPrimary
        : depth === 1
          ? BinionTheme.colors.backgroundSecondary
          : BinionTheme.colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: BinionTheme.colors.gridSecondary,
    transform: [{ translateX: depth * 2 }, { translateY: depth * 2 }],
  }),

  // Create hand-drawn effect with subtle variations
  createHandDrawnBorder: (irregularity: number = 0.5) => ({
    borderWidth: 2,
    borderColor: BinionTheme.colors.gridPrimary,
    borderRadius: BinionTheme.borderRadius.md + (Math.random() - 0.5) * irregularity,
  }),

  // Create grid overlay
  createGridOverlay: (intensity: "fine" | "medium" | "bold" = "medium") => {
    const pattern = BinionTheme.gridPatterns[intensity]
    return createGridPattern(pattern.size, pattern.opacity, pattern.color)
  },
}
