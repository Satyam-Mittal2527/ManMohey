import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
export const metadata = {
  title: "ManMohey",
  description: "ManMohey Clothing Website",
  icons: {
    icon: "/favicon.ico",
  }
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
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
