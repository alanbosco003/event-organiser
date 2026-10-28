import { StyleSheet, View } from "react-native";

import { AppText } from "../atoms/AppText";

type Props = {
  hint: string;
  count?: string;
};

export function HintRow({ hint, count }: Props) {
  return (
    <View style={styles.row}>
      <AppText variant="hint" style={styles.hint}>
        {hint}
      </AppText>
      {count ? <AppText variant="hint">{count}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 6,
  },
  hint: {
    flex: 1,
  },
});
