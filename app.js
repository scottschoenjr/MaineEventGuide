/*
  Family Field Guide
  ------------------
  To connect a published Google Sheet, replace SHEET_CSV_URL with the CSV URL.
  Keep the column names from data/sample_family.csv.
*/

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1nihRg-i-8u1IDucOoSxz1mPhxQ6d0hCh1GswKjYyW3c/export?format=csv&gid=0";

const samplePeople = [
  {
    id: "ava",
    name: "Ava Bennett",
    family_side: "Bride side",
    relationship: "Bride's older sister",
    role: "Matron of honor",
    pronouns: "she/her",
    hometown: "Portland, OR",
    bio: "Knows every childhood story and has strong opinions about dessert tables.",
    fun_fact: "Can identify most birds by sound.",
    conversation_starter: "Ask about her backyard garden or her twins' latest chaos.",
    tags: "wedding party; siblings; gardening",
    photo_url: "",
    partner_id: "marco",
    parent_ids: "nora;george",
    child_ids: "",
    notes: "Best person to ask about bride-side family logistics."
  },
  {
    id: "marco",
    name: "Marco Ruiz",
    family_side: "Bride side",
    relationship: "Married to Ava",
    role: "Family wrangler",
    pronouns: "he/him",
    hometown: "Portland, OR",
    bio: "Calm, funny, and usually holding someone's coat or snack.",
    fun_fact: "Makes excellent espresso martinis.",
    conversation_starter: "Ask about his favorite Portland food carts.",
    tags: "married in; food; cocktails",
    photo_url: "",
    partner_id: "ava",
    parent_ids: "",
    child_ids: "",
    notes: "Great example of the intended audience for this app."
  },
  {
    id: "nora",
    name: "Nora Bennett",
    family_side: "Bride side",
    relationship: "Bride's mother",
    role: "Mother of the bride",
    pronouns: "she/her",
    hometown: "Boise, ID",
    bio: "Warm, direct, and likely to know where everything is.",
    fun_fact: "Retired elementary school principal.",
    conversation_starter: "Ask about her road trip to all 50 states.",
    tags: "parents; travel; organizer",
    photo_url: "",
    partner_id: "george",
    parent_ids: "",
    child_ids: "ava;zoe",
    notes: "Prefers first names, not titles."
  },
  {
    id: "george",
    name: "George Bennett",
    family_side: "Bride side",
    relationship: "Bride's father",
    role: "Father of the bride",
    pronouns: "he/him",
    hometown: "Boise, ID",
    bio: "Quiet at first, then unexpectedly hilarious.",
    fun_fact: "Builds wooden kayaks.",
    conversation_starter: "Ask what he is currently building in the garage.",
    tags: "parents; woodworking; outdoors",
    photo_url: "",
    partner_id: "nora",
    parent_ids: "",
    child_ids: "ava;zoe",
    notes: "Will happily talk tools."
  },
  {
    id: "zoe",
    name: "Zoe Bennett",
    family_side: "Bride side",
    relationship: "Bride's cousin",
    role: "Reader",
    pronouns: "she/her",
    hometown: "Denver, CO",
    bio: "The cousin who remembers everyone's birthday.",
    fun_fact: "Runs ultramarathons but hates treadmills.",
    conversation_starter: "Ask about mountain trails or her rescue dog, Pickle.",
    tags: "cousins; dogs; running",
    photo_url: "",
    partner_id: "",
    parent_ids: "",
    child_ids: "",
    notes: "Knows the extended Bennett cousin network."
  },
  {
    id: "liam",
    name: "Liam Chen",
    family_side: "Groom side",
    relationship: "Groom's younger brother",
    role: "Best man",
    pronouns: "he/him",
    hometown: "San Diego, CA",
    bio: "High-energy storyteller and unofficial late-night snack coordinator.",
    fun_fact: "Has a spreadsheet ranking breakfast burritos.",
    conversation_starter: "Ask for his top three burrito recommendations.",
    tags: "wedding party; siblings; food",
    photo_url: "",
    partner_id: "",
    parent_ids: "mei;daniel",
    child_ids: "",
    notes: "Good person to ask about groom-side friend groups."
  },
  {
    id: "mei",
    name: "Mei Chen",
    family_side: "Groom side",
    relationship: "Groom's mother",
    role: "Mother of the groom",
    pronouns: "she/her",
    hometown: "San Diego, CA",
    bio: "Thoughtful, observant, and always making sure people have eaten.",
    fun_fact: "Teaches weekend watercolor classes.",
    conversation_starter: "Ask about watercolor or the family dumpling recipe.",
    tags: "parents; art; cooking",
    photo_url: "",
    partner_id: "daniel",
    parent_ids: "",
    child_ids: "liam;mia",
    notes: "Loves a quiet corner and a cup of tea."
  },
  {
    id: "daniel",
    name: "Daniel Chen",
    family_side: "Groom side",
    relationship: "Groom's father",
    role: "Father of the groom",
    pronouns: "he/him",
    hometown: "San Diego, CA",
    bio: "Dry sense of humor, deep knowledge of old cameras.",
    fun_fact: "Still shoots film on family trips.",
    conversation_starter: "Ask about his favorite camera or travel photo.",
    tags: "parents; photography; travel",
    photo_url: "",
    partner_id: "mei",
    parent_ids: "",
    child_ids: "liam;mia",
    notes: "May be carrying a camera all weekend."
  },
  {
    id: "mia",
    name: "Mia Chen",
    family_side: "Groom side",
    relationship: "Groom's cousin",
    role: "Usher",
    pronouns: "she/her",
    hometown: "Austin, TX",
    bio: "Knows the groom-side group chat lore and can translate inside jokes.",
    fun_fact: "Plays bass in a cover band.",
    conversation_starter: "Ask about the best live music venue in Austin.",
    tags: "cousins; music; Austin",
    photo_url: "",
    partner_id: "sam",
    parent_ids: "",
    child_ids: "",
    notes: "Helpful bridge between cousins and friends."
  },
  {
    id: "sam",
    name: "Sam Patel",
    family_side: "Groom side",
    relationship: "Mia's partner",
    role: "Guest",
    pronouns: "they/them",
    hometown: "Austin, TX",
    bio: "Easygoing, curious, and always looking for a good coffee shop.",
    fun_fact: "Can solve a Rubik's cube in under a minute.",
    conversation_starter: "Ask where they found coffee near the venue.",
    tags: "married in; coffee; puzzles",
    photo_url: "",
    partner_id: "mia",
    parent_ids: "",
    child_ids: "",
    notes: "First big event with this side of the family."
  }
];

let people = [];
let activeFilter = "All";
let searchTerm = "";

const grid = document.getElementById("peopleGrid");
const searchInput = document.getElementById("searchInput");
const filterChips = document.getElementById("filterChips");
const resultCount = document.getElementById("resultCount");
const dataSourceStatus = document.getElementById("dataSourceStatus");
const dialog = document.getElementById("personDialog");
const dialogContent = document.getElementById("dialogContent");

function init() {
  people = samplePeople;
  loadPeople();
  bindEvents();
}

async function loadPeople() {
  if (!SHEET_CSV_URL) {
    dataSourceStatus.textContent = "Using built-in sample data";
    render();
    return;
  }

  dataSourceStatus.textContent = "Loading Google Sheet…";
  try {
    const response = await fetch(`${SHEET_CSV_URL}${SHEET_CSV_URL.includes("?") ? "&" : "?"}cachebust=${Date.now()}`);
    if (!response.ok) throw new Error(`Could not load sheet: ${response.status}`);
    const csvText = await response.text();
    people = parseCSV(csvText).filter(person => person.id && person.name);
    dataSourceStatus.textContent = `Loaded from Google Sheet`;
  } catch (error) {
    console.warn(error);
    people = samplePeople;
    dataSourceStatus.textContent = "Sheet unavailable; showing sample data";
  }
  render();
}

function bindEvents() {
  searchInput.addEventListener("input", event => {
    searchTerm = event.target.value.toLowerCase().trim();
    renderGrid();
  });

  document.getElementById("refreshButton").addEventListener("click", loadPeople);
  document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}

function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const sides = [...new Set(people.map(p => p.family_side).filter(Boolean))];
  const filters = ["All", ...sides, "Wedding party", "Married in / partners"];
  filterChips.innerHTML = "";

  filters.forEach(label => {
    const button = document.createElement("button");
    button.className = "chip";
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-pressed", String(label === activeFilter));
    button.addEventListener("click", () => {
      activeFilter = label;
      renderFilters();
      renderGrid();
    });
    filterChips.appendChild(button);
  });
}

function renderGrid() {
  const filtered = filteredPeople();
  grid.innerHTML = "";
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "person" : "people"}`;

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state">No matches. Try a different name, relationship, city, or tag.</div>`;
    return;
  }

  const template = document.getElementById("personCardTemplate");
  filtered.forEach(person => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector(".person-name").textContent = person.name;
    card.querySelector(".person-relationship").textContent = [person.relationship, person.role].filter(Boolean).join(" • ");
    card.querySelector(".person-bio").textContent = person.bio || person.conversation_starter || "More details coming soon.";
    renderAvatar(card.querySelector(".avatar"), person);
    renderTags(card.querySelector(".tag-row"), person);
    card.addEventListener("click", () => openPerson(person.id));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") openPerson(person.id);
    });
    grid.appendChild(card);
  });
}

function filteredPeople() {
  return people.filter(person => {
    const matchesFilter = activeFilter === "All"
      || person.family_side === activeFilter
      || (activeFilter === "Wedding party" && /wedding party|best man|maid|matron|reader|usher/i.test(`${person.tags} ${person.role}`))
      || (activeFilter === "Married in / partners" && /married in|partner|spouse|husband|wife/i.test(`${person.tags} ${person.relationship}`));

    const haystack = Object.values(person).join(" ").toLowerCase();
    const matchesSearch = !searchTerm || haystack.includes(searchTerm);
    return matchesFilter && matchesSearch;
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function renderAvatar(container, person) {
  container.innerHTML = "";
  if (person.photo_url) {
    const img = document.createElement("img");
    img.src = person.photo_url;
    img.alt = "";
    img.loading = "lazy";
    img.onerror = () => {
      container.innerHTML = initials(person.name);
    };
    container.appendChild(img);
  } else {
    container.textContent = initials(person.name);
  }
}

function renderTags(container, person) {
  container.innerHTML = "";
  splitList(person.tags).slice(0, 4).forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    container.appendChild(span);
  });
}

function openPerson(id) {
  const person = findPerson(id);
  if (!person) return;

  const immediateFamily = getImmediateFamily(person);
  const immediateFamilyHTML = familyOverview(immediateFamily);

  dialogContent.innerHTML = `
    <div class="dialog-hero">
      <div class="avatar" id="dialogAvatar"></div>
      <div>
        <p class="eyebrow">${escapeHTML(person.family_side || "Guest")}</p>
        <h2 id="dialogName">${escapeHTML(person.name)}</h2>
        <p class="person-relationship">${escapeHTML([person.relationship, person.role].filter(Boolean).join(" • "))}</p>
      </div>
    </div>
    <div class="dialog-section">
      <div class="tag-row">${splitList(person.tags).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>

      ${immediateFamilyHTML}

      <dl class="info-list">
        ${infoItem("Bio", person.bio)}
        ${infoItem("Conversation starter", person.conversation_starter)}
        ${infoItem("Fun fact", person.fun_fact)}
        ${infoItem("Hometown", person.hometown)}
        ${infoItem("Pronouns", person.pronouns)}
        ${infoItem("Notes", person.notes)}
      </dl>
    </div>
  `;

  renderAvatar(document.getElementById("dialogAvatar"), person);
  dialogContent.querySelectorAll("[data-avatar-person-id]").forEach(avatar => {
    const avatarPerson = findPerson(avatar.dataset.avatarPersonId);
    if (avatarPerson) renderAvatar(avatar, avatarPerson);
  });
  dialogContent.querySelectorAll("[data-person-id]").forEach(button => {
    button.addEventListener("click", () => openPerson(button.dataset.personId));
  });
  dialog.showModal();
}

function infoItem(label, value) {
  if (!value) return "";
  return `<div class="info-item"><dt class="info-label">${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`;
}

function getImmediateFamily(person) {
  const partnerIds = uniqueIds(splitList(person.partner_id));
  const explicitParentIds = splitList(person.parent_ids);
  const inverseParentIds = people
    .filter(candidate => splitList(candidate.child_ids).includes(person.id))
    .map(candidate => candidate.id);
  const parentIds = uniqueIds([...explicitParentIds, ...inverseParentIds]);

  const explicitChildIds = splitList(person.child_ids);
  const inverseChildIds = people
    .filter(candidate => splitList(candidate.parent_ids).includes(person.id))
    .map(candidate => candidate.id);
  const childIds = uniqueIds([...explicitChildIds, ...inverseChildIds]);

  const siblingsFromParents = parentIds.flatMap(parentId => {
    const parent = findPerson(parentId);
    return parent ? splitList(parent.child_ids) : [];
  });
  const siblingsFromSharedParents = people
    .filter(candidate => candidate.id !== person.id)
    .filter(candidate => splitList(candidate.parent_ids).some(parentId => parentIds.includes(parentId)))
    .map(candidate => candidate.id);
  const siblingIds = uniqueIds([...siblingsFromParents, ...siblingsFromSharedParents])
    .filter(siblingId => siblingId !== person.id)
    .filter(siblingId => !childIds.includes(siblingId) && !parentIds.includes(siblingId) && !partnerIds.includes(siblingId));

  return {
    parents: idsToPeople(parentIds),
    siblings: idsToPeople(siblingIds),
    partner: idsToPeople(partnerIds),
    children: idsToPeople(childIds)
  };
}

function familyOverview(family) {
  const groups = [
    ["Parents", family.parents],
    ["Siblings", family.siblings],
    ["Partner", family.partner],
    ["Children", family.children]
  ];

  const visibleGroups = groups.filter(([, relatives]) => relatives.length);
  if (!visibleGroups.length) {
    return `
      <section class="family-overview" aria-label="Immediate family">
        <div class="family-overview-header">
          <span class="info-label">Immediate family</span>
          <p>No immediate-family links have been added yet.</p>
        </div>
      </section>
    `;
  }

  return `
    <section class="family-overview" aria-label="Immediate family">
      <div class="family-overview-header">
        <span class="info-label">Immediate family</span>
        <p>Tap a relative to jump to their profile.</p>
      </div>
      <div class="family-groups">
        ${visibleGroups.map(([label, relatives]) => familyGroup(label, relatives)).join("")}
      </div>
    </section>
  `;
}

function familyGroup(label, relatives) {
  return `
    <section class="family-group" aria-label="${escapeHTML(label)}">
      <h3>${escapeHTML(label)}</h3>
      <div class="family-card-row">
        ${relatives.map(relative => familyCard(relative)).join("")}
      </div>
    </section>
  `;
}

function familyCard(person) {
  const subline = [person.relationship, person.role].filter(Boolean).join(" • ");
  return `
    <button class="family-card" type="button" data-person-id="${escapeHTML(person.id)}">
      <span class="avatar mini-avatar" data-avatar-person-id="${escapeHTML(person.id)}" aria-hidden="true"></span>
      <span>
        <strong>${escapeHTML(person.name)}</strong>
        ${subline ? `<small>${escapeHTML(subline)}</small>` : ""}
      </span>
    </button>
  `;
}

function findPerson(id) {
  return people.find(person => person.id === id);
}

function idsToPeople(ids) {
  return uniqueIds(ids).map(id => findPerson(id)).filter(Boolean);
}

function uniqueIds(ids) {
  return [...new Set(ids.map(id => String(id || "").trim()).filter(Boolean))];
}

function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
}

function splitList(value = "") {
  return String(value).split(/[;,]/).map(item => item.trim()).filter(Boolean);
}

function escapeHTML(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(field.trim());
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++;
      row.push(field.trim());
      if (row.some(cell => cell !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field.trim());
  if (row.some(cell => cell !== "")) rows.push(row);
  if (!rows.length) return [];

  const headers = rows[0].map(header => header.trim());
  return rows.slice(1).map(values => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });
    return obj;
  });
}

init();
