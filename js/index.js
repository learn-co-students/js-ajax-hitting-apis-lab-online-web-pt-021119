function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const username = document.getElementById("username").value;
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  var cleanCommits = commits.filter(function (el) {
  return el.author != null;});
  console.log(cleanCommits);
  const commitsList = `<ul>${cleanCommits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}
