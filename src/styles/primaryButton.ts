import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import { radius } from "../theme/spacing";

export const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
  },
  pressed: {
    backgroundColor: colors.primaryPressed,
  },
  loading: {
    opacity: 0.9,
  },
  label: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "600",
  },
});
