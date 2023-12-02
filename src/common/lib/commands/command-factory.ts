import { NotFoundCommand } from ".";
import { ICommand } from "./base-command";
import { CreateCommand } from "./create-command";

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

        return new NotFoundCommand();
    }
}
