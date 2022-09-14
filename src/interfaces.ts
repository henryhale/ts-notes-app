/**
 * Item type
 */
export type Item = {
    readonly id: number
    title: string
    content: string
    timestamp: number
}

/**
 * Notes Interface
 */
export interface NotesInterface {
    size: number
    add(title: string, content: string): void
    remove(id: number): void
    render(el: HTMLElement): void
}

/**
 * Get Element by ID interface
 */
export interface GetElemId {
    (id: string): HTMLDivElement
}