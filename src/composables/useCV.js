import { useI18n } from 'vue-i18n'

export function useCV() {
  const { t } = useI18n()

  async function downloadCV() {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('cv-template')
    if (!element) return

    // Temporarily make visible for html2canvas capture
    const prevStyle = element.style.cssText
    element.style.cssText = 'position: fixed; left: 0; top: 0; width: 794px; font-family: Inter, sans-serif; font-size: 13px; color: #1a1a1a; background: #fff; padding: 48px; line-height: 1.6; z-index: -1; opacity: 1;'

    const options = {
      margin: [10, 10, 10, 10],
      filename: t('cv.filename'),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        windowWidth: 794,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
    }

    await html2pdf().set(options).from(element).save()

    // Restore hidden state
    element.style.cssText = prevStyle
  }

  return { downloadCV }
}
