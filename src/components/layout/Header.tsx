import { ConnectWallet } from "@thirdweb-dev/react";
import Container from "./Container";
import logo from "../../assets/logo.png"

function Header() {
    return (
        <div className="bg-white shadow shadow-sm">
            <Container>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-row items-center">
                        <img src={logo} alt="Kammoros logo" className="w-16"/>
                        <span className="uppercase hidden sm:block text-sm md:text-xl font-semibold">Kammoros Vesting</span>
                    </div>
                    <div>
                        <ConnectWallet colorMode="light"/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Header