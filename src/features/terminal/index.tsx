import { useState } from "react";
import { Stack } from "react-bootstrap";
import { HELP_COMMAND } from "../../common/constants/help-command";
import { CommandFactory } from "../../common/lib/commands";
import { ICommandHistoryItem } from "../../core/types";
import { TerminalItem } from "./components/terminal-item";
import { WelcomeItem } from "./components/welcome";
import "./styles.scss";

export interface ITerminalFeatureProps {}

export function TerminalFeature(_props: ITerminalFeatureProps) {
    const [commandHistory, setCommandHistory] = useState<ICommandHistoryItem[]>([{ type: "input" }]);

    const handleSubmitCommand = (command: string) => {
        if (!command.trim()) {
            const cloneHistory: ICommandHistoryItem[] = JSON.parse(JSON.stringify(commandHistory));
            const last = cloneHistory[cloneHistory.length - 1];
            last.type = "view";

            cloneHistory.push({ type: "input" });
            setCommandHistory(cloneHistory);
            return;
        }

        if (command.trim() === "help") {
            const cloneHistory: ICommandHistoryItem[] = JSON.parse(JSON.stringify(commandHistory));
            const last = cloneHistory[cloneHistory.length - 1];
            last.type = "view";
            last.viewData = HELP_COMMAND;

            cloneHistory.push({ type: "input" });
            setCommandHistory(cloneHistory);
            return;
        }

        executeCommandAsync(command);
    };

    const executeCommandAsync = async (command: string) => {
        const factory = new CommandFactory();
        const result = await factory.constructCommand(command).execute();

        const cloneHistory: ICommandHistoryItem[] = JSON.parse(JSON.stringify(commandHistory));
        const last = cloneHistory[cloneHistory.length - 1];
        last.type = "view";
        last.command = last.viewData = result;
        cloneHistory.push({ type: "input" });

        setCommandHistory(cloneHistory);
    };

    return (
        <div className="terminal-container">
            <Stack direction="vertical">
                <WelcomeItem />
                {commandHistory.map((item, index) => {
                    return (
                        <TerminalItem
                            key={index}
                            type={item.type}
                            command={item.command ?? ""}
                            data={item.viewData}
                            onSubmit={handleSubmitCommand}
                        />
                    );
                })}
            </Stack>
        </div>
    );
}
