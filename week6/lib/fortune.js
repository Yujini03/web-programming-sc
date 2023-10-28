const fortuneCookies = [
    "Conquer your fears or they will conquer you.",
    "봄이 오면 강물은 흐른다.",
    "Do not fear what you don't know.",
    "Your will have a pleasant surpise.",
    "쉽게 생각하라."
]
//getFortune을 수출할거임.
exports.getFortune = () => {
    const idx = Math.floor(Math.random()*fortuneCookies.length)
    return fortuneCookies[idx]
}