import { ConnectWallet } from "@thirdweb-dev/react";
import Container from "../layout/Container";

export default function Auth() {
    return (
        <Container>
            <div className="flex h-screen">
                <div className="flex justify-center items-center max-w-fit mx-auto">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-slate-500 text-center">Please connect your wallet</h3>
                        <ConnectWallet />
                    </div>
                </div>
            </div>
        </Container>
    )
}