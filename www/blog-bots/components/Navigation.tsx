"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Home, BookOpen, Tag, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SearchButton } from "./SearchButton";
import type { Post } from "@/lib/posts";

interface NavigationProps {
  posts: Post[];
}

export function Navigation({ posts }: NavigationProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  // Build links with proper locale prefix
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const links = [
    { href: `${localePrefix}/`, label: t("home"), icon: Home },
    { href: `${localePrefix}/blog`, label: t("blog"), icon: BookOpen },
    { href: `${localePrefix}/tags`, label: t("tags"), icon: Tag },
    { href: `${localePrefix}/about`, label: t("about"), icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={`${localePrefix}/`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-tight"
            >
              ⚡ TECH BLOG
            </motion.div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                          : "hover:bg-muted hover:border-cyan-500/30 border border-transparent"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{link.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <SearchButton posts={posts} />
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
