import { IBaseResponse } from "../../../core/types";
import { HttpService } from "../../../services";
import { ICommand } from "./base-command";

export class DeleteCommand implements ICommand {
    constructor(public pathList: string[]) {}

    async execute(): Promise<string> {
        try {
            const res = await HttpService.delete<IBaseResponse<any>>(
                `/v1/resources/multiple?pathList=${JSON.stringify(this.pathList)}`
            );

            if (res.code === 200) {
                return Promise.resolve((res.data as any).join("\n"));
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
