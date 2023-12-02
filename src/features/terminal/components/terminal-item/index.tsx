import { useEffect, useRef } from "react";
import { Form, FormControl, FormGroup, Stack } from "react-bootstrap";
import "./styles.scss";

export interface ITerminalItemProps {
    type: string;
    command?: string;
    data?: string;

    onSubmit: (command: string) => void | undefined;
}

export function TerminalItem(props: ITerminalItemProps) {
    const { command, type, data, onSubmit } = props;

    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = event.target as typeof event.target & {
            command: { value: string };
        };

        onSubmit && onSubmit(data.command.value);
    };

    useEffect(() => {
        if (!textRef || !textRef.current) {
            return;
        }

        function resize() {
            textRef.current!.style.height = "auto";
            textRef.current!.style.height = textRef.current!.scrollHeight + "px";
        }

        function overrideEnter(event: KeyboardEvent) {
            if (event.key === "Enter" && !event.shiftKey) {
                buttonRef?.current?.click();
            }
        }

        textRef.current!.addEventListener("input", resize);
        textRef.current!.addEventListener("keypress", overrideEnter);

        return () => {
            textRef.current!.removeEventListener("input", resize);
            textRef.current!.removeEventListener("keypress", overrideEnter);
        };
    }, [textRef]);

    return (
        <>
            <div className="terminal-item ps-2 pe-4">
                <Stack direction="horizontal" className="terminal-item-label">
                    <p>[root@root]$</p>
                </Stack>

                <Form onSubmit={handleSubmit}>
                    <FormGroup className="">
                        <FormControl
                            className="terminal-item-input py-0"
                            type="text"
                            ref={textRef}
                            rows={1}
                            autoFocus
                            as="textarea"
                            name="command"
                            disabled={type === "view"}
                            defaultValue={command}
                        />
                    </FormGroup>

                    <button type="submit" hidden ref={buttonRef} disabled={type === "view"}></button>
                </Form>
            </div>

            {type === "view" && (
                <div className="terminal-display-item ps-2 pe-4">
                    <FormGroup className="">
                        <FormControl
                            className="terminal-item-input py-0"
                            type="text"
                            rows={1}
                            as="textarea"
                            disabled
                            defaultValue={data ?? ""}
                        />
                    </FormGroup>
                </div>
            )}
        </>
    );
}
