import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "../../theme/colors";
import { AppText } from "../atoms/AppText";

type Props = {
  name: string;
  email: string;
  added: boolean;
  onAdd: () => void;
};

export function SavedContactRow({ name, email, added, onAdd }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <AppText variant="label">{name}</AppText>
        <AppText variant="hint">{email}</AppText>
      </View>
      {added ? (
        <AppText variant="button" style={styles.added} accessibilityLabel={`${name} added`}>
          Added
        </AppText>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Add ${name}`}
          hitSlop={8}
          onPress={onAdd}
        >
          <AppText variant="button" style={styles.add}>
            Add
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  add: {
    color: colors.primary,
  },
  added: {
    color: colors.added,
  },
});
