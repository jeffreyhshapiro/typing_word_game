let cached = {}

module.exports = {
  setCache: (key, data) => {
    cached[key] = data;

    // after data is set, we have 10 mins to use the cached data before its deleted
    setTimeout(() => {
      delete cached[key];
    }, 10000)
    return true;
  },
  getCache: (key) => {
    return cached[key];
  }
}
