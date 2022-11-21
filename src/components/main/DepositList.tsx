import { BigNumber } from "ethers";
import Container from "../layout/Container";
import Deposit from "./Deposit";

interface IDepositList {
    ids: BigNumber[]
}

const header = "text-xs uppercase font-bold text-slate-500 pr-4 py-2 text-right"

export default function DepositList({ ids }: IDepositList) {
    return (
        <Container>
            <div className="bg-white shadow shadow-sm p-8 rounded-2xl">
            <table className="w-full">
                <thead>
                    <tr className="hidden lg:table-row">
                        <td className={header}>Id</td>
                        <td className={header}>Start Time</td>
                        <td className={header}>Duration</td>
                        <td className={header}>Total</td>
                        <td className={header}>Vested</td>
                        <td className={header}>Claimed</td>
                        <td className={header}>Unclaimed</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {ids.map((id, key) => <Deposit key={key} id={id} />)}
                </tbody>
            </table>
            </div>
        </Container>
    )
}