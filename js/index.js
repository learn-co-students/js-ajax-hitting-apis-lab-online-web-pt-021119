function getRepositories(){
	const req = new XMLHttpRequest()
	req.addEventListener('load', displayRepositories)
	const username = document.getElementById('username').value
	req.open('GET', `https://api.github.com/users/${username}/repos`);
	req.send()
}

function displayRepositories(){
	const repos = JSON.parse(this.responseText)
	console.log(repos)
	const repolist = `<ul>${repos.map((repo) => "<li><a href=# data-repository='" + repo.name + "' data-username='" + repo.owner.login + "'onclick='getCommits(this)'>" + repo.name + "</a>" + "-<a href='" + repo.clone_url + "'>link to repo</a></li>").join('')}</ul>`
	document.getElementById('repositories').innerHTML = repolist
}

function getCommits(el) {
	const name = el.dataset.repository;
	const username = el.dataset.username;
	debugger
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
	const commits = JSON.parse(this.responseText);
	console.log(commits)
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
				'</strong> - ' +
				'-' +
				commit.author.login +
				'-' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
	const name = el.dataset.repository;
	const username = el.dataset.username;
	debugger
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	console.log(branches)
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
				'</strong></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}