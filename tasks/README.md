# tasks/

### GTD (Getting Things Done)

- What is GTD (Getting Things Done) ?

  > Getting Things Done, also known as GTD or the GTD method, is a self-management method developed by David Allen in which you record all your personal and professional tasks in to-do lists. Since you no longer have to expend any energy on remembering these tasks, your mind is free to concentrate on the task at hand. think:
  > collect tasks, projects, and ideas,
  > process ideas to set up actions,
  > organize tasks into measurable action plans,
  > keep track and adjust,
  > complete tasks.

- .gtd syntax hilight. [GitHub - kis9a/vim-gtd: Visual assistance for GTD with vim simple syntax hilight.](https://github.com/kis9a/vim-gtd)

### Files

```
/tasks
  ├── 2020
  │   ├── 11.gtd
  │   └── 12.gtd
  ├── 2021
  │   ├── 01.gtd
  │   └── 02.gtd
  ---
  └── ideas

```

### Vim

.zshrc

```sh
## export TASKFILE by date.
export TASK=$HOME/kis9a/tasks/$(date +%Y)/$(date +%m).md
```

.vimrc

```vim
" open task file easily.
nnoremap <silent> <Leader>j :tabnew<CR>:e $TASK<CR>

" add syntax highlight plugin.
Plug 'kis9a/vim-gtd'
```
