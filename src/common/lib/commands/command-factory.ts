import { NotFoundCommand } from ".";
import { ICommand } from "./base-command";
import { CreateCommand } from "./create-command";
import { DeleteCommand } from "./delete-command";
import { ListFolderItemsCommand } from "./list-folder-items-command";
import { ViewFileCommand } from "./view-file-command";

export function sanitizedPath(path: string) {
    let cleanPath = path
        .trim()
        .replace(/(^\/+)/, "/")
        .replace(/(\/+$)/, "/")
        .replace(/(\/+)/, "/");

    while (cleanPath.startsWith("/root/")) {
        cleanPath = cleanPath.replace(/^(\/root\/)/, "/");
    }

    if (cleanPath === "/root" || cleanPath === "/") {
        return "/";
    }

    return cleanPath.replace(/^(\/root\/)/, "/");
}

export class CommandFactory {
    constructCommand(command: string): ICommand {
        // detect command type
        const cleanCommand = command.trimStart();

        if (cleanCommand.startsWith("cr")) {
            const params = cleanCommand.replace(/^(cr)( )+\//, "/");

            const pos = params.indexOf("[");
            if (pos === -1) {
                return new CreateCommand(params.trim());
            }
            const path = params.slice(0, pos);
            const data = params.slice(pos);
            return new CreateCommand(sanitizedPath(path), data);
        }

        if (cleanCommand.startsWith("cat")) {
            const params = cleanCommand.replace(/^(cat)( )+\//, "/");

            return new ViewFileCommand(sanitizedPath(params));
        }

        if (cleanCommand.startsWith("ls")) {
            const params = cleanCommand.replace(/^(ls)( )+\//, "/");

            return new ListFolderItemsCommand(sanitizedPath(params));
        }

        if (cleanCommand.startsWith("rm")) {
            const params = cleanCommand.replace(/^(rm)( )+\//, "/");

            const pos = params.indexOf("[");
            if (pos === -1) {
                return new DeleteCommand([sanitizedPath(params)]);
            }

            const path = params.slice(0, pos);
            const extra = params.slice(pos);

            const extraPaths = extra
                .trim()
                .slice(1, extra.length - 1)
                .trim();

            const pathList = extraPaths.split(".");
            pathList[0] = path;
            for (let i = 0; i < pathList.length; i++) {
                pathList[i] = sanitizedPath(`/${pathList[i]}`);
            }

            return new DeleteCommand(pathList);
        }

        return new NotFoundCommand();
    }
}
