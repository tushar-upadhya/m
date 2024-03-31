export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw Error("serviceWorker are not supported by this brower");
  }

  await navigator.serviceWorker.register("/serviceWorker.js");
}

export async function getReadyServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw Error("serviceWorker are not supported by this brower");
  }
  return navigator.serviceWorker.ready;
}
