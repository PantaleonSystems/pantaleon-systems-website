import { useCallback, useEffect, useRef, useState } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const elementRef = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const ref = useCallback((node: T | null) => {
    elementRef.current = node
  }, [])

  useEffect(() => {
    const node = elementRef.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, isVisible }
}
