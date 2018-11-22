# treebranches
A web-based directory system built with Django!
This project uses a SQLite database which stores "DirObject" instantiations.\
These instantiations subsist of folders, and files (txt only). There are also special folders called root and trash.
A folder with the extension root represents a project which can be filled with sub-folders and files.
A folder with the extension trash is automatically generated and available to all projects.
Currently a txt editor has not been added, but this project is built to eventually process real files and folders,
allowing the user to move harddrive contents in and out of the web-based directory.
It also contains a place-holder social network, which would be a useful feature for such a service.

Features of directory system:
- Displays user-created projects that are directly created from Django models and built in the HTML.
- Once the page is loaded Python's role of controlling the page ends, and JQuery picks up.
- Currently allows only 1 project, called C, but could be adapted to many tabbed projects.
- Allows creation, modification, and deletion of folders and "files".
- Uses AJAX requests to to achieve CRUD functions without page refreshing.
  * These requests are done at each user action. A better approach would be finalizing the
    entire session at certain intervals. This project already supports bulk creates, updates 
    and deletes, so this modification is feasible.

System functions:
* Select

Crud functions:
* New folder, new file
* Rename folder/ file (autoincrements folders/files with taken names)
* Copy, cut, paste
* Delete (move to trash)
* Delete (delete if in trash)
* Sort by (name, created, modified)

Folder functions:
* Expand, collapse
* Paste In (in this folder)

File functions:
* Paste Here (in parent folder)

These functions are primarily controlled through a context-menu system activated by the right click.
This context menu offers commands and sub-commands for the user to perform.
For more advanced users the context menu can be bypassed using hotkeys. All the standards:
* N - new folder (create in or create here)
* F - new file
* R - rename
* CTRL + C - copy
* CTRL + X - cut
* CTRL + V - paste
* Delete - delete (move to trash, delete if in trash, and empty trash bin if used while trash is selected)
* S - Invert current sort (+name --> -name)
* Enter - Expand/collapse folders, open files
