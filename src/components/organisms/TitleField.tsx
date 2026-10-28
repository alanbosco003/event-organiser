import { View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { LIMITS } from "../../validation/limits";
import { FieldError } from "../atoms/FieldError";
import { TextField } from "../atoms/TextField";
import { FieldHeader } from "../molecules/FieldHeader";
import { HintRow } from "../molecules/HintRow";

export function TitleField() {
  const { values, errors, setTitle } = useEventForm();

  return (
    <View>
      <FieldHeader label="Title" meta="required" />
      <TextField
        value={values.title}
        onChangeText={setTitle}
        placeholder="e.g. Sunrise run at Albert Park"
        maxLength={LIMITS.title.max}
        error={Boolean(errors.title)}
        accessibilityLabel="Title, required"
        accessibilityHint="3 to 80 characters. Spaces at the start and end are not counted."
        testID="field-title"
        autoCapitalize="sentences"
        returnKeyType="next"
      />
      <HintRow
        hint="3–80 characters"
        count={`${values.title.length} / ${LIMITS.title.max}`}
      />
      {errors.title ? <FieldError message={errors.title} /> : null}
    </View>
  );
}
