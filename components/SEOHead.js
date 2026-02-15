import Head from "next/head";
import { siteConfig } from "../utils/seo";

/**
 * Professional SEO Head
 * Handles meta tags, OG, Twitter + JSON-LD
 */
export default function SEOHead({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  schemas = [],
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
}) {
  /* ===============================
     SAFE VALUES
  ============================== */

  const fullTitle = title
    ? `${title} | ${siteConfig.siteName}`
    : siteConfig.defaultTitle;

  const fullDescription =
    description || siteConfig.defaultDescription;

  const fullImage =
    image && image.startsWith("http")
      ? image
      : `${siteConfig.siteUrl}${image || siteConfig.defaultImage}`;

  const fullUrl = url
    ? `${siteConfig.siteUrl}${url}`
    : siteConfig.siteUrl;

  const keywordString =
    keywords?.length > 0 ? keywords.join(", ") : null;

  return (
    <Head>
      {/* ===============================
         PRIMARY SEO
      ============================== */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywordString && (
        <meta name="keywords" content={keywordString} />
      )}

      {/* CANONICAL */}
      <link rel="canonical" href={fullUrl} />

      {/* ROBOTS */}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex,follow"
            : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        }
      />

      {/* ===============================
         OPEN GRAPH (FACEBOOK)
      ============================== */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={siteConfig.locale || "en_US"} />

      {/* ARTICLE META */}
      {publishedTime && (
        <meta
          property="article:published_time"
          content={publishedTime}
        />
      )}
      {modifiedTime && (
        <meta
          property="article:modified_time"
          content={modifiedTime}
        />
      )}
      {author && (
        <meta property="article:author" content={author} />
      )}

      {/* ===============================
         TWITTER SEO
      ============================== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta
        name="twitter:site"
        content={siteConfig.twitterHandle || ""}
      />
      <meta
        name="twitter:creator"
        content={siteConfig.twitterHandle || ""}
      />

      {/* EXTRA META */}
      <meta name="author" content={author || siteConfig.siteName} />
      <meta name="publisher" content={siteConfig.siteName} />
      <meta httpEquiv="content-language" content="en" />

      {/* ===============================
         JSON-LD STRUCTURED DATA
      ============================== */}
      {schemas?.length > 0 &&
        schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
    </Head>
  );
}
