import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#C5CAD3",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  boxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  name: {
    flex: 1,
    fontSize: 15,
  },
});
