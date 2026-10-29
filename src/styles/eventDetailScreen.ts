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
  },
  content: {
    padding: spacing.screen,
    paddingBottom: 32,
    gap: 6,
  },
  image: {
    height: 180,
    width: "100%",
    borderRadius: 12,
    backgroundColor: colors.preview,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 4,
  },
  full: {
    marginTop: 8,
  },
  section: {
    marginTop: 18,
  },
  empty: {
    flex: 1,
    padding: spacing.screen,
    justifyContent: "center",
    gap: 16,
  },
  emptyCopy: {
    textAlign: "center",
    color: colors.textSecondary,
  },
});
