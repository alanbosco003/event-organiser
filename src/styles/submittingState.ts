import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 48,
  },
  label: {
    color: colors.textSecondary,
    textAlign: "center",
  },
});
