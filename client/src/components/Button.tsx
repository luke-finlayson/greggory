import { FC } from "react"

type ButtonProps = {
    onClick: any;
    children: React.ReactNode;
}

const Button = ({
    onClick,
    children
}: ButtonProps) => {
    return (
        <button className="bg-slate-500 text-white px-2 py-1 rounded-md" type="button" onClick={onClick}>{children}</button>
    )
}

export default Button;