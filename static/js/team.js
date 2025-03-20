fetch("/static/team_members/board.json")
.then(response => response.json())
.then(teamMembers => {
    const boardGrid = document.querySelector(".board-grid");
    teamMembers.forEach(member => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("member");
        memberDiv.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
            <a href="${member.linkedin}" target="_blank">
                <img class="linkedin" src="images/linkedin-icon.png" alt="LinkedIn">
            </a>
        `;
        boardGrid.appendChild(memberDiv);
    });
});

fetch("/static/team_members/team.json")
.then(response => response.json())
.then(teamMembers => {
    const boardGrid = document.querySelector(".team-grid");
    teamMembers.forEach(member => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("member");
        memberDiv.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <a href="${member.linkedin}" target="_blank">
                <img class="linkedin" src="images/linkedin-icon.png" alt="LinkedIn">
            </a>
        `;
        boardGrid.appendChild(memberDiv);
    });
});