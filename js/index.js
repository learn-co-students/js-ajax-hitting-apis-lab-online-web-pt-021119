
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

function  displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul> ${branches 
  .map(
  branch =>
  '<li><strong>' +
  branch.name + 
  '</strong></li>').join('')}
  </ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos
  .map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login +'"onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login +'"onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  
   const req = new XMLHttpRequest();
   
   const username =  document.getElementById("username").value;
   req.open('GET', `https://api.github.com/users/${username}/repos`)
   req.send();
}
  
  function   getCommits(el) {
  const username = el.dataset.username
  const repoName = el.dataset.repository 
   const req = new XMLHttpRequest();
   req.addEventListener("load", displayCommits)
   req.open("GET",`https://api.github.com/repos/${username}/${repoName}/commits`)
   req.send()
    
  }
  
function  getBranches(el) {
  const username = el.dataset.username
  const repoName = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/branches`)
  req.send()
}
