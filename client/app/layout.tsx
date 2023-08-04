import Navbar from "@/src/components/Nav/Navbar";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import { Suspense } from "react";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { ToastNotificationProvider } from "@/src/contexts/ToastNotificationContext";
import { AuthContextProvider } from "@/src/contexts/AuthContext";
import BottomNavigation from "@/src/components/common/BottomNavigation/BottomNavigation";
import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.css";

const poppins = Poppins({
  style: "normal",
  weight: ["300", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Nexusphere AI",
  description: "Welcome Nexusphere AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={classNames(poppins.className, "bg-dark")}>
        <AuthContextProvider>
          <ToastNotificationProvider>
            <Suspense fallback={<GlobalLoader />}>
              <Navbar />
              {children}
              <BottomNavigation />
            </Suspense>
          </ToastNotificationProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
