import clsx from "clsx";

type ButtonProps = {
    type: "button" | "submit" | "reset"
    disabled?: boolean
    bg: string
    color: string
    children: React.ReactNode
    onClick?: () => void
    class?: string
}

export const Button = (props:ButtonProps) => {
    return (
        <button onClick={props.onClick}
            type={props.type} disabled={props.disabled}
            className={clsx("w-fit h-10 px-12 py-4 rounded-lg flex items-center gap-1",
                props.bg,
                props.color,
                props.disabled ? "opacity-75 cursor-not-allowed" : "cursor-pointer hover:opacity-75"
            )}>
            {props.children}
        </button>
    )
}