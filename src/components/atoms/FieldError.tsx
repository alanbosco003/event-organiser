import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { colors } from "../../theme/colors";
import { AppText } from "./AppText";

type Props = {
  message: string;
};

export function FieldError({ message }: Props) {
  return (
    <View style={styles.row} accessibilityRole="alert" accessibilityLiveRegion="polite">
      <Ionicons name="alert-circle-outline" size={15} color={colors.danger} />
      <AppText variant="error">{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: 6,
  },
});
