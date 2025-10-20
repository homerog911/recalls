import { Navbar } from "./components/navbar/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body  data-new-gr-c-s-check-loaded="14.1258.0"  data-gr-ext-installed="">
        <Navbar></Navbar>
        {children}
        </body>
    </html>
  )
}