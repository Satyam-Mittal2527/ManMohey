import "./global.css";
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div
            className="min-h-screen flex justify-center md:justify-start items-center bg-cover bg-center bg-[url('/auth_page_bg.png')]"
        >
            <div className="w-full flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}