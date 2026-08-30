import Image from "next/image";
import { classNames } from "@/lib/utils";

/**
 * Portrait plate. Uses next/image so the browser receives a correctly sized
 * WebP/AVIF instead of the 1024px source, lazily, with dimensions reserved
 * up front so nothing shifts as it lands.
 */
export function Plate({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={classNames("duotone object-cover", imgClassName, className)}
    />
  );
}
