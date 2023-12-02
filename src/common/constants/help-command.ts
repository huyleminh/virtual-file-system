export const HELP_COMMAND = `create       cr PATH [DATA]
view file           cat FILE_PATH
view folder         ls FOLDER_PATH
delete              rm PATH [PATH2 PATH3 ...]
clear terminal      clear

* path must start with /
* path can contain space, a-z, A-Z and number
* parameters in [] are optional
* delete command: to represent paths in [], please add . before each path
    eg: rm /folder [./folder2 ./folder3]`;