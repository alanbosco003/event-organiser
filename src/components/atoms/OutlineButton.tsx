import { Pressable, Text } from "react-native";

import { styles } from "../../styles/outlineButton";

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
