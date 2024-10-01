/**
 * triggerOnIdle
 * @see MDN Polyfill https://github.com/behnammodi/polyfill/blob/master/window.polyfill.js#L7-L24
 */

export function triggerOnIdle(callback: any) {
  if ( window && 'requestIdleCallback' in window ) {
    return requestIdleCallback(callback);
  }
  return setTimeout(() => callback(), 1);
}

/**
 * loadScript
 */

export function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    if ( typeof document === 'undefined' ) {
      reject('Can not be loaded on')
    }

    const script = document.createElement('script');

    script.src = src;
    script.async = true;

    document.body.appendChild(script);

    function handleOnLoad() {
      cleanup();
      resolve({
        script
      });
    }

    function handleOnError() {
      cleanup();
      reject({
        script
      })
    }

    script.addEventListener('load', handleOnLoad);
    script.addEventListener('error', handleOnError);

    function cleanup() {
      script.removeEventListener('load', handleOnLoad);
      script.removeEventListener('error', handleOnError);
    }
  })
}