document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired");

    const loadNavbar = fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            console.log("Navbar HTML fetched");
            document.getElementById('navbar').innerHTML = data;
            console.log("Navbar HTML inserted");
        });

    const loadFooter = fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            console.log("Footer HTML fetched");
            document.getElementById('footer').innerHTML = data;
            console.log("Footer HTML inserted");
        });

    Promise.all([loadFooter]).then(() => {
        console.log("Components loaded successfully");
    });
});

fetch("/static/services.json")
.then(response => response.json())
.then(serviceMembers => {
    const servicesGrid = document.querySelector(".services-grid");
    serviceMembers.forEach(member => {
        const servicesDiv = document.createElement("div");
        servicesDiv.classList.add("member");
        servicesDiv.innerHTML = `
            <div class="circle-container">
                <svg class="circle" xmlns="http://www.w3.org/2000/svg" width="150" height="auto" viewBox="0 0 250 250" fill="none">
                <circle cx="125" cy="125" r="125" fill="white"/>
                </svg>
                <img src="${member.image}" alt="${member.service}">
            </div>
            <h3>${member.service}</h3>
        `;
        servicesGrid.appendChild(servicesDiv);
    });
});