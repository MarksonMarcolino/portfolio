import { useI18n } from 'vue-i18n'

export function useCV() {
  const { t } = useI18n()

  async function downloadCV() {
    const html2pdf = (await import('html2pdf.js')).default
    const source = document.getElementById('cv-template')
    if (!source) return

    // Clone the element into a visible container for html2canvas
    const wrapper = document.createElement('div')
    wrapper.style.cssText = 'position: fixed; left: 0; top: 0; width: 680px; z-index: 99999; background: #fff; overflow: hidden;'
    const clone = source.cloneNode(true)
    clone.removeAttribute('id')
    clone.style.cssText = 'width: 680px; font-family: Inter, sans-serif; font-size: 13px; color: #1a1a1a; background: #fff; padding: 40px 44px; line-height: 1.6; position: static; box-sizing: border-box; word-wrap: break-word; overflow-wrap: break-word;'
    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)
    // Flatten the <section> wrappers so headers and entries become top-level
    // siblings. Combined with the 'avoid-all' pagebreak mode below, html2pdf then
    // keeps each small element (a header, a job, a publication, a skill row) intact
    // across page breaks instead of slicing a line in half — while not having a tall
    // <section> container to bump wholesale, so content still packs densely with no
    // large blank gaps. We re-add the section's bottom spacing on its last child, and
    // strip it on the final section to avoid a phantom trailing page from rounding.
    const sections = Array.prototype.slice.call(clone.querySelectorAll(':scope > section'))
    sections.forEach((section, i) => {
      const last = section.lastElementChild
      if (last) last.style.marginBottom = i < sections.length - 1 ? '24px' : '0'
      while (section.firstChild) clone.insertBefore(section.firstChild, section)
      clone.removeChild(section)
    })

    const options = {
      margin: [10, 10, 10, 10],
      filename: t('cv.filename'),
      image: { type: 'jpeg', quality: 0.98 },
      enableLinks: true,
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        windowWidth: 700,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }

    await html2pdf().set(options).from(clone).save()

    // Clean up
    document.body.removeChild(wrapper)
  }

  return { downloadCV }
}
