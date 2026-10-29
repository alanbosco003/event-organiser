import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { styles } from "../../styles/communityRow";
import { colors } from "../../theme/colors";
import { AppText } from "../atoms/AppText";

type Props = {
  name: string;
  members: string;
  checked: boolean;
  onPress: () => void;
  last?: boolean;
};

export function CommunityRow({ name, members, checked, onPress, last }: Props) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={`${name}, ${members} members`}
      onPress={onPress}
      style={[styles.row, !last && styles.divider]}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Ionicons name="checkmark" size={14} color={colors.white} /> : null}
      </View>
      <AppText variant="body" style={styles.name}>
        {name}
      </AppText>
      <AppText variant="hint">{members}</AppText>
    </Pressable>
  );
}
