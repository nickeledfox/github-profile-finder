const API_ENDPOINT = 'https://api.github.com/users/';

function getUser(username) {
  axios
    .get(API_ENDPOINT + username)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
}
getUser('mia-7-7');
