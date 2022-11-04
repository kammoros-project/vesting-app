import { FaCheck } from "react-icons/fa"
import { stakingUrl } from "../../constants"

export default function SuccessDialog() {
    return (
        <div className="flex flex-col items-center gap-4">
            <FaCheck className="w-8 h-8 text-slate-300" />
            <div className="text-emerald-400 font-bold">Congratulations!</div>
            <div className="font-mono text-xs text-slate-500">Your tokens are now in your wallet.</div>
            <div className="p-2 bg-blue-100 rounded-md w-full text-center font-mono text-xs text-blue-700">Earn passive income by <a href={stakingUrl} target="blank" rel="noreferrer" className="text-blue-400 hover:underline">staking them</a>.</div>
        </div>
    )
}