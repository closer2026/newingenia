import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "camera-controls"?: boolean;
          autoplay?: boolean;
          ar?: boolean;
          "auto-rotate"?: boolean;
          "environment-image"?: string;
          "shadow-intensity"?: string;
          exposure?: string;
          "tone-mapping"?: string;
          "camera-orbit"?: string;
          "camera-target"?: string;
          "field-of-view"?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
