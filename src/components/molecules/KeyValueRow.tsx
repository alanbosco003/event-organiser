import { View } from "react-native";

import { styles } from "../../styles/keyValueRow";
import { AppText } from "../atoms/AppText";

type Props = {
  label: string;
  value: string;
};

export function KeyValueRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <AppText variant="body" style={styles.label}>
        {label}
      </AppText>
      <AppText variant="label" style={styles.value}>
        {value}
      </AppText>
    </View>
  );
}
