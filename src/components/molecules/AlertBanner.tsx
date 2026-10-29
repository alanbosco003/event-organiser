import { View } from "react-native";

import { styles } from "../../styles/alertBanner";
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
