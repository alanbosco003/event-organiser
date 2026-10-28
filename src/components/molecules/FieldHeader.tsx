import { StyleSheet } from "react-native";

import { AppText } from "../atoms/AppText";

type Props = {
  label: string;
  meta: string;
};

export function FieldHeader({ label, meta }: Props) {
  return (
    <AppText variant="label" style={styles.header}>
      {label}
      <AppText variant="meta"> ({meta})</AppText>
    </AppText>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 8,
  },
});
