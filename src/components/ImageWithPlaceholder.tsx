import React, { useState } from "react";
import { Image, ImageProps, ImageSourcePropType } from "react-native";

const placeholder = require("../assets/placeholder_image.png");

type Props = Omit<ImageProps, "source"> & {
  uri?: string | null;
  fallback?: ImageSourcePropType;
};

export default function ImageWithPlaceholder({ uri, fallback, style, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  const source: ImageSourcePropType =
    !uri || failed ? (fallback || placeholder) : ({ uri } as any);

  return (
    <Image
      {...rest}
      source={source}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
