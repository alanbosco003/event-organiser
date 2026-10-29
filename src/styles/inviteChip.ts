import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import { radius } from "../theme/spacing";

export const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.chip,
    paddingLeft: 12,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  email: {
    flex: 1,
    fontSize: 15,
  },
});
