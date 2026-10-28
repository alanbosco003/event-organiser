import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";

import { colors } from "../../theme/colors";

type Variant = "label" | "meta" | "hint" | "error" | "body" | "button";

type Props = TextProps & {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
};

export function AppText({ variant = "body", style, ...props }: Props) {
  return <Text {...props} style={[styles[variant], style]} />;
}

const styles = {
  label: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700" as const,
    color: colors.text,
  },
  meta: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400" as const,
    color: colors.textSecondary,
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  error: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: colors.danger,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  button: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600" as const,
    color: colors.text,
  },
};
