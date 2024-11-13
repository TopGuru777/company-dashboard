import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import './globals.css';
import 'react-toastify/ReactToastify.css';

export const metadata: Metadata = {
  title: "Company Dashboard",
  description: "Data Discovery Dashboard for Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
