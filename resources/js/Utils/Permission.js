// import usePage dari inertia vue
import { usePage } from "@inertiajs/vue3";

/**
 * Check apakah user punya salah satu permission
 */
export default function hasAnyPermission(permissions) {
    // ambil props auth
    const page = usePage();

    // destruct auth
    const auth = page.props.auth || {};

    // pastikan auth memiliki permissions dan bukan null
    const allPermissions = auth.permissions || {};

    // normalize ke array
    const permissionList = Array.isArray(permissions)
        ? permissions
        : [permissions];

    return permissionList.some(
        (permission) => allPermissions[permission] === true,
    );
}

/**
 * Check single permission
 */
export function hasPermission(permission) {
    return hasAnyPermission([permission]);
}

/**
 * Check role user
 */
export function hasRole(roleName) {
    // ambil props auth
    const page = usePage();

    // destruct auth
    const auth = page.props.auth || {};

    // pastikan auth memiliki permissions dan bukan null
    if (!auth.user || !Array.isArray(auth.user.roles)) {
        return false;
    }

    // cek role user
    return auth.user.roles.some((role) => role.name === roleName);
}
