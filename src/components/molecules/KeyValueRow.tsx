import { StyleSheet, View } from "react-native";

import { colors } from "../../theme/colors";
import { AppText } from "../atoms/AppText";

type Props = {
  label: string;
  value: string;
};

export function KeyValueRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <AppText variant="body" style={styles.label}>
        {label}
      </AppText>
      <AppText variant="label" style={styles.value}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
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
