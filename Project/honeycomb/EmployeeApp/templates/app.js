let currentUser = null;
let ideas = []; // {id, userId, userName, userPhoto, name, desc, imageDataUrl, likes: Set, createdAt}

function readFileAsDataURL(input, callback) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = e => callback(e.target.result);
    reader.readAsDataURL(input.files[0]);
  } else {
    callback(null);
  }
}

function clearAddIdeaForm() {
  document.getElementById("ideaName").value = "";
  document.getElementById("ideaDesc").value = "";
  document.getElementById("ideaImage").value = "";
  document.getElementById("ideaPreview").src = "";
}

function renderIdeaCard(idea, allowLike = true) {
  const card = document.createElement("div");
  card.className = "idea-card";

  const topInfo = document.createElement("div");
  topInfo.className = "top-info";

  const userImg = document.createElement("img");
  userImg.src = idea.userPhoto;
  userImg.alt = idea.userName;

  const username = document.createElement("div");
  username.className = "username";
  username.textContent = idea.userName;

  topInfo.appendChild(userImg);
  topInfo.appendChild(username);

  const nameEl = document.createElement("div");
  nameEl.className = "idea-title";
  nameEl.textContent = idea.name;

  const ideaImg = document.createElement("img");
  ideaImg.className = "idea-image";
  ideaImg.src = idea.imageDataUrl;
  ideaImg.alt = idea.name;

  const descLike = document.createElement("div");
  descLike.className = "desc-like";

  const desc = document.createElement("div");
  desc.className = "description";
  desc.textContent = idea.desc;

  descLike.appendChild(desc);

  if (allowLike && currentUser) {
    const likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    likeBtn.innerHTML = `❤️ ${idea.likes.size}`;
    if (idea.likes.has(currentUser.email)) {
      likeBtn.classList.add("liked");
    }

    likeBtn.onclick = () => {
      if (idea.likes.has(currentUser.email)) {
        idea.likes.delete(currentUser.email);
      } else {
        idea.likes.add(currentUser.email);
      }
      renderAllFeeds();
    };

    descLike.appendChild(likeBtn);
  }

  card.appendChild(topInfo);
  card.appendChild(nameEl);
  card.appendChild(ideaImg);
  card.appendChild(descLike);

  return card;
}

function renderFeed(containerId, ideaList, allowLike = true) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  if (!ideaList.length) {
    const emptyMsg = document.createElement("div");
    emptyMsg.textContent = "No ideas yet.";
    emptyMsg.className = "empty-msg";
    container.appendChild(emptyMsg);
    return;
  }
  ideaList.forEach((idea) => {
    container.appendChild(renderIdeaCard(idea, allowLike));
  });
}

function renderAllFeeds() {
  const homeIdeas = [...ideas].sort((a, b) => b.createdAt - a.createdAt);
  renderFeed("homeFeed", homeIdeas);

  const rankingIdeas = [...ideas].sort((a, b) => {
    const diff = b.likes.size - a.likes.size;
    return diff !== 0 ? diff : b.createdAt - a.createdAt;
  });
  renderFeed("rankingFeed", rankingIdeas);

  if (currentUser) {
    const myIdeas = ideas
      .filter(i => i.userId === currentUser.email)
      .sort((a, b) => b.createdAt - a.createdAt);
    renderFeed("myIdeasFeed", myIdeas);
  }
}

function switchPage(pageId) {
  if (!currentUser && pageId !== "profile") {
    alert("Please create your profile first.");
    pageId = "profile";
  }

  document.querySelectorAll(".page").forEach(p => p.classList.remove("visible"));
  const page = document.getElementById(pageId);
  if (page) page.classList.add("visible");

  if (["home", "ranking", "myideas"].includes(pageId)) {
    renderAllFeeds();
  }

  highlightActiveIcon("btn" + capitalize(pageId));
}

function highlightActiveIcon(activeId) {
  ["btnHome", "btnProfile", "btnRanking", "btnMyIdeas", "btnAdd"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("active", id === activeId);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// === Events ===
document.getElementById("profilePicInput").addEventListener("change", function () {
  readFileAsDataURL(this, (dataUrl) => {
    if (dataUrl) {
      document.getElementById("profilePreview").src = dataUrl;
    }
  });
});

document.getElementById("ideaImage").addEventListener("change", function () {
  readFileAsDataURL(this, (dataUrl) => {
    if (dataUrl) {
      document.getElementById("ideaPreview").src = dataUrl;
    }
  });
});

document.getElementById("saveProfileBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  const photoDataUrl = document.getElementById("profilePreview").src;

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }
  if (!photoDataUrl || photoDataUrl === "") {
    alert("Please upload a profile picture.");
    return;
  }

  currentUser = { name, email, password, photoDataUrl };
  alert("Profile saved! Welcome, " + name + ".");
  switchPage("home");
});

document.getElementById("submitIdeaBtn").addEventListener("click", () => {
  if (!currentUser) {
    alert("Please create profile first!");
    switchPage("profile");
    return;
  }

  const name = document.getElementById("ideaName").value.trim();
  const desc = document.getElementById("ideaDesc").value.trim();
  const imageInput = document.getElementById("ideaImage");

  if (!name || !desc) {
    alert("Please fill name and description.");
    return;
  }
  if (!imageInput.files || imageInput.files.length === 0) {
    alert("Please upload an image.");
    return;
  }
  if (name.length > 50) {
    alert("Idea name max 50 characters.");
    return;
  }
  if (desc.length > 250) {
    alert("Description max 250 characters.");
    return;
  }

  readFileAsDataURL(imageInput, (imageDataUrl) => {
    if (!imageDataUrl) {
      alert("Error reading image.");
      return;
    }
    const id = Date.now().toString();
    ideas.push({
      id,
      userId: currentUser.email,
      userName: currentUser.name,
      userPhoto: currentUser.photoDataUrl,
      name,
      desc,
      imageDataUrl,
      likes: new Set(),
      createdAt: new Date()
    });
    alert("Idea posted!");
    clearAddIdeaForm();
    switchPage("home");
    renderAllFeeds();
  });
});
