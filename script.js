import { portfolioUpdated, projects } from "./data/projects.js";

const list = document.querySelector("#project-list");
const escapeHtml = (value) => value.replace(/[&<>"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;"
}[character]));

list.innerHTML = projects.map((project) => `
  <article class="project" data-project="${project.id}">
    <button class="project-summary" type="button" aria-expanded="false" aria-controls="project-${project.id}">
      <span class="project-number">${project.id}</span>
      <span class="project-title"><span class="project-category">${escapeHtml(project.category)}</span><span class="project-name">${escapeHtml(project.title)}</span></span>
      <span class="project-summary-text">${escapeHtml(project.summary)}</span>
      <span class="project-arrow" aria-hidden="true">↗</span>
    </button>
    <div class="project-detail" id="project-${project.id}" hidden>
      <div class="case-copy">
        <p class="case-kicker">THE PRODUCT DECISION</p>
        <p>${escapeHtml(project.challenge)}</p>
        <p class="case-kicker">HOW IT WORKS</p>
        <p>${escapeHtml(project.approach)}</p>
      </div>
      <div class="case-facts">
        <div>
          <h4>TECHNOLOGY</h4>
          <ul class="tech-list">${project.technology.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>OPERATING MODEL</h4>
          <p>${escapeHtml(project.operation)}</p>
        </div>
      </div>
    </div>
  </article>
`).join("");

list.addEventListener("click", (event) => {
  const button = event.target.closest(".project-summary");
  if (!button) return;

  const project = button.closest(".project");
  const detail = project.querySelector(".project-detail");
  const willOpen = detail.hidden;

  list.querySelectorAll(".project").forEach((item) => {
    const itemButton = item.querySelector(".project-summary");
    const itemDetail = item.querySelector(".project-detail");
    item.classList.remove("is-open");
    itemButton.setAttribute("aria-expanded", "false");
    itemDetail.hidden = true;
  });

  if (willOpen) {
    project.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    detail.hidden = false;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#portfolio-updated").textContent = `Curated from private work · ${portfolioUpdated}`;
