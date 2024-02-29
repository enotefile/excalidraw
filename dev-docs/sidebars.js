/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "category",
      label: "Introduction",
      link: {
        type: "doc",
        id: "introduction/get-started",
      },
      items: ["introduction/development", "introduction/contributing"],
    },
    {
      type: "category",
      label: "Codebase",
      items: ["codebase/json-schema", "codebase/frames"],
    },
    {
      type: "category",
      label: "@notud/excalidraw",
      collapsed: false,
      items: [
        "@notud/excalidraw/installation",
        "@notud/excalidraw/integration",
        "@notud/excalidraw/customizing-styles",
        {
          type: "category",
          label: "API",
          link: {
            type: "doc",
            id: "@notud/excalidraw/api/api-intro",
          },
          items: [
            {
              type: "category",
              label: "Props",
              link: {
                type: "doc",
                id: "@notud/excalidraw/api/props/props",
              },
              items: [
                "@notud/excalidraw/api/props/initialdata",
                "@notud/excalidraw/api/props/excalidraw-api",
                "@notud/excalidraw/api/props/render-props",
                "@notud/excalidraw/api/props/ui-options",
              ],
            },
            {
              type: "category",
              label: "Children Components",
              link: {
                type: "doc",
                id: "@notud/excalidraw/api/children-components/children-components-intro",
              },
              items: [
                "@notud/excalidraw/api/children-components/main-menu",
                "@notud/excalidraw/api/children-components/welcome-screen",
                "@notud/excalidraw/api/children-components/sidebar",
                "@notud/excalidraw/api/children-components/footer",
                "@notud/excalidraw/api/children-components/live-collaboration-trigger",
              ],
            },
            {
              type: "category",
              label: "Utils",
              link: {
                type: "doc",
                id: "@notud/excalidraw/api/utils/utils-intro",
              },
              items: [
                "@notud/excalidraw/api/utils/export",
                "@notud/excalidraw/api/utils/restore",
              ],
            },
            "@notud/excalidraw/api/constants",
            "@notud/excalidraw/api/excalidraw-element-skeleton",
          ],
        },
        "@notud/excalidraw/faq",
        "@notud/excalidraw/development",
      ],
    },
    {
      type: "category",
      label: "@excalidraw/mermaid-to-excalidraw",
      link: {
        type: "doc",
        id: "@excalidraw/mermaid-to-excalidraw/installation",
      },
      items: [
        "@excalidraw/mermaid-to-excalidraw/api",
        "@excalidraw/mermaid-to-excalidraw/development",
        {
          type: "category",
          label: "Codebase",
          link: {
            type: "doc",
            id: "@excalidraw/mermaid-to-excalidraw/codebase/codebase",
          },
          items: [
            {
              type: "category",
              label: "How Parser works under the hood?",
              link: {
                type: "doc",
                id: "@excalidraw/mermaid-to-excalidraw/codebase/parser/parser",
              },
              items: [
                "@excalidraw/mermaid-to-excalidraw/codebase/parser/flowchart",
              ],
            },
            "@excalidraw/mermaid-to-excalidraw/codebase/new-diagram-type",
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
