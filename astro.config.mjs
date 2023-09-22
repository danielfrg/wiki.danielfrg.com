import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "danielfrg wiki",
      social: {
        github: "https://github.com/danielfrg/wiki.danielfrg.com",
        twitter: "https://twitter.com/danielfrg",
      },
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://www.googletagmanager.com/gtag/js?id=G-QJX79Z48KP",
            defer: true,
          },
        },
        {
          tag: "script",
          attrs: {
            src: "https://www.googletagmanager.com/gtag/js?id=G-QJX79Z48KP",
            defer: true,
          },
        },
        {
          tag: "script",
          attrs: {
            content: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-QJX79Z48KP');`,
            defer: true,
          },
        },
      ],
      sidebar: [
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
