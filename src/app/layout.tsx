import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Navigation from "./components/Navigation";
import QueryClientProvider from "./components/QueryClientProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, ToastContainerProps } from "react-toastify";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: '관리 시스템',
  description: '수강신청 및 학생 관리 시스템',
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        <QueryClientProvider>
          <div className="min-h-screen bg-white">
            <header className="bg-main shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">finale</h1>
                <Navigation />
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
          <ToastContainer {...toastConfig} />
        </QueryClientProvider>
      </body>
    </html >
  )
}

const toastConfig: ToastContainerProps = {
  hideProgressBar: true,
  position: 'bottom-center',
  autoClose: 3000,
  role: 'success',
  toastStyle: {
    width: '320px',
    maxWidth: '90%',
    boxSizing: 'border-box',
    margin: 'auto',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    top: '12px'
  },
  bodyStyle: {
    fontSize: '14px',
    padding: 0,
    margin: 0,
  },
}