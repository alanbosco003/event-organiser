import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import { radius } from "../theme/spacing";

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: radius.lg,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  list: {
    marginTop: 4,
  },
  selected: {
    color: colors.primary,
    marginTop: 4,
    marginBottom: 4,
  },
});
