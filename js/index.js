
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/'+username.value+'/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' (' + r.owner.login + ') <br> <a href="https://github.com/' + r.owner.login + '/' + r.name + '/">https://github.com/' + r.owner.login + '/' + r.name + '/</a> <br> <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">-Get Commits</a> <br> <a href="#" data-repo="' +
        r.name +
        '" onclick="getBranches(this)">-Get Branches</a></li><br>'
      ).join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}


function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/'+ username.value +'/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> (' + commit.commit.author.name +') - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/'+ username.value +'/' + name + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</strong> (protected:' + branch.protected + ') </li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
