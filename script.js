'use strict';

const API_ENDPOINT = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const getUser = async (username) => {
  try {
    const response = await axios.get(API_ENDPOINT + username);
    userCard(response.data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      showError('Profile not found');
    }
  }
};

const getRepos = async (username) => {
  try {
    const response = await axios.get(API_ENDPOINT + username + '/repos');
    reposToCard(response.data);
  } catch (err) {
    console.warn('Repo not found');
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
              <div class="company"><i class="fas fa-building"></i>Work: <span>${
                user.company == null ? 'Unknown' : user.company
              }</span></div>
            </div>
            <p>
            ${user.bio == null ? '' : user.bio}
            </p>
            <ul>
              <li><i class="fas fa-users"></i>${
                user.followers
              } <strong>Followers</strong></li>
              <li><i class="fas fa-user-friends"></i>${
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

const reposToCard = (repos) => {
  const userRepos = document.getElementById('repos');

  repos.slice(0, 6).forEach((repo) => {
    const userRepo = document.createElement('a');
    userRepo.classList.add('repo');
    userRepo.href = repo.html_url;
    userRepo.target = '_blank';
    userRepo.innerText = repo.name;

    userRepos.appendChild(userRepo);
  });
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
