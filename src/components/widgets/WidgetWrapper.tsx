import Container from "../layout/Container";
import WidgetContainer from "./WidgetContainer";
import { contractAddress } from "../../constants";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import ERC20Vesting from "../../abi/ERC20Vesting.json"
import Loading from "../layout/Loading";
import { DefaultError } from "../layout/DefaultError";
import { formatCommify, formatSimplePercent } from "../../support/formatters";

interface ISuccessWrapper {
    children: JSX.Element | JSX.Element[]
}

function SuccessWrapper({ children }: ISuccessWrapper) {
    return (
        <div className="text-4xl font-bold">{children}</div>
    )
}

export default function WidgetWrapper() {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Vesting.abi)
    const { data: allocationByAddress, status: statusAllocationByAddress } = useContractRead(contract, "allocationByAddress", address)
    const { data: releasedByAddress, status: statusReleasedByAddress } = useContractRead(contract, "releasedByAddress", address)
    const { data: claimedByAddress, status: statusClaimedByAddress } = useContractRead(contract, "claimedByAddress", address)
    const { data: progress, status: statusProgress } = useContractRead(contract, "progress")

    return (
        <Container>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                <WidgetContainer subheading="Allocation">
                    <>
                        {statusAllocationByAddress === "loading" && <Loading />}
                        {statusAllocationByAddress === "error" && <DefaultError />}
                        {statusAllocationByAddress === "success" && <SuccessWrapper><>{formatCommify(allocationByAddress, 0)}</></SuccessWrapper>}
                    </>
                </WidgetContainer>
                <WidgetContainer subheading="Released">
                <>
                        {statusReleasedByAddress === "loading" && <Loading />}
                        {statusReleasedByAddress === "error" && <DefaultError />}
                        {statusReleasedByAddress === "success" && <SuccessWrapper><>{formatCommify(releasedByAddress, 0)}</></SuccessWrapper>}
                    </>
                </WidgetContainer>
                <WidgetContainer subheading="Claimed">
                    <>
                        {statusClaimedByAddress === "loading" && <Loading />}
                        {statusClaimedByAddress === "error" && <DefaultError />}
                        {statusClaimedByAddress === "success" && <SuccessWrapper><>{formatCommify(claimedByAddress, 0)}</></SuccessWrapper>}
                    </>
                </WidgetContainer>
                <WidgetContainer subheading="Progress">
                    <>
                        {statusProgress === "loading" && <Loading />}
                        {statusProgress === "error" && <DefaultError />}
                        {statusProgress === "success" && <SuccessWrapper><>{formatSimplePercent(progress)}</></SuccessWrapper>}
                    </>
                </WidgetContainer>
            </div>
        </Container>
    )

}