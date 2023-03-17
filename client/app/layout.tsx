import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "@/src/components/Nav/Navbar";
import { Poppins } from "next/font/google";
import classNames from "classnames";

const poppins = Poppins({
  style: "normal",
  weight: ["300", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Nexusphere AI</title>
      </head>
      <body className={classNames(poppins.className, "bg-dark")}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
