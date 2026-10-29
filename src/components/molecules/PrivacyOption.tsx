import { Pressable, View } from "react-native";

import { styles } from "../../styles/privacyOption";
import { AppText } from "../atoms/AppText";

type Props = {
  title: string;
  subtitle: string;
  selected: boolean;
  error?: boolean;
  onPress: () => void;
  testID?: string;
};

export function PrivacyOption({ title, subtitle, selected, error, onPress, testID }: Props) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${title}. ${subtitle}`}
      onPress={onPress}
      testID={testID}
      style={[styles.card, selected && styles.selected, error && !selected && styles.error]}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.dot} /> : null}
      </View>
      <View style={styles.copy}>
        <AppText variant="label">{title}</AppText>
        <AppText variant="hint">{subtitle}</AppText>
      </View>
    </Pressable>
  );
}
