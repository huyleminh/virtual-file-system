import { IBaseResponse } from "../../../core/types";
import { HttpService } from "../../../services";
import { ICommand } from "./base-command";

export class ViewFileCommand implements ICommand {
    constructor(public path: string) {}

    async execute(): Promise<string> {
        try {
            const res = await HttpService.get<IBaseResponse<any>>(`/v1/resources/content?path=${this.path}`);

            if (res.code === 200) {
                return Promise.resolve((res.data as any).content);
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
