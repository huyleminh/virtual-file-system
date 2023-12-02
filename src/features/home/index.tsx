import { Button, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";

export function HomePage() {
    return (
        <Stack className="home-container align-items-center justify-content-center" direction="vertical">
            <Card className="home-card p-4">
                <h1 className="mb-3 w-100 text-center">Virtual File System</h1>

                {/* <div className="home-card-image mb-3 mx-auto">
                    <img src="images/digital_wallet.jpg" loading="lazy" alt="wallet" />
                </div> */}

                <Stack direction="horizontal" className="justify-content-center w-100 align-items-center" gap={4}>
                    <Link to={"/terminal"}>
                        <Button
                            className="d-flex align-items-center"
                            variant="primary"
                            size="lg"
                        >
                            Open terminal
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="text-white mx-1"
                                width={"1.5rem"}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                                />
                            </svg>
                        </Button>
                    </Link>
                </Stack>
            </Card>
        </Stack>
    );
}
