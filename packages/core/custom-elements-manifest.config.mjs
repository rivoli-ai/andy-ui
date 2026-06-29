// Generate a clean manifest for Storybook docs: keep only public fields, plus
// each component's events/slots/attributes/CSS. Drops internal members (private
// `#…`, protected helpers, methods) so the autodocs "Properties" table only
// lists the public API.
export default {
  globs: ["src/**/*.ts"],
  outdir: "dist",
  litelement: true,
  plugins: [
    {
      name: "andy-prune-internals",
      moduleLinkPhase({ moduleDoc }) {
        for (const decl of moduleDoc.declarations ?? []) {
          if (!decl.members) continue;
          decl.members = decl.members.filter(
            (m) =>
              m.kind === "field" &&
              m.privacy !== "private" &&
              m.privacy !== "protected" &&
              !m.name.startsWith("#") &&
              !m.name.startsWith("_")
          );
        }
      },
    },
  ],
};
