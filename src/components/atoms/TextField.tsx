import { useState } from "react";
import { TextInput, type TextInputProps } from "react-native";

import { styles } from "../../styles/textField";
import { colors } from "../../theme/colors";

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
