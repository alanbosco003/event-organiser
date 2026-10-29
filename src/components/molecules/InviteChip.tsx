import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { styles } from "../../styles/inviteChip";
import { colors } from "../../theme/colors";
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
