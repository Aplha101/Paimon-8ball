# Paimon-8ball

## Description
Paimon-8ball is a Genshin Impact–inspired Magic 8 Ball web app where Paimon answers your yes/no questions with fun, random responses. It is a lightweight frontend project built using HTML, CSS, and JavaScript.

## Features
- Random Paimon-style responses
- Easy to modify and extend (if you want)

## Demo
Open `index.html` in a browser to try it locally.  



## Usage
1. Enter a yes/no question.
2. Click the 8-ball button.
3. Receive a random answer from Paimon.


## Customization
You can add or edit responses in `main.js`, change colors or layout in `style.css`, and extend the project with animations, sound effects, or voice lines.

the dialogue tree is very simple , just type the text/audio(if available) and options(if any) 
in an object then point the next scene via ```js point:"<next scene>"```

example

```js
"greet" : {
    text:"hello",
    audio:"hello.mp3",
    options:[{...}],
    next:"bye"
}

"bye" : {
    text : "bye",
    audio:"bye.mp3",
}

```


## Disclaimer
This is a fan-made project. Genshin Impact and Paimon are owned by HoYoverse. No copyright infringement intended.

## License
No license specified.
