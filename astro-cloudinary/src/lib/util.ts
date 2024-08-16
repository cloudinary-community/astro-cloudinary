/**
 * pollForProcessingImage
 */

export async function pollForProcessingImage(src: string) {
  interface ResponseError extends Error {
    status: number;
  }
  
  try {
    await new Promise((resolve, reject) => {
      fetch(src).then(res => {
        if ( !res.ok ) {
          reject(res);
          return;
        }
        resolve(res);
      });
    });
  } catch(e: unknown) {
    const status = (e as ResponseError)?.status;
    
    // Timeout for 250ms before trying to fetch again to avoid overwhelming requests

    if ( status === 423 ) {
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 250));
      return await pollForProcessingImage(src);
    }

    return false;
  }
  
  return true;
}