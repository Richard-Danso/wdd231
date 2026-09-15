document.addEventListener("DOMContentLoaded", () => {
  // Footer Dates
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Hamburger Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamburger.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
  });

  // Toggle Grid/List Views
  const gridBtn = document.getElementById("grid-btn");
  const listBtn = document.getElementById("list-btn");
  const membersContainer = document.getElementById("members-container");

  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
    gridBtn.classList.add("active-view");
    listBtn.classList.remove("active-view");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
    listBtn.classList.add("active-view");
    gridBtn.classList.remove("active-view");
  });

  // Fetch Member JSON Data
  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Network response failed");
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error fetching member data:", error);
      membersContainer.innerHTML = "<p>Failed to load member directory.</p>";
    }
  }

  function displayMembers(members) {
    membersContainer.innerHTML = "";
    members.forEach((member) => {
      const card = document.createElement("section");
      card.classList.add("member-card");

      const membershipText = 
        member.membershipLevel === 3 ? "Gold Member" :
        member.membershipLevel === 2 ? "Silver Member" : "Member";

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
        <h3>${member.name}</h3>
        <p class="category">${member.category}</p>
        <p class="address">${member.address}</p>
        <p class="phone">${member.phone}</p>
        <p class="membership-level level-${member.membershipLevel}">${membershipText}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      `;

      membersContainer.appendChild(card);
    });
  }

  fetchMembers();
});