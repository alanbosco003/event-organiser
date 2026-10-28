import { StyleSheet, View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { spacing } from "../../theme/spacing";
import { CommunitiesField } from "./CommunitiesField";
import { CoverImageField } from "./CoverImageField";
import { FullDescriptionField } from "./FullDescriptionField";
import { InvitesField } from "./InvitesField";
import { ShortDescriptionField } from "./ShortDescriptionField";
import { TitleField } from "./TitleField";
import { VisibilityField } from "./VisibilityField";

export function EventForm() {
  const { values } = useEventForm();

  return (
    <View style={styles.form}>
      <CoverImageField />
      <TitleField />
      <ShortDescriptionField />
      <FullDescriptionField />
      <VisibilityField />
      {values.privacy === "public" ? <CommunitiesField /> : null}
      {values.privacy === "private" ? <InvitesField /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.field,
  },
});
