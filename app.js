// Sai Suhas Kodumuru — clean-room portfolio scripts.
// Skills data is transcribed from Sai's resume (Nov 2026). No external code.

const SKILL_GROUPS = [
  {
    id: "languages",
    label: "Languages",
    skills: ["Java 8 / 11 / 17 / 21", "Python", "SQL / PL-SQL", "TypeScript", "JavaScript", "C", "C++"],
  },
  {
    id: "backend",
    label: "Back End",
    skills: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Cloud", "Spring AI", "Hibernate / JPA", "REST", "GraphQL", "FastAPI", "Microservices"],
  },
  {
    id: "frontend",
    label: "Front End",
    skills: ["Angular 8-18", "React", "RxJS", "NgRx", "Redux", "HTML5", "CSS3", "Bootstrap"],
  },
  {
    id: "ai",
    label: "AI / LLM",
    skills: ["Azure OpenAI (GPT-4)", "OpenAI API", "LangChain", "LangGraph", "RAG", "Azure Cognitive Search", "FAISS", "Pinecone", "Hugging Face", "Prompt & context engineering", "Tool / function calling", "Structured outputs", "Agentic workflows"],
  },
  {
    id: "data",
    label: "Data & Messaging",
    skills: ["PostgreSQL", "Oracle", "MySQL", "MongoDB", "Cosmos DB", "Redis", "Kafka", "SQS", "Azure Event Hubs", "Spark", "Spring Batch"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    skills: ["AWS (EC2, S3, Lambda, EKS, Bedrock, SageMaker)", "Azure (AKS, App Service, Functions, Key Vault, Monitor)", "Docker", "Kubernetes", "Helm", "Terraform", "Jenkins", "GitHub Actions", "Azure DevOps", "GitHub Copilot"],
  },
  {
    id: "testing",
    label: "Testing & Monitoring",
    skills: ["JUnit", "Mockito", "Selenium", "Cucumber", "Jasmine", "Karma", "ELK", "Splunk", "Dynatrace", "Grafana", "Application Insights", "Azure Monitor", "Prometheus"],
  },
];

const grid = document.getElementById("skills-grid");
const emptyMsg = document.getElementById("skills-empty");
const searchInput = document.getElementById("skill-search");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";
let query = "";

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

function highlight(text, q) {
  if (!q) return escapeHtml(text);
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return escapeHtml(text);
  return (
    escapeHtml(text.slice(0, idx)) +
    "<mark>" + escapeHtml(text.slice(idx, idx + q.length)) + "</mark>" +
    escapeHtml(text.slice(idx + q.length))
  );
}

function renderSkills() {
  const q = query.trim().toLowerCase();
  let visible = 0;
  grid.innerHTML = "";

  for (const group of SKILL_GROUPS) {
    if (activeFilter !== "all" && group.id !== activeFilter) continue;
    const matches = group.skills.filter((s) => !q || s.toLowerCase().includes(q));
    if (matches.length === 0) continue;
    visible += matches.length;

    const section = document.createElement("div");
    section.className = "skill-group";
    const heading = document.createElement("h3");
    heading.textContent = group.label;
    const list = document.createElement("ul");
    for (const skill of matches) {
      const item = document.createElement("li");
      item.innerHTML = highlight(skill, q);
      list.appendChild(item);
    }
    section.appendChild(heading);
    section.appendChild(list);
    grid.appendChild(section);
  }

  emptyMsg.hidden = visible !== 0;
}

searchInput.addEventListener("input", () => {
  query = searchInput.value;
  renderSkills();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderSkills();
  });
});

// Project cards: pressing Enter on a focused card opens its case study.
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const link = card.querySelector(".card-links a");
      if (link) window.open(link.href, "_blank", "noopener");
    }
  });
});

renderSkills();
