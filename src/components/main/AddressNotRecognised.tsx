import { useAddress } from "@thirdweb-dev/react"
import { FaTimes } from "react-icons/fa"

export default function AddressNotRecognised() {

    const address = useAddress()

    return (
        <div className="flex flex-col items-center gap-4 text-xs text-slate-500 p-8">
            <FaTimes className="w-8 h-8"/>
            <div>Address Not Recognised</div>
            <div className="font-mono">{address}</div>
        </div>
    )
}