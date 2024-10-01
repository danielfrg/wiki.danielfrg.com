---
title: "VIM: Learning journey"
---

Documenting the process of learnig vim after using GUI code editors for 20
years.

Why?

- Learn and control of my tools
- Having my **forever** setup
  - I changed code editor so many times, i don't regret it one bit. I learned
    from all of them but at one point you gotta consolidate

## Start with a distro

I started with a distro: I used Lazy and NVChad (this one looks a lot better).
I used that for good 3-6 months.

It helped me learn enough lua, the plugin system and the core plugins like
Telescope.

Of course the big part was learning the movements. See cheat sheet.

## Go distro less

Eventually I moved to my own config based on
[kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim/blob/master/init.lua)

When I moved out of a distro I **did not** add all the plugins back.
Also decided to change as little of the default keybinding as possible.

- While I use my config on my laptop for 90% of the time (and I configure my
  [dotfiles](https://github.com/danielfrg/dotfiles) on my servers).
  When I have to go to a remote instance or conatiner with plain vim I want to
  be able to be productive on it

Initial set of plugins:

- nvim-treesitter/nvim-treesitter
- nvim-telescope/telescope.nvim
- stevearc/oil.nvim
- folke/which-key.nvim
- colorscheme
- (if tmux): christoomey/vim-tmux-navigator

That's it. Use I used that for 1 or 2 weeks. Yeah, no LSP.

Didn't add tabs. Used Telescope buffer selection to move between buffers.
- This is hard to get used to

## Add LSP

I added an LSP but without Mason to install it.
I installed it manually to learn how that works.

For example in Typescript:

```
npm i -D typescript-language-server
```

Then use `lspconfig`:

```
local lspconfig = require("lspconfig")

lspconfig.ts_ls.setup {}
```

And add a simple indicator to the statusline to show the running LSP.

Also added simple formatting using `conform`

## A couple of extra plugins

To have more quality of life and navigation:

- "folke/flash.nvim"
- "mini.align"
- "mini.pairs"
- "mini.surround"
- "mini.bracketed"
