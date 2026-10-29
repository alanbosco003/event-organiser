import { ActivityIndicator, View } from "react-native";

import { styles } from "../../styles/submittingState";
import { colors } from "../../theme/colors";
import { AppText } from "../atoms/AppText";

export function SubmittingState() {
  return (
    <View
      style={styles.wrap}
      accessibilityRole="progressbar"
      accessibilityLabel="Creating your event"
      accessibilityLiveRegion="polite"
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <AppText variant="body" style={styles.label}>
        Creating your event
      </AppText>
    </View>
  );
}
