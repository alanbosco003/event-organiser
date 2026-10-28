import { StyleSheet, View } from "react-native";

import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";
import { attentionTitle, ATTENTION_BODY } from "../../utils/eventCopy";
import { AppText } from "../atoms/AppText";

type Props = {
  count: number;
};

export function AlertBanner({ count }: Props) {
  return (
    <View style={styles.banner} accessibilityRole="alert" accessibilityLiveRegion="polite">
      <AppText variant="label" style={styles.title}>
        {attentionTitle(count)}
      </AppText>
      <AppText variant="hint" style={styles.body}>
        {ATTENTION_BODY}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
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
