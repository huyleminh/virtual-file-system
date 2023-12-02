export interface IBaseResponse<T> {
    code: number;
    message: string;
    data?: T;
}

export interface ICommandHistoryItem {
    type: "input" | "view",
    command?: string;
    viewData?: string;
}