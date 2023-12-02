import { useState } from "react";
import { Stack } from "react-bootstrap";
import { ICommandHistoryItem } from "../../core/types";
import { TerminalItem } from "./components/terminal-item";
import { WelcomeItem } from "./components/welcome";
import "./styles.scss";

export interface ITerminalFeatureProps {}

export function TerminalFeature(_props: ITerminalFeatureProps) {
    const [commandHistory, _setCommandHistory] = useState<ICommandHistoryItem[]>([
        { type: "view", command: "ls", viewData: "any" },
        { type: "input" },
    ]);

    const handleSubmitCommand = (command: string) => {
        console.log(command);
    };

    return (
        <div className="terminal-container">
            <Stack direction="vertical">
                <WelcomeItem />
                {commandHistory.map((item, index) => {
                    // if (item.type === "input") {
                    //     return <TerminalItem key={index}/>;
                    // }

                    // return <TerminalDisplayItem key={index} />;
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
