---
title: "VIM: Learning journey"
---

Documenting the process of learnig vim after using GUI code editors for 20
years.

Why?

- Learn and control about my tools
- Having my **forever** setup
  - I changed code editor so many times, i don't regret it one bit. I learned
    from all of them but at one point you gotta consolidate and build shit

## Start with a distro

I started with a distro but **do not** stay on a distro. Move to your own config
after a couple of months.

- I used Lazy and NVChad (this one looks a lot better). I used that for good 3-6
  months
- Then I moved to my own based on
  [kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim/blob/master/init.lua)

When moving out of a distro **do not** add all the plugins back. Also change as
little of the default keybinding as possible.

- While I use my config on my laptop for 90% of the time (and I configure my
  [dotfiles](https://github.com/danielfrg/dotfiles) on my servers). When I have
  to go to a remote instance or conatiner with plain vim I want to be able to be
  productive on it.

Initial set of plugins:

- nvim-treesitter/nvim-treesitter
- nvim-telescope/telescope.nvim
- stevearc/oil.nvim
- folke/which-key.nvim
- colorscheme
- (if tmux): christoomey/vim-tmux-navigator

That's it. Use that for 1 week. Yeah, no LSP here.
