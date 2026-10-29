import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: colors.text,
  },
  meta: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
    color: colors.textSecondary,
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  error: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: colors.danger,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  button: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    color: colors.text,
  },
});
