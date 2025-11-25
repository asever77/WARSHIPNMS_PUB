const getAccessToken = function () {
  const headers = {
    headers: {
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
    }
  }

  return headers
}

const getHost = function () {
  return 'http://localhost:8080'
}

export default {
  getAccessToken, getHost
}
