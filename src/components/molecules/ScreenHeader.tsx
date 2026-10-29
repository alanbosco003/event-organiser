import { Pressable, Text, View } from "react-native";

import { styles } from "../../styles/screenHeader";

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
