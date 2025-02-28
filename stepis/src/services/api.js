import auth from './auth'

class ApiService {
  async fetch(url, options = {}) {
    if (!options.headers) {
      options.headers = {}
    }
    
    if (auth.isAuthenticated()) {
      options.headers.Authorization = `Bearer ${auth.accessToken}`
    }
    
    return fetch(url, options)
  }
  
  // Add your API methods here
}

export default new ApiService()