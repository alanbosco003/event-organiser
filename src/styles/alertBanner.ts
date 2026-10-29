import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import { radius } from "../theme/spacing";

export const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 18,
  },
  title: {
    color: colors.danger,
    marginBottom: 2,
  },
  body: {
    color: colors.danger,
  },
});
