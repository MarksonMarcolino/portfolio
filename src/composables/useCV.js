import { useI18n } from 'vue-i18n'

export function useCV() {
  const { t } = useI18n()

  async function downloadCV() {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('cv-template')

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
  }

  return { downloadCV }
}
