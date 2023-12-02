import { ICommand } from "./base-command";

export class NotFoundCommand implements ICommand {
    constructor() {}

    async execute(): Promise<string> {
        return Promise.resolve("Command not found");
    }
}
