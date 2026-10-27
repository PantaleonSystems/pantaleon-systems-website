import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { DUR, EASE, NO_PREF } from '../lib/motion'

/**
 * Feedback de pressão imediato e interrompível em todo elemento [data-press]
 * dentro do escopo: encolhe no pointer-down (não só ao soltar) e volta ao soltar.
 * Usa quickTo para reaproveitar um único tween por elemento.
 */
export function usePressFeedback(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const cleanups: Array<() => void> = []
        scope.current?.querySelectorAll<HTMLElement>('[data-press]').forEach((el) => {
          const scaleTo = gsap.quickTo(el, 'scale', { duration: DUR.fast / 2, ease: EASE })
          const down = () => scaleTo(0.95)
          const up = () => scaleTo(1)
          el.addEventListener('pointerdown', down)
          el.addEventListener('pointerup', up)
          el.addEventListener('pointerleave', up)
          el.addEventListener('pointercancel', up)
          cleanups.push(() => {
            el.removeEventListener('pointerdown', down)
            el.removeEventListener('pointerup', up)
            el.removeEventListener('pointerleave', up)
            el.removeEventListener('pointercancel', up)
          })
        })
        return () => cleanups.forEach((fn) => fn())
      })
      return () => mm.revert()
    },
    { scope },
  )
}
