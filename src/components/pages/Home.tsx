import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from "../../constants";
import MainWrapper from "../main/MainWrapper";
import WidgetWrapper from "../widgets/WidgetWrapper";
import Vault from "../../abi/Vault.json"
import { DefaultError } from "../layout/DefaultError";
import LoadingView from "../main/LoadingView";
import AddressNotRecognised from "../main/AddressNotRecognised";
import DepositList from "../main/DepositList";

export default function Home() {

    const address = useAddress()
    const { contract } = useContract(contractAddress, Vault.abi)
    const { data, status } = useContractRead(contract, "depositIdsByAddress", address)

    return (
        <>
            {status === "loading" && <LoadingView />}
            {status === "error" && <DefaultError />}
            {status === "success" && data.length > 0 ? 
                <DepositList ids={data} /> : <AddressNotRecognised />
            }
        </>
    )
}