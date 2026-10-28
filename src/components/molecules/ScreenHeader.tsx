import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

type Props = {
  title: string;
  leftLabel?: string;
  onLeftPress?: () => void;
};

export function ScreenHeader({ title, leftLabel, onLeftPress }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {leftLabel && onLeftPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={leftLabel}
          hitSlop={8}
          onPress={onLeftPress}
          style={styles.left}
        >
          <Text style={styles.leftLabel}>{leftLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 52,
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  title: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },
  left: {
    position: "absolute",
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  leftLabel: {
    fontSize: 17,
    color: colors.primary,
  },
});
