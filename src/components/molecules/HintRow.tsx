import { View } from "react-native";

import { styles } from "../../styles/hintRow";
import { AppText } from "../atoms/AppText";

type Props = {
  hint: string;
  count?: string;
};

export function HintRow({ hint, count }: Props) {
  return (
    <View style={styles.row}>
      <AppText variant="hint" style={styles.hint}>
        {hint}
      </AppText>
      {count ? <AppText variant="hint">{count}</AppText> : null}
    </View>
  );
}
