// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.querySelector('input#username').value
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function getBranches(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name + ' - ' + r.html_url + ' - ' + r.owner.login + 
        ' - <a href="#" data-repo="' +
        '" onclick="getCommits(this)">Get Commits</a>' + 
        ' - <a href="#" data-repo="' +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        '<strong>' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches.map(
    branch => 
    '<li><strong>' + 
    branch.name + 
    '</strong></li>'
    )
    .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}
