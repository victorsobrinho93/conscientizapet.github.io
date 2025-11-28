const templatesCache = {};
const state = { at: "home" };

async function loadTemplate(name) {
    if (!templatesCache[name]) {
        const res = await fetch(`/templates/${name}.html`);
        const html = await res.text();
        templatesCache[name] = html;
    }
    return templatesCache[name];
}

async function render(page) {
    const main = document.querySelector("main");
    main.innerHTML = await loadTemplate(page);
}

const aboutBtn = document.getElementById("about-btn");

function renderLink(htmlPage, textContent) {
    const a = Object.assign(document.createElement("a"), {
        href: "#",
        textContent: textContent,
    });
    a.addEventListener("click", () => {
        render(htmlPage);
        state.at = htmlPage;
        renderBar();
    });
    return a;
}

function socialLinks() {
    const div = Object.assign(document.createElement("div"), {
        id: "nav-redes",
        innerHTML: `<a href="#"
                        ><img
                            src="assets/icons/icons8-instagram-50.svg"
                            alt=""
                            class="icons"
                    /></a>
                    <a href="#"
                        ><img
                            src="assets/icons/icons8-tiktok-50.svg"
                            alt=""
                            class="icons"
                    /></a>
                    <a href=""
                        ><img
                            src="assets/icons/icons8-x-48.svg"
                            alt=""
                            class="icons"
                    /></a>`,
    });
    return div;
}

function renderBar() {
    const nav = document.getElementById("nav-menu");
    nav.innerHTML = ``;
    const links = {
        home: "PÁGINA INICIAL",
        about: "QUEM SOMOS",
        interview: "ENTREVISTAS",
    };
    for (let key in links) {
        if (state.at !== key) {
            nav.appendChild(renderLink(key, links[key]));
        }
    }
    nav.appendChild(socialLinks());
}

document.addEventListener("DOMContentLoaded", () => {
    render("home");
    renderBar();
});
