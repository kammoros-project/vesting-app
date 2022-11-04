import { FaSpinner } from "react-icons/fa"

export default function LoadingView() {
    return (
        <div className="flex flex-col items-center gap-4">
            <FaSpinner className="w-8 h-8 animate-spin text-slate-500"/>
        </div>
    )
}