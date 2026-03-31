import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "留言板",
  description: "一个简单的留言板网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
