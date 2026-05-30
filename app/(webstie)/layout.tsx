import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import NavBar from "./_components/NavBar";
export const metadata = {
  title: "ManMohey",
  description: "ManMohey Clothing Website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <NavBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
