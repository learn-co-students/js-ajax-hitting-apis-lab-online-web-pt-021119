function preventRefreshOnSubmit(){
    document.querySelector('form').addEventListener('submit', function(event){
      event.preventDefault()
    })
}

preventRefreshOnSubmit()

function retrieveRepoUsername() {
  return document.querySelector('input#username').value
}

function getRepositories() {
  var req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${retrieveRepoUsername()}/repos`);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  var repoList = `<ul>${repos
    .map(
      r =>
        '<li>' + `<a href="${r.html_url}" >` + r.name + '</a>' + ' - <a href="#"' + ' data-username="' + r.owner.login + '" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' - ' +

        '<a href="#"' + ' data-username="' + r.owner.login + '" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a>'

        + '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  var username = el.dataset.username;
  // Using the API with my own username returns my repositories in el.dataset.repo rather than el.dataset.repository
  var repository = el.dataset.repository;
  var req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);

  var commitElement = function(commit) {
    if (commit.author) {
      return `<li><strong>${commit.commit.author.name} (${commit.author.login})</strong> - ${commit.commit.message}</li>`
    }
  }

  var commitsList  = '<ul>' + commits.map(function(commit) {
    return commitElement(commit)
  }).join('') + '</ul>'

  document.getElementById('details').innerHTML = commitsList;
}

// function getBranches()
function getBranches(el) {
  var username = el.dataset.username;
  var repository = el.dataset.repository;
  var req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}

// function displayBranches()
function displayBranches() {
  var branches = JSON.parse(this.responseText);
  var branchElement = function(branch) {
    if (branch) {
      return `<li>[${branch.name}]</li>`
    }
  }

  var branchesList = '<ul>' + branches.map(branch => branchElement(branch)).join('') + '</ul>'

  document.getElementById('details').innerHTML = branchesList;
}
