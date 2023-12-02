import { Stack } from "react-bootstrap";

export interface IWelcomeItemProps {}

export function WelcomeItem(_props: IWelcomeItemProps) {
    return (
        <div className="px-4 py-4">
            <Stack direction="vertical" className="text-white">
                <h2 className="mb-0 text-white">Welcome user</h2>
                <p className="mb-0">Try these commands to get started: 'help'</p>
            </Stack>
        </div>
    );
}
