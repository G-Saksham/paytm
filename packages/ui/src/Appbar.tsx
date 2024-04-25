import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any,
    label?: string,
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    label
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300 bg-white p-2">
        <div className="flex flex-col justify-center text-vi font-bold text-3xl px-10">
            {label || "PayTM"}
        </div>
        <div className="flex flex-col justify-center">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}