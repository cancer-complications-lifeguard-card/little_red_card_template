import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "小红卡 - 并发症管理指引生成器",
  description: "专为癌症、罕见病等多病种患者设计的并发症管理指引生成器，提供专业的医疗指导和支持",
  keywords: ["小红卡", "并发症管理", "医疗急救", "AI助手", "癌症", "罕见病"],
  authors: [{ name: "小红卡团队" }],
  openGraph: {
    title: "小红卡 - 并发症管理指引生成器",
    description: "专为癌症、罕见病等多病种患者设计的并发症管理指引生成器",
    url: "https://xiaohongka.example.com",
    siteName: "小红卡",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "小红卡 - 并发症管理指引生成器",
    description: "专为癌症、罕见病等多病种患者设计的并发症管理指引生成器",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground font-sans"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
