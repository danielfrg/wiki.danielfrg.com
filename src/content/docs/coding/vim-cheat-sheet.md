---
title: "VIM: Cheat Sheet"
---

I started with:

## The basics

- Movement `h` - `j` - `k` -`l`

Hard mode:

```lua
map('n', '<left>', '<cmd>echo "Use h to move!"<CR>')
map('n', '<right>', '<cmd>echo "Use l to move!"<CR>')
map('n', '<up>', '<cmd>echo "Use k to move!"<CR>')
map('n', '<down>', '<cmd>echo "Use j to move!"<CR>')
```

- Insert `i` and `a`. Also with capital to beginning and end of line `I` `A`
- `o` new line below and go in insert mode
- `O` new line above and go in insert mode

- Activate relative line numbers and use counts: `C<hjkl>`

- `w` word forwards and `b` word backwards

- `d` delete

  1. Combine with words: `dw`
  2. Combine with movement `5dj`

- `y` to yank/copy and `p` to past

- `ciw` [c]hange [i]nner [w]ord
- `ciW` [c]hange [i]nner [W](contiguous piece of text)

Stop here. Spend a lot of time just on these. Don’t do more for min 2 weeks.

## Horizontal movements

These took me a while to get used to, more than vertical movements.

- `_`/`0` beginning of line, `$` end of line
- `f<char>` [f]orward to the character
- `t<char>` forward to just **before** the character
- `F<char>` backwards to the character
- `T<char>` backwards to just **before** the character
- For all `f` and `t`: `;` next one - `,` previous one

Combinations:

- `dt"`: [d]elete un[t]il ["]
- `vt$`: [d]elete un[t]il ["]

## Vertical movements

Move quickly:

- `<C-d`> half page up and `<C-u>` help page up

```lua
-- better move page up and down (keep cursor in the middle)
map("n", "<C-d>", "<C-d>zz")
map("n", "<C-u>", "<C-u>zz")
```

- `G` all the way to the bottom `gg` all the way top

  - I usually confuse them

- `/` search forward `?` search backwards
  - Move to `n` next and `N` previous

```lua
-- Remove search highlights
map("n", "<Esc>", ":noh<return><esc>")
map("n", "<C-c>", ":noh<return><esc>")
```

- `*` on top of a word makes it search that word forwards and `#` backwards.
  Just do `*` and `N` to go backwards

## Advanced

- Select inside something
  - Select a word `viw` - You can be anywhere in the word
  - Select everything inside `{}` = `vi{`
  - Select everything inside `{}` (including them)= `va{`
  - Works with yank as well: `yi{` Copy everything inside `{}`
- `o` in Visual mode toggles the position from top to bottom
