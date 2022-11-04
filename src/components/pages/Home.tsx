import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from "../../constants";
import MainWrapper from "../main/MainWrapper";
import WidgetWrapper from "../widgets/WidgetWrapper";
import ERC20Vesting from "../../abi/ERC20Vesting.json"
import { DefaultError } from "../layout/DefaultError";
import LoadingView from "../main/LoadingView";
import AddressNotRecognised from "../main/AddressNotRecognised";

export default function Home() {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Vesting.abi)
    const { data: isReceiver, status: statusIsReceiver } = useContractRead(contract, "isReceiver", address)

    return (
        <>
            {statusIsReceiver === "loading" && <LoadingView />}
            {statusIsReceiver === "error" && <DefaultError />}
            {statusIsReceiver === "success" && isReceiver ? 
                <>
                    <WidgetWrapper />
                    <MainWrapper />
                </> : <AddressNotRecognised />
            }
        </>
    )
}