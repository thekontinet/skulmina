import { ReactNode } from "react";

type AuthCardProps = {
    children: ReactNode;
    title?: string;
    info?: string;
};

function AuthCard({ children, title, info }: AuthCardProps) {
    return (
        <div className="grid place-items-center min-h-screen">
            <div className="max-w-2xl w-full p-8 py-4 bg-lighter rounded-lg shadow-md">
                {(title || info) && <header className="text-center space-y-2">
                    <h2 className="heading-1">{title}</h2>
                    <p>{info}</p>
                </header>}
                {children}
            </div>
        </div>
    );
}

export default AuthCard;
