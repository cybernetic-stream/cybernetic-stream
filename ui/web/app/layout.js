import "@/app/globals.css";
import localFont from "next/font/local";

const SFMono = localFont({
  src: "SF-Mono-Regular.otf",
  variable: "--font-SFMono",
});

export const metadata = {
  title: "Cybernetic Stream",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html className={"bg-black"}>
      <body className={SFMono.variable}>{children}</body>
    </html>
  );
}
