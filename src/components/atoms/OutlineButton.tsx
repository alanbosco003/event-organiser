import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";

type Props = {
  label: string;
  onPress: () => void;
  tone?: "default" | "danger";
  size?: "regular" | "large";
  accessibilityLabel?: string;
  testID?: string;
};

export function OutlineButton({
  label,
  onPress,
  tone = "default",
  size = "regular",
  accessibilityLabel,
  testID,
}: Props) {
  const danger = tone === "danger";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        size === "large" && styles.large,
        danger && styles.danger,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, danger && styles.dangerLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 40,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  large: {
    minHeight: 52,
    borderRadius: radius.md,
  },
  danger: {
    borderColor: colors.dangerBorder,
  },
  pressed: {
    backgroundColor: colors.mutedSurface,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  dangerLabel: {
    color: colors.danger,
  },
});
