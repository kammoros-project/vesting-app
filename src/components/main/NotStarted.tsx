import { FaClock } from "react-icons/fa"
import { formatCountdown } from "../../support/formatters"
import { BigNumber } from "ethers"

interface INotStarted {
    startTime: BigNumber
}

export default function NotStarted({ startTime }: INotStarted) {

    return (
        <div className="flex flex-col items-center gap-4 text-slate-500 font-mono uppercase">
            <FaClock className="w-8 h-8"/>
            <div className="text-xs">Starting In</div>
            <div>{formatCountdown(startTime.toNumber() * 1000)}</div>

        </div>
    )
}