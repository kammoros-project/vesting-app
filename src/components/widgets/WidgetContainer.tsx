interface IWidgetContainer {
    children?: JSX.Element | JSX.Element[]
    subheading: string
}

export default function WidgetContainer({ children, subheading }: IWidgetContainer) {

    return (
        <div className="bg-white shadow shadow-sm p-8 rounded-2xl">
            <div className="flex flex-col justify-center items-center gap-4">
                <div>{children}</div>
                <h4 className="text-slate-500 text-xs font-mono uppercase">{subheading}</h4>
            </div>
        </div>
    )
    
}