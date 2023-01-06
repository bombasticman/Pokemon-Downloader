import inquirer from 'inquirer'
import fs from 'fs/promises'

const questions = [
    {
        type: 'input',
        name: 'Pokemon',
        message: 'Which Pokemon do you want',
        default: 'pikachu'
    },
    {
        type: 'confirm',
        name: 'stats',
        message: 'Do you want the stats of this Pokemon?',
        default: true,
    },
    {
        type: 'confirm',
        name: 'sprites',
        message: 'Do you want 2d sprites of this Pokemon?',
        default: true
    },
    {
        type: 'confirm',
        name: 'artwork',
        message: 'Do you want the official artwork of this Pokemon?',
        default: true
    }
]

inquirer.prompt(questions).then((answers) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${answers.Pokemon}`)
    .then(response => response.json())
    .then(data => {
        if (answers.stats === true){
            console.log(data.stats);
            for(let value of data.stats){
                delete value.stat.url
            }
            const stats = JSON.stringify(data.stats).replaceAll(',', ',\n')
            fs.writeFile('Stats.txt', stats)
        }
        if (answers.sprites === true){
            //fs.writeFile('Sprite.png', data.sprites)
        }
        if (answers.artwork === true){
            //fs.writeFile('Official Artwork.png', data.artwork)
        }


    })
})