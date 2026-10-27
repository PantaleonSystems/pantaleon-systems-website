import { ScrollSmoother } from './gsap'

/** Rola até o id usando o ScrollSmoother quando ativo; senão, rolagem nativa. */
export function scrollToId(id: string, animate = true) {
  const el = document.getElementById(id)
  if (!el) return
  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(el, animate, 'top top')
    return
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: animate && !reduce ? 'smooth' : 'auto' })
}

export function scrollToTop() {
  const smoother = ScrollSmoother.get()
  if (smoother) smoother.scrollTop(0)
  else window.scrollTo({ top: 0, behavior: 'auto' })
}
