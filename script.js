// ============================
// DATA (JS Array - Requirement)
// ============================
let activities = [
    { id: 1, name: "Wake up early", completed: false },
    { id: 2, name: "Exercise", completed: false },
    { id: 3, name: "Study 2 hours", completed: false },
    { id: 4, name: "Practice coding", completed: false },
    { id: 5, name: "Read a book", completed: false }
];

// Load LocalStorage (Optional Feature)
const saved = localStorage.getItem("activities");
if (saved) {
    activities = JSON.parse(saved);
}

// ============================
// START APP (HOME → DASHBOARD)
// ============================
function startApp() {
    const name = document.getElementById("nameInput").value.trim();

    if (!name) {
        alert("Please enter your name");
        return;
    }

    document.getElementById("home").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("welcomeText").innerText = "Welcome, " + name;

    renderActivities();
}

// ============================
// RENDER ACTIVITIES
// ============================
function renderActivities() {
    const list = document.getElementById("activityList");
    list.innerHTML = "";

    activities.forEach(activity => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${activity.completed ? 'completed' : ''}">
                ${activity.name}
            </span>
            <input type="checkbox"
                ${activity.completed ? "checked" : ""}
                onchange="toggleActivity(${activity.id})">
        `;

        list.appendChild(li);
    });

    updateProgress();
}

// ============================
// TOGGLE STATUS (Core Logic)
// ============================
function toggleActivity(id) {
    activities = activities.map(a => {
        if (a.id === id) {
            a.completed = !a.completed;
        }
        return a;
    });

    localStorage.setItem("activities", JSON.stringify(activities));

    renderActivities();
}

// ============================
// UPDATE PROGRESS
// ============================
function updateProgress() {
    const completed = activities.filter(a => a.completed).length;
    const total = activities.length;

    document.getElementById("progressText").innerText =
        `${completed} / ${total} Completed`;

    const percent = (completed / total) * 100;
    document.getElementById("progressFill").style.width = percent + "%";

    // Edge Case
    if (completed === total) {
        document.getElementById("completionMsg").innerText =
            " All activities completed!";
    } else {
        document.getElementById("completionMsg").innerText = "";
    }
}