/**
 * Finds all permissions passed via `permision-*` inputs and turns them into an object.
 *
 * @see https://docs.github.com/en/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions#inputs
 * @param {NodeJS.ProcessEnv} env
 * @returns {undefined | Record<string, string>}
 */
export function getPermissionsFromInputs(env) {
  return Object.entries(env).reduce((permissions, [key, value]) => {
    if (!key.startsWith("INPUT_PERMISSION-")) return permissions;
    if (!value) return permissions;

    const permission = key.slice("INPUT_PERMISSION-".length).toLowerCase()
      .replaceAll(/-/g, "_");

    // Inherit app permissions if no permissions inputs are set
    if (permissions === undefined) {
      return { [permission]: value };
    }

    return {
      // @ts-expect-error - needs to be typed correctly
      ...permissions,
      [permission]: value,
    };
  }, undefined);
}
