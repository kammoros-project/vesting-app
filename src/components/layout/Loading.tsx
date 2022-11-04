interface ILoading {
    size?: "sm" | "md" | "lg"
}

export default function Loading({ size = "md" }: ILoading) {
    let height
    switch (size) {
        case "sm":
            height = "4"
            break;
        case "md":
            height = "6"
            break;
        case "lg":
            height = "8"
            break;
        default:
            height = "6"
            break;
    }

    return (
        <div className={`animate-pulse bg-slate-200 w-16 h-${height} rounded-full`} />
    )

}