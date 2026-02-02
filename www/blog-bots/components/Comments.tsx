"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function Comments() {
  const { theme } = useTheme();
  const t = useTranslations("common");

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
        💬 {t("comments")}
      </h2>
      <Giscus
        repo={"wanghao1993/blog-bots"}
        repoId={"R_kgDORGFC9w"}
        category={"General"}
        categoryId={"DIC_kwDORGFC984C1uy0"}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
