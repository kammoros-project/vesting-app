import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { contractAddress } from "../../constants";
import ERC20Vesting from "../../abi/ERC20Vesting.json"
import ClaimDialog from "../dialogs/ClaimDialog";
import ErrorDialog from "../dialogs/ErrorDialog";
import LoadingDialog from "../dialogs/LoadingDialog";
import SuccessDialog from "../dialogs/SuccessDialog";

export default function DefaultMain() {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Vesting.abi)
    const { mutateAsync, status, error } = useContractWrite(contract, "claim")

    async function claim() {
        await mutateAsync([address])
    }

    return (
        <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow shadow-md w-fit p-8 flex flex-col gap-4 w-96 max-w-md">
                <div className="flex justify-between">
                    <h4 className="font-bold uppercase">Claim</h4>
                </div>
                <div>
                    {status === "error" && <ErrorDialog error={error} claim={claim} />}
                    {status === "loading" && <LoadingDialog />}
                    {status === "success" && <SuccessDialog />}
                    {status === "idle" && <ClaimDialog claim={claim} />}
                </div>
            </div>
        </div>
    )
}