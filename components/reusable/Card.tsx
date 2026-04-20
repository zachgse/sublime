type CardProps = {
    class?: string
    children: React.ReactNode
}

export const Card = (props:CardProps) => {
    return (
        <div className={`${props.class} bg-white text-center shadow-lg pb-4 rounded-lg md:w-full w-5/6 mx-auto`}>
            {props.children}
        </div>
    )
}