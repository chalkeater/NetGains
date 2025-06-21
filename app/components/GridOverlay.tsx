import { View, StyleSheet } from "react-native"
import { BinionTheme } from "../theme/binion-theme"

interface GridOverlayProps {
  intensity?: "fine" | "medium" | "bold"
}

export const GridOverlay: React.FC<GridOverlayProps> = ({ intensity = "medium" }) => {
  const pattern = BinionTheme.gridPatterns[intensity]

  return (
    <View style={[styles.overlay, { opacity: pattern.opacity }]} pointerEvents="none">
      {/* Simple grid representation using borders */}
      <View style={[styles.grid, { borderColor: pattern.color }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  grid: {
    flex: 1,
    borderWidth: 0.5,
    borderStyle: "solid",
    // This creates a subtle grid effect
  },
})
