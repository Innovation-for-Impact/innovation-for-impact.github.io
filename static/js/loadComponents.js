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

    Promise.all([loadNavbar, loadFooter]).then(() => {
        console.log("Components loaded successfully");
    });
});