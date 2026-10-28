import { useState } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";

type Props = TextInputProps & {
  error?: boolean;
  minHeight?: number;
};

export function TextField({ error = false, minHeight, style, multiline, ...props }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      {...props}
      multiline={multiline}
      placeholderTextColor={colors.placeholder}
      onFocus={(event) => {
        setFocused(true);
        props.onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        props.onBlur?.(event);
      }}
      style={[
        styles.input,
        multiline && styles.multiline,
        minHeight ? { minHeight } : null,
        focused && !error && styles.focused,
        error && styles.error,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },
  multiline: {
    textAlignVertical: "top",
  },
  focused: {
    borderColor: colors.primary,
  },
  error: {
    borderColor: colors.danger,
  },
});
