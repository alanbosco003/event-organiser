import { View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { LIMITS } from "../../validation/limits";
import { FieldError } from "../atoms/FieldError";
import { TextField } from "../atoms/TextField";
import { FieldHeader } from "../molecules/FieldHeader";
import { HintRow } from "../molecules/HintRow";

export function ShortDescriptionField() {
  const { values, errors, setShortDescription } = useEventForm();
  const max = LIMITS.shortDescription.max;

  return (
    <View>
      <FieldHeader label="Short description" meta="required" />
      <TextField
        value={values.shortDescription}
        onChangeText={setShortDescription}
        placeholder="One or two lines shown in event lists"
        maxLength={max}
        multiline
        minHeight={88}
        error={Boolean(errors.shortDescription)}
        accessibilityLabel="Short description, required"
        accessibilityHint="Only English allowed. Letters, numbers, and basic punctuation. 10 to 150 characters."
        testID="field-short-description"
        autoCapitalize="sentences"
      />
      <HintRow
        hint="Only English allowed · 10–150 characters"
        count={`${values.shortDescription.length} / ${max}`}
      />
      {errors.shortDescription ? <FieldError message={errors.shortDescription} /> : null}
    </View>
  );
}
