import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  header: {
    height: 52,
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  title: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },
  left: {
    position: "absolute",
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  leftLabel: {
    fontSize: 17,
    color: colors.primary,
  },
});
