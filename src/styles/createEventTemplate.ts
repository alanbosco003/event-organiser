import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: "center",
  },
  column: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  flex: {
    flex: 1,
    minHeight: 0,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: 28,
  },
  submitting: {
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: 12,
    gap: 10,
    backgroundColor: colors.background,
    zIndex: 2,
  },
});
