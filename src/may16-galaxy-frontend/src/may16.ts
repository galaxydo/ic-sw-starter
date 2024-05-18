if (window.location.href.includes('localhost')) {
  // If service workers are supported...
  if ('serviceWorker' in navigator) {
    // Check to see if the page is currently controlled.
    let isControlled = Boolean(navigator.serviceWorker.controller);

    // Listen for a change to the current controller...
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (isControlled) {
        // ...and if the page was previosly controlled, reload the page.
        window.location.reload();
      } else {
        // ...otherwise, set the flag for future updates, but don't reload.
        isControlled = true;
      }
    });
  }
}
