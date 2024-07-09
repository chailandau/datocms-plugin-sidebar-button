/**
 * Splits a string of panel locations into an array of individual locations.
 *
 * @param panelLocations - The string of panel locations to split.
 * @returns An array of individual panel locations.
 */
export const getPanelLocations = (panelLocations: string): string[] =>
  panelLocations.split(", ");
