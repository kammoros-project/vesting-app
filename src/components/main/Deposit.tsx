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
const header = "text-xs uppercase font-bold text-slate-500 pr-4 py-2 text-right"

function formatEther(value: BigNumber, decimals: number = 3) {
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
    } = useContractWrite(contract, "releaseERC20");

    async function releaseERC20() {
        await mutate([id])
    }

    if (deposit && vested && releasable) {
        return (
            <>
                <tr className="hidden lg:table-row">
                    <td className={klass}>{deposit.id?.toString()}</td>
                    <td className={klass}>{moment(deposit.startTime.toNumber() * 1000).format("DD/MM/YY hh:mm:ss")}</td>
                    <td className={klass}>{moment.duration(deposit.duration.toNumber(), 'seconds').humanize()}</td>
                    <td className={klass}>{formatEther(deposit.value)}</td>
                    <td className={klass}>{formatEther(vested)}</td>
                    <td className={klass}>{formatEther(deposit.released)}</td>
                    <td className={klass}>{formatEther(releasable)}</td>
                    <td className={klass}>
                        <button className="w-full uppercase text-xs py-3 bg-emerald-200 hover:bg-emerald-100 disabled:bg-slate-200" onClick={releaseERC20} disabled={moment().isBefore(deposit.startTime.toNumber() * 1000)}>
                            <div className="flex justify-center items-center gap-2">
                                {isLoading && <Spin />}
                                <div>Release</div>
                            </div>
                        </button>
                    </td>
                </tr>
                <tr className="lg:hidden border-b border-b-slate-200 text-sm text-slate-800">
                    <td className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className={header}>Id</span>
                            <span>{deposit.id?.toString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={header}>Start Time</span>
                            <span>{moment(deposit.startTime.toNumber() * 1000).format("DD/MM/YY hh:mm:ss")}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={header}>Duration</span>
                            <span>{moment.duration(deposit.duration.toNumber(), 'seconds').humanize()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={header}>Total</span>
                            <span>{formatEther(deposit.value)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={header}>Vested</span>
                            <span>{formatEther(vested)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={header}>Claimed</span>
                            <span>{formatEther(deposit.released)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={header}>Unclaimed</span>
                            <span>{formatEther(releasable)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <button className="w-full uppercase text-xs py-3 bg-emerald-200 hover:bg-emerald-100 disabled:bg-slate-200" onClick={releaseERC20} disabled={moment().isBefore(deposit.startTime.toNumber() * 1000)}>
                                <div className="flex justify-center items-center gap-2">
                                    {isLoading && <Spin />}
                                    <div>Release</div>
                                </div>
                            </button>
                        </div>
                    </td>
                </tr>
            </>
        )
    } else {
        return (
            <tr className="hidden lg:table-row">
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