import { IBaseResponse } from "../../../core/types";
import { HttpService } from "../../../services";
import { ICommand } from "./base-command";

export class ListFolderItemsCommand implements ICommand {
    constructor(public path: string) {}

    async execute(): Promise<string> {
        try {
            const res = await HttpService.get<IBaseResponse<any>>(`/v1/resources/children?path=${this.path}`);

            if (res.code === 200) {
                const data = res.data as any;
                const rootDisplay = `${new Date(data.root.createdAt).toLocaleString()}  ${data.root.size}   ${
                    data.root.type
                }   ${data.root.name}`;

                const childrenDisplay = data.children
                    .map(
                        (item: any) =>
                            `${new Date(item.createdAt).toLocaleString()}  ${item.size}   ${item.type}   ${item.name}`
                    )
                    .join("\n");
                return Promise.resolve(rootDisplay + "\n" + childrenDisplay);
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
