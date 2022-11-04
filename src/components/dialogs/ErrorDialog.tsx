import { FaTimes } from "react-icons/fa"

interface IErrorDialog {
    error: any
    claim: () => void
}

export default function ErrorDialog({ error, claim }: IErrorDialog) {
    return (
        <div className="flex flex-col items-center gap-4">
            <FaTimes className="w-8 h-8 text-slate-300" />
            <div className="text-red-800 font-bold">Error</div>
            <div className="font-mono text-xs text-slate-500">{error.toString()}</div>
            <button className="bg-emerald-400 rounded-md py-4 w-full font-bold text-white text-lg uppercase" onClick={claim}>Try again</button>
        </div>
    )
}