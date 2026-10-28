import { View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { LIMITS } from "../../validation/limits";
import { FieldError } from "../atoms/FieldError";
import { TextField } from "../atoms/TextField";
import { FieldHeader } from "../molecules/FieldHeader";
import { HintRow } from "../molecules/HintRow";

export function FullDescriptionField() {
  const { values, errors, setFullDescription } = useEventForm();
  const max = LIMITS.fullDescription.max;

  return (
    <View>
      <FieldHeader label="Full description" meta="required" />
      <TextField
        value={values.fullDescription}
        onChangeText={setFullDescription}
        placeholder="Details, what to bring, where to meet..."
        maxLength={max}
        multiline
        minHeight={110}
        error={Boolean(errors.fullDescription)}
        accessibilityLabel="Full description, required"
        accessibilityHint="Any language. At least 20 characters."
        testID="field-full-description"
        autoCapitalize="sentences"
      />
      <HintRow
        hint="Any language · 20–2000 characters"
        count={`${values.fullDescription.length} / ${max}`}
      />
      {errors.fullDescription ? <FieldError message={errors.fullDescription} /> : null}
    </View>
  );
}
