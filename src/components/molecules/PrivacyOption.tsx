import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";
import { AppText } from "../atoms/AppText";

type Props = {
  title: string;
  subtitle: string;
  selected: boolean;
  error?: boolean;
  onPress: () => void;
  testID?: string;
};

export function PrivacyOption({ title, subtitle, selected, error, onPress, testID }: Props) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${title}. ${subtitle}`}
      onPress={onPress}
      testID={testID}
      style={[styles.card, selected && styles.selected, error && !selected && styles.error]}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.dot} /> : null}
      </View>
      <View style={styles.copy}>
        <AppText variant="label">{title}</AppText>
        <AppText variant="hint">{subtitle}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 72,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: colors.white,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.selectedSurface,
  },
  error: {
    borderColor: colors.danger,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#C5CAD3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
});
