// -------------------------
// SKILLSWAP.AI DEMO DATA
// -------------------------

const mentors = [
    {
        name: "Arjun Mehta",
        skill: "Python",
        rating: 4.9,
        match: 98,
        cost: 40
    },

    {
        name: "Sneha Reddy",
        skill: "UI/UX Design",
        rating: 4.8,
        match: 95,
        cost: 35
    },

    {
        name: "Rahul Sharma",
        skill: "JavaScript",
        rating: 4.7,
        match: 93,
        cost: 30
    },

    {
        name: "Priya Nair",
        skill: "Video Editing",
        rating: 4.9,
        match: 96,
        cost: 45
    },

    {
        name: "Karthik Rao",
        skill: "Machine Learning",
        rating: 4.8,
        match: 94,
        cost: 50
    },

    {
        name: "Ananya Gupta",
        skill: "Graphic Design",
        rating: 4.7,
        match: 91,
        cost: 30
    }
];


let credits = 250;


// -------------------------
// INITIAL PAGE
// -------------------------

document.addEventListener("DOMContentLoaded", () => {

    displayMentors(mentors);

});


// -------------------------
// DISPLAY MENTORS
// -------------------------

function displayMentors(list) {

    const mentorGrid = document.getElementById("mentorGrid");

    mentorGrid.innerHTML = "";


    if (list.length === 0) {

        mentorGrid.innerHTML = `
            <p style="
                grid-column:1/-1;
                text-align:center;
                color:#8f9bb2;
            ">
                No exact mentors found. Try Python, JavaScript,
                UI/UX, Video Editing or Machine Learning.
            </p>
        `;

        return;
    }


    list.forEach((mentor, index) => {

        const initial = mentor.name.charAt(0);

        const card = document.createElement("div");

        card.className = "mentor-card";

        card.innerHTML = `

            <div class="mentor-top">

                <div class="mentor-avatar">
                    ${initial}
                </div>

                <div>
                    <h3>${mentor.name}</h3>
                    <small>
                        ⭐ ${mentor.rating} rating
                    </small>
                </div>

            </div>


            <span class="mentor-skill">
                ${mentor.skill}
            </span>


            <div class="mentor-info">

                <span>
                    🤖 ${mentor.match}% AI Match
                </span>

                <span>
                    🪙 ${mentor.cost} Credits
                </span>

            </div>


            <button onclick="bookSession(${mentors.indexOf(mentor)})">
                Book Learning Session
            </button>

        `;

        mentorGrid.appendChild(card);

    });

}


// -------------------------
// AI SKILL SEARCH
// -------------------------

function findMentors() {

    const input =
        document.getElementById("skillInput")
        .value
        .trim()
        .toLowerCase();


    const message =
        document.getElementById("searchMessage");


    if (input === "") {

        message.textContent =
            "Enter a skill to start AI matching.";

        return;
    }


    message.textContent =
        "✨ AI is analysing mentors...";


    setTimeout(() => {

        const results = mentors.filter(mentor =>

            mentor.skill
            .toLowerCase()
            .includes(input)

        );


        if (results.length > 0) {

            message.textContent =
                `${results.length} AI match found for "${input}".`;

            displayMentors(results);

        }

        else {

            message.textContent =
                `Showing recommended mentors related to "${input}".`;

            displayMentors(
                [...mentors]
                .sort((a,b) => b.match - a.match)
                .slice(0,3)
            );

        }

    }, 700);

}


// -------------------------
// ENTER KEY SEARCH
// -------------------------

document
.getElementById("skillInput")
.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        findMentors();

    }

});


// -------------------------
// BOOK SESSION
// -------------------------

function bookSession(index) {

    const mentor = mentors[index];

    if (!mentor) {
        return;
    }


    if (credits < mentor.cost) {

        showToast(
            "Not enough Skill Credits for this session."
        );

        return;
    }


    const confirmed = confirm(

        `Book a ${mentor.skill} session with ${mentor.name}?\n\n` +

        `Cost: ${mentor.cost} Skill Credits`

    );


    if (!confirmed) {
        return;
    }


    credits -= mentor.cost;

    updateCredits();


    showToast(

        `Session booked with ${mentor.name}! ` +

        `${mentor.cost} credits used.`

    );

}


// -------------------------
// UPDATE CREDIT UI
// -------------------------

function updateCredits() {

    document.getElementById("creditBalance")
        .textContent = credits;


    document.getElementById("modalCredits")
        .textContent = credits;

}


// -------------------------
// PROFILE
// -------------------------

function openProfile() {

    document
    .getElementById("profileModal")
    .classList.add("show");

}


function closeProfile() {

    document
    .getElementById("profileModal")
    .classList.remove("show");

}


// Close modal by clicking outside

document
.getElementById("profileModal")
.addEventListener("click", function(event) {

    if (event.target === this) {

        closeProfile();

    }

});


// -------------------------
// TOAST NOTIFICATION
// -------------------------

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// -------------------------
// SCROLL FUNCTIONS
// -------------------------

function scrollToSkills() {

    document
    .getElementById("matches")
    .scrollIntoView({
        behavior: "smooth"
    });

}


function scrollToHow() {

    document
    .getElementById("how")
    .scrollIntoView({
        behavior: "smooth"
    });

}
