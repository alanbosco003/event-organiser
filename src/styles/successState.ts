import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingTop: 36,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.successSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 18,
    fontSize: 28,
    lineHeight: 34,
  },
  message: {
    marginTop: 8,
    textAlign: "center",
    color: colors.textSecondary,
  },
  rows: {
    alignSelf: "stretch",
    marginTop: 28,
  },
});
