/* =========================
   SKILLSWAP.AI
   FRONTEND LOGIC
========================= */


/* =========================
   MODALS
========================= */

function openSignup() {
    document
        .getElementById("signupModal")
        .classList.add("active");
}

function closeSignup() {
    document
        .getElementById("signupModal")
        .classList.remove("active");
}

function openLogin() {
    document
        .getElementById("loginModal")
        .classList.add("active");
}

function closeLogin() {
    document
        .getElementById("loginModal")
        .classList.remove("active");
}


/* =========================
   CREATE PROFILE
========================= */

function createProfile() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const teach =
        document.getElementById("teachSkill").value.trim();

    const learn =
        document.getElementById("learnSkill").value.trim();


    if (!name || !email || !teach || !learn) {

        showNotification(
            "Please complete all profile fields."
        );

        return;
    }


    const user = {

        name: name,

        email: email,

        teach: teach,

        learn: learn,

        credits: 100

    };


    localStorage.setItem(
        "skillswapUser",
        JSON.stringify(user)
    );


    closeSignup();


    showNotification(
        `Welcome ${name}! Your profile was created.`
    );


    setTimeout(() => {

        generateMatch(
            teach,
            learn
        );

    }, 1500);
}


/* =========================
   LOGIN
========================= */

function loginUser() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();


    if (!email || !password) {

        showNotification(
            "Enter your email and password."
        );

        return;
    }


    const savedUser =
        JSON.parse(
            localStorage.getItem("skillswapUser")
        );


    if (
        savedUser &&
        savedUser.email === email
    ) {

        closeLogin();

        showNotification(
            `Welcome back, ${savedUser.name}!`
        );

    } else {

        showNotification(
            "No account found. Please create a profile first."
        );

    }
}


/* =========================
   AI MATCH SIMULATION
========================= */

function generateMatch(
    teachSkill,
    learnSkill
) {

    const names = [
        "Rahul Sharma",
        "Sneha Mehta",
        "Vikram Kumar",
        "Ananya Rao",
        "Arjun Patel"
    ];


    const randomName =
        names[
            Math.floor(
                Math.random() * names.length
            )
        ];


    const score =
        Math.floor(
            Math.random() * 10
        ) + 90;


    showNotification(
        `🤖 AI found ${randomName} — ${score}% match!`
    );
}


/* =========================
   SKILL SELECTION
========================= */

function selectSkill(skill) {

    showNotification(
        `You selected ${skill}. Finding learners...`
    );


    setTimeout(() => {

        showNotification(
            `🤖 AI found matches for ${skill}!`
        );

    }, 1200);
}


/* =========================
   CONNECTION
========================= */

function connectWithUser(name) {

    showNotification(
        `Connection request sent to ${name}!`
    );
}


/* =========================
   NOTIFICATIONS
========================= */

function showNotification(message) {

    const notification =
        document.getElementById("notification");


    notification.textContent = message;


    notification.classList.add("show");


    setTimeout(() => {

        notification.classList.remove("show");

    }, 3000);
}


/* =========================
   SMOOTH SCROLL
========================= */

function scrollToHow() {

    document
        .getElementById("how")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   CLOSE MODALS
   WHEN CLICKING OUTSIDE
========================= */

window.addEventListener(
    "click",
    function(event) {

        const signup =
            document.getElementById("signupModal");

        const login =
            document.getElementById("loginModal");


        if (event.target === signup) {
            closeSignup();
        }


        if (event.target === login) {
            closeLogin();
        }

    }
);


/* =========================
   LOAD SAVED USER
========================= */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        const savedUser =
            localStorage.getItem(
                "skillswapUser"
            );


        if (savedUser) {

            const user =
                JSON.parse(savedUser);


            console.log(
                "SkillSwap user:",
                user
            );

        }

    }
);
