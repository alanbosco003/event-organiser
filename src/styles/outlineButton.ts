import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import { radius } from "../theme/spacing";

export const styles = StyleSheet.create({
  button: {
    minHeight: 40,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  large: {
    minHeight: 52,
    borderRadius: radius.md,
  },
  danger: {
    borderColor: colors.dangerBorder,
  },
  pressed: {
    backgroundColor: colors.mutedSurface,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  dangerLabel: {
    color: colors.danger,
  },
});
