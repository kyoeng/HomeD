import { writable } from "svelte/store";






/**
 * category select state store
 * (툴바 카테고리 on off용)
 */
export const selectStateStore = writable<string | null>(null);


/**
 * build select state store
 * (빌드 카테고리 선택요소 저장용)
 */
export const buildSelectStateStore = writable<string | null>(null);


/**
 * grid state store
 * (그리드 on off 용)
 */
export const gridStateStore = writable<boolean>(false);