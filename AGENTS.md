<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The sales-page hero stacks text above the photo on mobile (photo anchored to the section base, its top dissolved into the paper colour) and keeps Rosa on the right of the text on desktop, because she must stay visible without covering the copy at any width.
- Every colour is a semantic token declared twice in `src/styles.css` (`:root` value + `@theme inline` `--color-<name>`); components use `text-*`/`border-*` utilities and never hex literals, so the paper/ink identity survives any future theme change.
