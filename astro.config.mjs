import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://wiki.danielfrg.com",
  integrations: [
    starlight({
      title: "knowledge",
      favicon: "/favicon.ico",
      sidebar: [
        {
          label: "Homelab",
          autogenerate: { directory: "homelab" },
        },
        {
          label: "Reference - Tech",
          autogenerate: { directory: "reference-tech" },
        },
        {
          label: "Coding",
          autogenerate: { directory: "coding" },
        },
      ],
      logo: {
        src: "/public/apple-touch-icon.png",
      },
      social: {
        github: "https://github.com/danielfrg/wiki.danielfrg.com",
        twitter: "https://twitter.com/danielfrg",
      },
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      head: [
        {
          tag: "script",
          content: `
            function loadScript(callback ) {
              console.log('loading script')
              var script = document.createElement( "script" )
              script.type = "text/javascript";
              script.src = "https://unpkg.com/medium-zoom@1.0.8/dist/medium-zoom.min.js";

              script.onload = function() {
                callback();
              };

              document.getElementsByTagName("head")[0].appendChild( script );
            }

            // call the function...
            loadScript(function() {
              console.log('script ready!');
              const images = document.querySelectorAll('.content img');
              console.log(images)
              mediumZoom(images);
            })`,
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
            src: "https://www.googletagmanager.com/gtag/js?id=G-QJX79Z48KP",
            defer: true,
          },
        },
        {
          tag: "script",
          content: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-QJX79Z48KP');`,
        },
      ],
    }),
  ],
});
