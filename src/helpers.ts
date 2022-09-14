import { GetElemId } from "./interfaces";

/**
 * Get element by `id`
 * @param id 
 * @returns 
 */
export const getElemId: GetElemId = (id: string) => <HTMLDivElement>document.getElementById(id)
