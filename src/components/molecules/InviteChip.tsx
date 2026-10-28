import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";
import { AppText } from "../atoms/AppText";

type Props = {
  email: string;
  onRemove: () => void;
};

export function InviteChip({ email, onRemove }: Props) {
  return (
    <View style={styles.chip}>
      <AppText variant="body" style={styles.email}>
        {email}
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove ${email}`}
        hitSlop={8}
        onPress={onRemove}
      >
        <Ionicons name="close" size={18} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.chip,
    paddingLeft: 12,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  email: {
    flex: 1,
    fontSize: 15,
  },
});
