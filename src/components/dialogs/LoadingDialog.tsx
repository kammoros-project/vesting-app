import { FaSpinner } from "react-icons/fa"

export default function LoadingDialog() {
    return (
        <div className="flex flex-col items-center gap-4">
            <FaSpinner className="w-8 h-8 text-blue-500 animate-spin" />
            <div className="text-blue-500 font-bold">Claiming</div>
            <div className="font-mono text-xs text-slate-500">Please confirm the transaction in your wallet.</div>
        </div>
    )
}