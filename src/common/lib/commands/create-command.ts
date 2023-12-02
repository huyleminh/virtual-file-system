import { IBaseResponse } from "../../../core/types";
import { HttpService } from "../../../services";
import { ICommand } from "./base-command";

export class CreateCommand implements ICommand {
    constructor(
        public path: string,
        public data?: string
    ) {}

    async execute(): Promise<string> {
        if (this.path === "/") {
            return Promise.resolve("File name is missing");
        }

        const pos = this.path.lastIndexOf("/");

        try {
            const res = await HttpService.post<IBaseResponse<any>>("/v1/resources", {
                path: this.path.slice(0, pos) ? this.path.slice(0, pos) : "/",
                name: this.path.slice(pos + 1),
                data: this.data ? this.data.trim().replace(/^\[/, "").replace(/\]$/, "") : "",
            });

            if (res.code === 201) {
                return Promise.resolve("Created");
            }

            if (res.code === 4001) {
                return Promise.resolve((res.data as any).error);
            }

            return Promise.resolve(res.message);
        } catch (error: any) {
            return Promise.resolve(error.message);
        }
    }
}
