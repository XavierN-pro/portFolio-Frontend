/**
 * classNames Function
 * 
 * Joins a list of class names into a single string, filtering out falsy values.
 * @param classes - List of class names to join.
 * 
 * @returns {String} - String containing all valid class names joined by a space.
 */
export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
}