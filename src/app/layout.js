import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import NavFooterWrapper from "@/components/NavFooterWrapper";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Animal Madeira",
  description: "Adocao, esterilizacao, voluntariado e emergencias animais na Madeira.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <NavFooterWrapper>
          {children}
        </NavFooterWrapper>
      </body>
    </html>
  );
}