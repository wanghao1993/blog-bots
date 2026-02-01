'use client';

import { useTranslation as useTranslationOriginal } from 'react-i18next';

export function useTranslation(namespace: string) {
  const { t, i18n } = useTranslationOriginal(namespace);
  return { t, i18n };
}