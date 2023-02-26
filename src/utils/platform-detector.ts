/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * https://stackoverflow.com/a/21742107
 *
 * @returns {String}
 */
const getMobileOperatingSystem = (): 'ios' | 'material' => {
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    return 'ios';
  }

  return 'material';
};

export default getMobileOperatingSystem;
