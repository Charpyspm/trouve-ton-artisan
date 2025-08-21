declare module 'bootstrap' {
  export class Offcanvas {
    constructor(element: Element | string, options?: Record<string, unknown>)
    static getInstance(element: Element | string): Offcanvas | null
    show(): void
    hide(): void
    toggle(): void
  }
}
