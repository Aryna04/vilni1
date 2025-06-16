const content = document.getElementById('main-content');
let ideas = JSON.parse(localStorage.getItem('ideas')) || [];

function setView(view) {
  content.style.opacity = 0;
  setTimeout(() => {
    content.innerHTML = view;
    content.style.opacity = 1;
  }, 200);
}

// Profile Page
document.getElementById('btn-profile').onclick = () => {
  setView(`
    <h2>Your Profile</h2>
    <input type="file" id="profile-pic" />
    <br/><br/>
    <input type="text" placeholder="Your Name" />
    <input type="email" placeholder="Email Address" />
    <input type="password" placeholder="Password" />
  `);
};

// Ranking Page
document.getElementById('btn-ranking').onclick = () => {
  const sortedIdeas = [...ideas].sort((a, b) => b.likes - a.likes);
  setView('<h2>Top Ideas</h2>' + sortedIdeas.map(renderCard).join(''));
};

// My Ideas
document.getElementById('btn-my-ideas').onclick = () => {
  const myIdeas = ideas;
  setView('<h2>My Ideas</h2>' + myIdeas.map(renderCard).join(''));
};

// Add Idea
document.getElementById('btn-add').onclick = () => {
  setView(`
    <h2>Add New Idea</h2>
    <input type="text" id="idea-name" placeholder="Idea Name" />
    <textarea id="idea-desc" placeholder="Idea Description"></textarea>
    <input type="file" id="idea-img" />
    <br/><br/>
    <button class="submit-btn" onclick="submitIdea()">Submit</button>
  `);
};

// Submit Idea
window.submitIdea = function () {
  const name = document.getElementById('idea-name').value;
  const desc = document.getElementById('idea-desc').value;
  const imgInput = document.getElementById('idea-img');

  if (!name || !desc || !imgInput.files[0]) return alert('Please fill all fields');

  const reader = new FileReader();
  reader.onload = function (e) {
    const newIdea = {
      name,
      desc,
      img: e.target.result,
      likes: 0,
    };
    ideas.push(newIdea);
    localStorage.setItem('ideas', JSON.stringify(ideas));
    alert('Idea added!');
    document.getElementById('btn-my-ideas').click();
  };
  reader.readAsDataURL(imgInput.files[0]);
};

// Render Idea Card
function renderCard(idea, i) {
  return `
    <div class="idea-card">
      <h3>${idea.name}</h3>
      <p>${idea.desc}</p>
      <img src="${idea.img}" class="idea-image" />
      <div class="likes">
        <button onclick="likeIdea(${i})">❤️</button>
        <span>${idea.likes}</span>
      </div>
    </div>
  `;
}

window.likeIdea = function (index) {
  ideas[index].likes++;
  localStorage.setItem('ideas', JSON.stringify(ideas));
  document.getElementById('btn-ranking').click();
};
