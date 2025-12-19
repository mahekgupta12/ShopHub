import React from "react";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type Props = PressableProps & {
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
};

export default function AppPressable({
  style,
  pressedStyle,
  disabled,
  ...props
}: Props) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        style,
        pressed && pressedStyle,
        disabled && { opacity: 0.5 },
      ]}
      {...props}
    />
  );
}
