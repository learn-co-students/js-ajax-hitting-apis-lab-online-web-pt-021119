// your code here
function getRepositories() {
  const username= document.getElementById('username').value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  console.log(`https://api.github.com/users/${username}/repos`)
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send()
}


function displayRepositories(){
  const repos = JSON.parse(this.responseText)
  console.log(repos); 
  const repoList= `<ul>${repos.map(r => '<li>' +
       r.full_name + " - " + r.html_url + " - " + r.name +
       ' - <a href="#" data-repo="' +
       r.full_name + '" onclick="getCommits(this)">Get Commits</a></li>' +
       ' - <a href="#" data-repo="' +
       r.name + '" onclick="getBranches(this)">Get Branches</a></li>'
      )
    .join("")}</ul>`;
    
    document.getElementById('repositories').innerHTML = repoList;
    
}


function getCommits(el)
{
  const name= el.dataset.repository;
  const username= el.dataset.username;  
  const req = new XMLHttpRequest(); 
req.addEventListener('load', displayCommits); 
req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits')
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

function  getBranches(el) {
	const name = el.dataset.repository;
	const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}

function displayBranches(){
 const branches= JSON.parse(this.responseText); 
 console.log(branches); 
 const branchesList= `<ul>${branches
    .map(
      branch =>
        '<li>' + branch.name + '</li>' ).join('')}</ul>`;
        document.getElementById('details').innerHTML= branchesList
}
