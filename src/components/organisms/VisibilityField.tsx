import { View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { styles } from "../../styles/visibilityField";
import { FieldError } from "../atoms/FieldError";
import { FieldHeader } from "../molecules/FieldHeader";
import { PrivacyOption } from "../molecules/PrivacyOption";

export function VisibilityField() {
  const { values, errors, setPrivacy } = useEventForm();

  return (
    <View>
      <FieldHeader label="Who can see this event?" meta="required" />
      <View style={styles.row}>
        <PrivacyOption
          title="Public"
          subtitle="Anyone can find it"
          selected={values.privacy === "public"}
          error={Boolean(errors.privacy)}
          onPress={() => setPrivacy("public")}
          testID="privacy-public"
        />
        <PrivacyOption
          title="Private"
          subtitle="Invited people only"
          selected={values.privacy === "private"}
          error={Boolean(errors.privacy)}
          onPress={() => setPrivacy("private")}
          testID="privacy-private"
        />
      </View>
      {errors.privacy ? <FieldError message={errors.privacy} /> : null}
    </View>
  );
}
