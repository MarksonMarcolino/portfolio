import { useI18n } from 'vue-i18n'

export function useCV() {
  const { t } = useI18n()

  async function downloadCV() {
    const html2pdf = (await import('html2pdf.js')).default
    const source = document.getElementById('cv-template')
    if (!source) return

    // Clone the element into a visible container for html2canvas
    const wrapper = document.createElement('div')
    wrapper.style.cssText = 'position: fixed; left: 0; top: 0; width: 794px; z-index: 99999; background: #fff; overflow: hidden;'
    const clone = source.cloneNode(true)
    clone.removeAttribute('id')
    clone.style.cssText = 'width: 794px; font-family: Inter, sans-serif; font-size: 13px; color: #1a1a1a; background: #fff; padding: 48px; line-height: 1.6; position: static;'
    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)

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

    await html2pdf().set(options).from(clone).save()

    // Clean up
    document.body.removeChild(wrapper)
  }

  return { downloadCV }
}
