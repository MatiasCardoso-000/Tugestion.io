/// <reference types="vite/client" />
declare module "*" {
  const src: string;
}
// Image file declarations
declare module "*.png" {
  const src: string;
}

declare module "*.jpg" {
  const src: string;
}

declare module "*.jpeg" {
  const src: string;
}

declare module "*.gif" {
  const src: string;
}

declare module "*.svg" {
  const src: string;
}

declare module "*.webp" {
  const src: string;
}
export default src;
