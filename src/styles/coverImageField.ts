import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import { radius } from "../theme/spacing";

export const styles = StyleSheet.create({
  empty: {
    minHeight: 156,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C9D0DA",
    borderRadius: radius.lg,
    backgroundColor: colors.mutedSurface,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  permission: {
    backgroundColor: colors.mutedSurface,
  },
  rejected: {
    borderColor: colors.dangerBorder,
    backgroundColor: colors.dangerZone,
  },
  emptyLabel: {
    marginTop: 8,
    fontSize: 15,
  },
  fakeButton: {
    marginTop: 12,
    minHeight: 40,
    paddingHorizontal: 16,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    height: 132,
    width: "100%",
    borderRadius: radius.lg,
    backgroundColor: colors.preview,
  },
  fileRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fileName: {
    flex: 1,
  },
  hint: {
    marginTop: 6,
  },
  settings: {
    alignSelf: "flex-start",
    marginTop: 6,
  },
  settingsLabel: {
    color: colors.primary,
  },
});
