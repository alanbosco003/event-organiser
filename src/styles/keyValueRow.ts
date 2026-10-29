import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  label: {
    color: colors.textSecondary,
  },
  value: {
    flexShrink: 1,
    textAlign: "right",
  },
});
