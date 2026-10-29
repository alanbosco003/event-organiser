import { styles } from "../../styles/fieldHeader";
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
