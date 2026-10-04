import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * 页面级入场：容器内所有 [data-anim] 元素按顺序升起淡入。
 * 用 gsap.context 做作用域隔离，卸载时自动 revert，避免内存泄漏。
 */
export function useRevealOnMount<T extends HTMLElement = HTMLDivElement>(deps: unknown[] = []) {
  const scope = useRef<T>(null)

  useEffect(() => {
    const el = scope.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-anim]')

      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, y: 0, clearProps: 'transform' })
        return
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.07,
          overwrite: 'auto',
        },
      )
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}

/**
 * 骨架屏/占位槽的呼吸动画。
 * 用于尚未实现的动画场景，让"空位"看起来是有意为之，而不是坏了。
 */
export function useBreathe(active = true) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !active) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tween = gsap.to(el, {
      opacity: 0.55,
      duration: 2.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tween.kill()
    }
  }, [active])

  return ref
}
