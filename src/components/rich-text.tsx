import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";

type ImageLayoutValue = {
  layout?: "single" | "two" | "three" | "four";
  images?: {
    _key?: string;
    url?: string;
    width?: number;
    height?: number;
    aspectRatio?: number;
    alt?: string;
    caption?: string;
    credit?: string;
  }[];
};

const headingClass = "serif scroll-mt-32 font-normal tracking-[-0.02em] text-[var(--ink)]";
const captionLabels: Record<number, string[]> = {
  2: ["L", "R"],
  3: ["L", "C", "R"],
  4: ["TL", "TR", "BL", "BR"],
};

function textFromChildren(children: unknown): string {
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }

  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  return "";
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className={`${headingClass} mt-16 text-[52px] leading-none`}>{children}</h1>,
    h2: ({ children }) => (
      <h2 id={slugifyHeading(textFromChildren(children))} className={`${headingClass} mt-14 text-[42px] leading-[1.05]`}>
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className={`${headingClass} mt-12 text-[34px] leading-[1.1]`}>{children}</h3>,
    h4: ({ children }) => <h4 className={`${headingClass} mt-10 text-[28px] leading-[1.15]`}>{children}</h4>,
    h5: ({ children }) => <h5 className={`${headingClass} mt-9 text-[22px] leading-[1.2]`}>{children}</h5>,
    h6: ({ children }) => <h6 className="mono mt-8 text-[var(--ink-3)]">{children}</h6>,
    normal: ({ children }) => <p className="my-6 text-[16px] leading-[1.78] text-[var(--ink-2)]">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="serif my-10 border-l border-[var(--ink)] pl-6 text-[30px] leading-[1.25] text-[var(--ink)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-7 list-disc space-y-3 pl-6 text-[16px] leading-[1.7] text-[var(--ink-2)]">{children}</ul>,
    number: ({ children }) => <ol className="my-7 list-decimal space-y-3 pl-6 text-[16px] leading-[1.7] text-[var(--ink-2)]">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");
      return external ? (
        <a href={href} target={value?.blank === false ? undefined : "_blank"} rel="noreferrer" className="underline decoration-[var(--accent)] underline-offset-4">
          {children}
        </a>
      ) : (
        <Link href={href} className="underline decoration-[var(--accent)] underline-offset-4">
          {children}
        </Link>
      );
    },
  },
  types: {
    imageLayout: ({ value }) => <ImageLayout value={value as ImageLayoutValue} />,
  },
};

function ImageLayout({ value }: { value: ImageLayoutValue }) {
  const images = value.images?.filter((image) => image.url) || [];

  if (!images.length) {
    return null;
  }

  const layout = value.layout || "single";
  const gridClass =
    layout === "single"
      ? "grid-cols-1"
      : layout === "two"
        ? "grid-cols-2"
        : layout === "three"
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-2";
  const gapClass = images.length > 1 ? "gap-1.5 md:gap-2" : "gap-4";
  const labels = captionLabels[images.length];
  const captions = images
    .map((image, index) => {
      if (!image.caption) {
        return "";
      }

      return labels?.[index] ? `${labels[index]}: ${image.caption}` : image.caption;
    })
    .filter(Boolean);
  const caption = captions.join(" / ");
  const credit = images
    .map((image) => image.credit)
    .filter(Boolean)
    .filter((item, index, items) => items.indexOf(item) === index)
    .join(" / ");

  return (
    <figure className="my-12 m-0">
      <div className={`grid ${gapClass} ${gridClass}`}>
        {images.map((image, index) => {
          const aspectRatio = image.aspectRatio || (image.width && image.height ? image.width / image.height : 4 / 3);
          const frameClass =
            aspectRatio < 0.85
              ? "aspect-[3/4]"
              : aspectRatio > 1.15
                ? "aspect-[4/3]"
                : "aspect-square";

          return (
          <div key={image._key || image.url || index} className={`relative overflow-hidden bg-[var(--paper-2)] ${frameClass}`}>
            <Image
              src={image.url || ""}
              alt={image.alt || ""}
              fill
              sizes={layout === "single" ? "(max-width: 768px) 100vw, 760px" : "(max-width: 768px) 100vw, 50vw"}
              className="object-cover"
            />
          </div>
          );
        })}
      </div>
      {(caption || credit) && (
        <figcaption className="mono mt-2 text-center text-[var(--ink-3)]">
          {caption}
          {caption && credit ? " / " : ""}
          {credit}
        </figcaption>
      )}
    </figure>
  );
}

export function RichText({ value }: { value?: unknown[] }) {
  if (!value?.length) {
    return null;
  }

  return <PortableText value={value as PortableTextBlock[]} components={components} />;
}
