import fs from 'fs/promises'

function StatFetcher(data, answers) {
    for (let value of data.stats) {
        delete value.stat.url
    }
    const stats = JSON.stringify(data.stats).replaceAll(',', ',\n')
    fs.writeFile(`./${answers.pokemon}/Stats.txt`, stats)
}

function SpriteFetcher(data, answers) {
    delete data.sprites.versions
    const urlArray = Object.values(data.sprites)
    urlArray.pop()
    const filteredUrlArray = urlArray.filter(x=>x)
    for (let i in filteredUrlArray) {
        fetch(filteredUrlArray[i])
            .then(data => data.arrayBuffer())
            .then(image => fs.writeFile(`./${answers.pokemon}/${i}.png`, Buffer.from(image)))

    }
}

function ArtworkFetcher(data, answers) {
    fetch(data.sprites.other["official-artwork"].front_default)
        .then(data => data.arrayBuffer())
        .then(image => fs.writeFile(`./${answers.pokemon}/Official Artwork.png`, Buffer.from(image)))
}

export { StatFetcher, SpriteFetcher, ArtworkFetcher }