const question = document.getElementById("question");
const ask = document.getElementById("ask");
const dialogueTree = {
    "start":{
        text:"",
        options:[
            { text: "Hey Paimon!!", next: "greet" }
        ]
    },
    "greet": {
        text: "Traveller, you're here!",
        audio: "assets/audio/pgreet.ogg",
        next: "greet_2"
    },
    "greet_2": {
        text: "Anything interesting you wanna talk about today?",
        audio: "assets/audio/pgreet2.ogg",
        options: [
            { text: "Yea, I wanted to ask something", next: "Question" },
            { text: "Are you thinking about anything?", next: "hungry_scene" }
        ]
    },
    "hungry_scene": {
        text: "Nooo... Paimon's just hungry..",
        audio: "assets/audio/hungry.ogg",
        img: "assets/images/heh.gif",
        options: [
            { text: "You're always hungry... lets go to eat!", next: "great_idea" }
        ]
    },
    "great_idea": {
        text: "Wow, that's a great idea!",
        audio: "assets/audio/great.ogg",
        img: "assets/images/paimon.gif",
        next: "ready_anytime"
    },
    "ready_anytime": {
        text: "Paimon is ready to go at any time!!",
        audio: "assets/audio/ready.ogg",
        options:[
            {text: "I can make you some Sweet Madame!" , next:"really?"}
        ]
    },
    "really?": {
        text: "Really? Sweet Madame? Oh heck yeah!!.. Paimon could totally go for some of that right now!!",
        audio: "assets/audio/really-sweetmadame.ogg",
        options:[
            {text: `Yeah...you can call it "emergency food"` , next:"smug"}
        ]
    },
    "smug": {
        text: "Uhh...whats with that smug look on your face? What?.....Is Paimon missing something??",
        audio: "assets/audio/smug.ogg",
        next:"start"
    },
    "Question": {
        text: "Oh , Okay!",
        audio : "assets/audio/ooOkay.ogg", 
        next:"lifetip"
    },
    "lifetip": {
        text: "Its time , for Paimon's little life tips!!",
        audio: "assets/audio/lifetips.ogg",
        quest: true
    }
    
};
const paimonAudio = new Audio();
paimonAudio.preload = "auto";

const songs = [
    new Audio("assets/songs/mondstat3.mp3"),
    new Audio("assets/songs/mondstat1.mp3"),
    new Audio("assets/songs/mondstat2.mp3")
  
];
songs.forEach(song => song.preload = "auto");


const paimonText = document.getElementById("paimon-text");
const paimonImg = document.getElementById("paimon");
const buttonsContainer = document.querySelector(".buttons");

function typeWriter(text, element, delay = 40) {
    element.textContent = "";
    let i = 0;
    const intervalId = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(intervalId);
        }
    }, delay);
}
function ball_8(){
    const response = [{
        text:"Wow thats a great idea!" ,
         audio:"assets/audio/great.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
        },
        {
            text:"Hmm, Paimon can't relate to that",
            audio:"assets/audio/cantrelate.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
            
        },
        {
            text:"Paimon doesnt feel so good",
            audio:"assets/audio/dontfeelgood.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
        },
        {
            text:"Hmmmm",
            audio:"assets/audio/hmmm.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
        },
        {
            text:"Huh , not bad!",
            audio:"assets/audio/notbad.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
        },
        {
            text:"Hey no fair!",
            audio:"assets/audio/notfair.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
        },
        {
            text:"After all , It's not paimonly to worry too much",
            audio:"assets/audio/paimonly.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
        },
        {
            text:"Strange..",
            audio:"assets/audio/strange.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
        },
        {
            text:"Oh jeez not this again.. For the last time NOO!",
            audio:"assets/audio/forthelasttimeno.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]
        },
        {
            text:"WHAT? NOO!",
            audio:"assets/audio/WHATNOOO.ogg",
         options:[
            {text:"Stop asking?",
                next:"start"
            }
         ]

                }
    ];
    const randomResponse = response[Math.floor(Math.random() * response.length)];
    return randomResponse;
}
function playDialogue(key) {
    const scene = dialogueTree[key];
    if (!scene) {
        console.error("Dialogue key not found:", key);
        return;
    }


    hideChoices();
    if (scene.img) {
        paimonImg.src = scene.img;
    }

    if (scene.text !== undefined) {
        typeWriter(scene.text, paimonText, 40);
    }
    if(scene.quest){
        ask.style.display = "inline-block";
        question.style.display = "inline-block";
        question.placeholder = "Ask Paimon...";
        ask.onclick = () => {
            const userQuestion = question.value.trim();
            const response = ball_8();
            typeWriter(response.text, paimonText, 40);
            question.value = "";
            if(response.audio){
                paimonAudio.src = response.audio;
                paimonAudio.currentTime = 0;
                paimonAudio.play().catch(e => {
                    console.warn("Audio play blocked or file missing:", e);
                });
            }
                  handleSceneTransition(response)
        };
  
    }
    if (scene.audio) {
        paimonAudio.src = scene.audio;
        paimonAudio.currentTime = 0;
        paimonAudio.play().catch(e => {
            console.warn("Audio play blocked or file missing:", e);
            handleSceneTransition(scene);
        });

        paimonAudio.onended = () => {
            handleSceneTransition(scene);
        };
    } else {
        handleSceneTransition(scene);
    }
}

function handleSceneTransition(scene) {
    if (scene.options) {
        renderChoices(scene.options);
    } else if (scene.next) {
        setTimeout(() => playDialogue(scene.next), 1000);
    }
}
function hideChoices() {
    buttonsContainer.classList.add("hidden");
    buttonsContainer.innerHTML = "";
}

function renderChoices(options) {
    buttonsContainer.innerHTML = "";
    buttonsContainer.classList.remove("hidden");

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerHTML = `
            <div class="choice-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style="transform: scaleX(-1);">
                    <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
            </div>
            <span>${opt.text}</span>`;
        
        btn.onclick = () => {
            hideChoices();
            playDialogue(opt.next);
        };

        buttonsContainer.appendChild(btn);
    });
}

function playSong(a, index = 0) {
    const audio = a[index];
    audio.currentTime = 0;
    audio.play();
    audio.onended = () => {
        playSong(a, (index + 1) % a.length);
    };
}


document.addEventListener("DOMContentLoaded", () => {
    console.log("Paimon System Online");
    playSong(songs);
    playDialogue("start");
});