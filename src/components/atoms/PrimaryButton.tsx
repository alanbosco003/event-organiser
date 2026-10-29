import { ActivityIndicator, Pressable, Text } from "react-native";

import { styles } from "../../styles/primaryButton";
import { colors } from "../../theme/colors";

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
