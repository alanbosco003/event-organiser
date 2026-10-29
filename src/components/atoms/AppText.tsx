import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";

import { styles } from "../../styles/appText";

type Variant = "label" | "meta" | "hint" | "error" | "body" | "button";

type Props = TextProps & {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
};

export function AppText({ variant = "body", style, ...props }: Props) {
  return <Text {...props} style={[styles[variant], style]} />;
}
