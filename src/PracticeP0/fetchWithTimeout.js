async function fetchWithTimeout(path, config, ttlMs = 1000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, ttlMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}
