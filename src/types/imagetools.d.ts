// src/types/imagetools.d.ts

// Generic fallback (covers most queries)
declare module '*?imagetools*' {
  const out: any;
  export default out;
}
declare module '*&imagetools*' {
  const out: any;
  export default out;
}

// Precise shapes (nice DX, optional but helpful)
declare module '*as=base64*' {
  const base64: string;
  export default base64;
}

declare module '*as=meta*' {
  export interface ImagetoolsMeta {
    src: string;
    srcset?: string;
    width?: number;
    height?: number;
  }
  const meta: ImagetoolsMeta;
  export default meta;
}

declare module '*as=picture*' {
  export interface ImagetoolsPicture {
    img: { src: string; srcset?: string };
    sources: { avif?: string; webp?: string; jpeg?: string };
  }
  const picture: ImagetoolsPicture;
  export default picture;
}
