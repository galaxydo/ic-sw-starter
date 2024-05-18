; (callback => {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback, { once: true })
  }
})(async () => {
  console.log('registering')
  // alert('!!! src/may16-galaxy-frontend/src/main.js')
  try {
    const urlParams = new URLSearchParams({
      DFX_NETWORK: process.env.DFX_NETWORK,
      CANISTER_ID_MAY16_GALAXY_FRONTEND: process.env.CANISTER_ID_MAY16_GALAXY_FRONTEND,
      CANISTER_ID_MAY16_GALAXY_BACKEND: process.env.CANISTER_ID_MAY16_GALAXY_BACKEND,
      CANISTER_ID_INTERNET_IDENTITY: process.env.CANISTER_ID_INTERNET_IDENTITY,
    }).toString()
    await navigator.serviceWorker.register(`/galaxy-service-worker.js?${urlParams}`, { scope: '/', type: 'module' })
      // .then(reg => {
      //   reg.onupdatefound = () => {
      //     const installingWorker = reg.installing;
      //     installingWorker.onstatechange = () => {
      //       if (installingWorker.state === 'installed' &&
      //         navigator.serviceWorker.controller) {
      //         location.reload();
      //       }
      //     };
      //   };
      // });

    // handover control to service worker index page handler
    location.reload()
  } catch (err) {
    console.error(err)
    document.body.classList.add('error')
    document.body.textContent = err.toString()
  }
})

