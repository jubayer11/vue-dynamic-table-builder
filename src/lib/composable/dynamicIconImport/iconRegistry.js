/**
 * A registry of icon components used throughout the dynamic table system.
 *
 * Each icon is lazily loaded via dynamic `import()` using `defineAsyncComponent` internally.
 * This allows for on-demand loading of icons without bloating the initial bundle.
 *
 * Keys should match the `iconType` values used in action configuration (e.g., `iconView`, `iconEdit`).
 *
 * Usage example:
 * ```js
 * import { iconComponents } from '@/composable/dynamicIconImport/iconRegistry';
 * const IconComponent = defineAsyncComponent(iconComponents['iconEdit']);
 * ```
 *
 * @type {Record<string, () => Promise<any>>}
 */
export const iconComponents = {
    iconSearch: () => import('@/components/icon/iconSearch.vue'),
    iconPlus: () => import('@/components/icon/iconPlus.vue'),
    iconMinus: () => import('@/components/icon/iconMinus.vue'),
    iconEdit: () => import('@/components/icon/iconEdit.vue'),
    iconDestroy: () => import('@/components/icon/iconDestroy.vue'),
    iconDownload: () => import('@/components/icon/iconDownload.vue'),
    iconList: () => import('@/components/icon/iconList.vue'),
    iconView: () => import('@/components/icon/iconView.vue'),
    iconEmail: () => import('@/components/icon/iconEmail.vue'),
    iconMessage: () => import('@/components/icon/iconMessage.vue'),
    iconSorting: () => import('@/components/icon/iconSorting.vue'),
    iconPresent: () => import('@/components/icon/iconPresent.vue'),
    iconAddUser: () => import('@/components/icon/iconAddUser.vue'),
    iconPhoneText: () => import('@/components/icon/iconPhoneText.vue'),
    iconLock: () => import('@/components/icon/iconLock.vue'),
};
