// your code here
function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '-' + commit.commit.committer.name +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el){
  console.log(el.dataset.repo)
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  //req.open('GET', `https://api.github.com/repos/${name}/commits`); works
  //for lab purpose:
  req.open('GET', `https://api.github.com/repos/octocat/Spoon-Knife/commits`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</strong>' +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/branches');
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r => '<li>' +
       r.full_name + " - " + r.html_url + " - " + r.name +
       ' - <a href="#" data-repo="' +
       r.full_name + '" onclick="getCommits(this)">Get Commits</a></li>' +
       ' - <a href="#" data-repo="' +
       r.name + '" onclick="getBranches(this)">Get Branches</a></li>'
      )
    .join("")}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const request = new XMLHttpRequest();
  let username = document.getElementById('username').value;
  request.addEventListener('load', displayRepositories);
  console.log(`https://api.github.com/users/${username}/repos`)
  request.open('GET', `https://api.github.com/users/${username}/repos`);
  request.send();
}