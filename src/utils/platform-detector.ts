const getOperatingSystem = (): 'ios' | 'material' => {
  if (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  ) {
    return 'ios';
  }

  return 'material';
};

export default getOperatingSystem;
