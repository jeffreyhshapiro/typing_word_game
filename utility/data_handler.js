let cached = {}

module.exports = {
  setCache: (key, data) => {
    cached[key] = data;
    return true;
  },
  getCache: (key) => {
    return cached[key];
  },
  deleteData: (key) => {
    delete cached[key];
  }
}
