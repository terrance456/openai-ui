import React from "react";
import "./image-overlay.scss";
import Image, { ImageProps } from "next/image";

export interface ImageOverlayProps extends ImageProps {
  description?: string;
  onClickImage: (index: number) => void;
  index: number;
}

export default function ImageOverlay({ description, index, onClickImage, ...props }: ImageOverlayProps) {
  return (
    <div className="image-overlay-wrapper" onClick={() => onClickImage(index)}>
      <Image {...props} />
      <div className="image-overlay">
        <p>{description}</p>
      </div>
    </div>
  );
}
