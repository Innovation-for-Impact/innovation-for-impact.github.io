document.addEventListener("DOMContentLoaded", function () {
    async function loadComponent(id, file) {
        let container = document.getElementById(id);
        if (container) {
            try {
                let response = await fetch(file);
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                let html = await response.text();
                container.innerHTML = html;
            } catch (error) {
                console.error(error);
                container.innerHTML = `<p style="color: red;">Error loading ${file}</p>`;
            }
        }
    }

    loadComponent("navbar", "/components/navbar.html");
    loadComponent("footer", "/components/footer.html");
});
