'use strict';

const USERS = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const getUser = async (username) => {
  try {
    const response = await axios.get(USERS + username);
    userCard(response.data);
  } catch (err) {
    if (err.response.status == 404) {
      showError('Profile not found');
    }
  }
};

const userCard = (user) => {
  let card = `
      <div class="card">
          <div class="accaunt">
            <img
              src="${user.avatar_url}"
              alt="${user.login}"
              class="avatar"
            />
            <span class="username">${user.login}</span>
            <span class="blog">${user.blog}</span> 
          </div>
          <div class="user-info">
            <h2>${user.name == null ? '' : user.name}</h2>
            <div class="info">
              <div class="location"><i class="fas fa-map-marker-alt"></i>Location: <span>${
                user.location == null ? 'Earth' : user.location
              }</span></div>
              <div class="company"><i class="fas fa-building"></i>Company: <span>${
                user.company == null ? 'Not mentioned' : user.company
              }</span></div>
            </div>
            <p>
            ${user.bio == null ? '' : user.bio}
            </p>
            <ul>
              <li><i class="fas fa-user-users"></i>${
                user.followers
              } <strong>Followers</strong></li>
              <li><i class="fas fa-friends"></i></i>${
                user.following
              } <strong>Followings</strong></li>
              <li><i class="fas fa-file-code"></i>${
                user.public_repos
              } <strong>Repos</strong></li>
            </ul>
            <div id="repos"></div>
          </div>
        </div>
`;
  if (user.value !== null) {
    main.innerHTML = card;
  }
};

const showError = (messege) => {
  const errorMessage = `
  <span class="error">${messege}</span>
  `;
  main.innerHTML = errorMessage;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});
