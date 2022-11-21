import { useContract, useContractRead } from "@thirdweb-dev/react"
import { contractAddress } from "../../constants"
import Vault from "../../abi/Vault.json"
import LoadingView from "./LoadingView"
import Container from "../layout/Container"
import { DefaultError } from "../layout/DefaultError"
import moment from "moment"
import NotStarted from "./NotStarted"
import DefaultMain from "./DefaultMain"

export default function MainWrapper () {
    const { contract } = useContract(contractAddress, Vault.abi)
    const { data: startTime, status: statusStartTime } = useContractRead(contract, "startTime")

    return (
        <Container>
            <>
                {statusStartTime === "loading" && <LoadingView />}
                {statusStartTime === "error" && <DefaultError />}
                {startTime && moment().isBefore(startTime.toNumber() * 1000) ? <NotStarted startTime={startTime} /> : <DefaultMain />}
            </>
        </Container>
    )
    
}