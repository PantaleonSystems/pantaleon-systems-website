import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { NO_PREF } from '../../lib/motion'

/**
 * Cria o ScrollSmoother. Precisa ser o PRIMEIRO irmão no Layout: os efeitos do
 * React rodam em ordem, e o smoother deve existir antes de qualquer ScrollTrigger.
 */
export function Smoother() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(NO_PREF, () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.1,
        smoothTouch: false,
      })
      // fontes mudam a altura da página; recalcula quando terminarem de carregar
      document.fonts.ready.then(() => ScrollTrigger.refresh())
      return () => smoother.kill()
    })
    return () => mm.revert()
  })
  return null
}
