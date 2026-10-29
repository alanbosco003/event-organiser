import { View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { styles } from "../../styles/eventForm";
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
      {/* Hide the other section. Its draft stays in state until the form is cleared. */}
      {values.privacy === "public" ? <CommunitiesField /> : null}
      {values.privacy === "private" ? <InvitesField /> : null}
    </View>
  );
}
