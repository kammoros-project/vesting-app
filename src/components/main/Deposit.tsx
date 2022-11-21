import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import Vault from "../../abi/Vault.json"
import { contractAddress } from "../../constants";
import moment from "moment"
import Spin from "../layout/Spin";

interface IDeposit {
    id: BigNumber
}

const klass = "text-sm font-base text-slate-800 pr-4 py-2 text-right"

function formatEther(value: BigNumber, decimals: number = 0) {
    let str = ethers.utils.formatEther(value)
    str = ethers.utils.commify(str)
    const index = str.indexOf(".") + decimals
    return str.substring(0, index)
}

export default function Deposit({ id }: IDeposit) {

    const { contract } = useContract(contractAddress, Vault.abi)
    const { data: deposit } = useContractRead(contract, "depositById", id)
    const { data: vested } = useContractRead(contract, "vested", id)
    const { data: releasable } = useContractRead(contract, "releasable", id)

    const {
        mutate,
        isLoading,
        error,
    } = useContractWrite(contract, "releaseERC20");

    async function releaseERC20() {
        await mutate([id])
    }

    if (deposit && vested && releasable) {
        return (
            <tr>
                <td className={klass}>{deposit.id?.toString()}</td>
                <td className={klass}>{moment(deposit.startTime.toNumber() * 1000).format("DD/MM/YY hh:mm:ss")}</td>
                <td className={klass}>{moment.duration(deposit.duration.toNumber(), 'seconds').humanize()}</td>
                <td className={klass}>{formatEther(deposit.value)}</td>
                <td className={klass}>{formatEther(vested)}</td>
                <td className={klass}>{formatEther(deposit.released)}</td>
                <td className={klass}>{formatEther(releasable)}</td>
                <td className={klass}>
                    <button className="border uppercase text-xs py-1 px-2" onClick={releaseERC20}>
                        <div className="flex justify-between items-center gap-2">
                            { isLoading && <Spin /> }
                            <div>Release</div>
                        </div>
                    </button>
                </td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td className={klass}>-</td>
                <td className={klass}>-</td>
                <td className={klass}>-</td>
                <td className={klass}>-</td>
                <td className={klass}>-</td>
                <td className={klass}>-</td>
                <td className={klass}>-</td>
                <td className={klass}>-</td>
            </tr>
        )
    }


}