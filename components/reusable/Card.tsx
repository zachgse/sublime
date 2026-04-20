type CardProps = {
    class?: string
    children: React.ReactNode
}

export const Card = (props:CardProps) => {
    return (
        <div className={`${props.class} bg-white text-center shadow-lg pb-4 rounded-lg lg:w-full w-3/4 mx-auto`}>
            {props.children}
        </div>
    )
}