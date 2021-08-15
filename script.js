'use strict';

const USERS = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
  try {
    const response = await axios.get(USERS + username);
    console.log(response.data);
  } catch (err) {
    console.warn(err);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});
