export const useCurrencies = () => {
  const { locale, availableLocales } = useI18n()

  const europeanAvailableLocalesCurrencies = availableLocales.filter((locale) => locale === 'it')

  const isEuropeanCurrency = computed(() =>
    europeanAvailableLocalesCurrencies.includes(locale.value),
  )

  const currentCurrencyLabel = computed(() => (isEuropeanCurrency.value ? '€' : '¥'))

  return { currentCurrencyLabel }
}
