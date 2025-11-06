// src/types/imagetools.d.ts



// If you want nicer types for specific "as=" variants, keep ONE star total:
declare module '*as=picture' {
  const picture: {
    img: { src: string; srcset?: string };
    sources: { avif?: string; webp?: string; jpeg?: string };
  };
  export default picture;
}

declare module '*as=meta' {
  const meta: { src: string; srcset?: string; width?: number; height?: number };
  export default meta;
}

declare module '*as=base64' {
  const s: string;
  export default s;
}
