import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  accessibilityLabel,
  testID,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: loading, busy: loading }}
      disabled={loading}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        pressed && !loading && styles.pressed,
        loading && styles.loading,
      ]}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
  },
  pressed: {
    backgroundColor: colors.primaryPressed,
  },
  loading: {
    opacity: 0.9,
  },
  label: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "600",
  },
});
