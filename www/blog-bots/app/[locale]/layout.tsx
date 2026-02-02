import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { getAllPosts } from "@/lib/posts";
import "../globals.css";

export const metadata: Metadata = {
  title: "⚡ Tech Blog",
  description: "A modern tech blog with cutting-edge features",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const posts = getAllPosts(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="relative flex min-h-screen flex-col">
              <Navigation posts={posts} />
              <main className="flex-1">{children}</main>
              <footer className="border-t border-border/40 bg-background/95 backdrop-blur py-8">
                <div className="container mx-auto px-4 text-center">
                  <p className="text-muted-foreground">
                    Powered by Next.js 15 & Modern Web Tech ⚡
                  </p>
                </div>
              </footer>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
