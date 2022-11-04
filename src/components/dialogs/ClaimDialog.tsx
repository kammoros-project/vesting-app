import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { contractAddress } from "../../constants"
import { formatCommify } from "../../support/formatters"
import ERC20Vesting from "../../abi/ERC20Vesting.json"
import Loading from "../layout/Loading"

interface IClaimDialog {
    claim: () => void
}

export default function ClaimDialog({ claim }: IClaimDialog) {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Vesting.abi)
    const { data: unclaimedByAddress, status: statusUnclaimedByAddress } = useContractRead(contract, "unclaimedByAddress", address)

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="p-4 text-center bg-slate-100 rounded-md border border-slate-200 w-full">
                {!unclaimedByAddress && <Loading />}
                {unclaimedByAddress && formatCommify(unclaimedByAddress)}
            </div>
            <button className="bg-emerald-400 rounded-md py-4 w-full font-bold text-white text-lg uppercase" onClick={claim}>Claim</button>
        </div>
    )
}