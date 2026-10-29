import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import { radius } from "../theme/spacing";

export const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },
  multiline: {
    textAlignVertical: "top",
  },
  focused: {
    borderColor: colors.primary,
  },
  error: {
    borderColor: colors.danger,
  },
});
