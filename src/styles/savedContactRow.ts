import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  add: {
    color: colors.primary,
  },
  added: {
    color: colors.added,
  },
});
