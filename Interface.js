import inquirer from 'inquirer'
import fs from 'fs/promises'
import { StatFetcher } from './Fetchers.js'
import { SpriteFetcher } from './Fetchers.js'
import { ArtworkFetcher } from './Fetchers.js'

function Interface(questions) {
    inquirer.prompt(questions).then((answers) => {
        console.log('--------------------------');
        console.log('Creating folder...');
        fs.mkdir(answers.pokemon)
        console.log('Folder created!');
        console.log('--------------------------');
        console.log('Fetching data...');
        fetch(`https://pokeapi.co/api/v2/pokemon/${answers.pokemon}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetching complete!");
                console.log('--------------------------');
                if (answers.stats === true) {
                    console.log('Fetching stats...');
                    StatFetcher(data, answers)
                    console.log('Stats fetched!');
                    console.log('--------------------------');
                }
                if (answers.sprites === true) {
                    console.log('Fetching sprites...');
                    SpriteFetcher(data, answers)
                    console.log('Sprites fetched!');
                    console.log('--------------------------');
                }
                if (answers.artwork === true) {
                    console.log('Fetching artwork...');
                    ArtworkFetcher(data, answers)
                    console.log('Artwork fetched!');
                    console.log('--------------------------');
                }
            })
            .then(() => {
                console.log('Process done!');
                console.log('--------------------------');
                const confirm = [
                    {
                        type: 'confirm',
                        name: 'continue',
                        message: 'do you want to download another Pokemon?',
                        default: false,
                    }
                ]
                inquirer.prompt(confirm).then(answers => {
                    if (answers.continue === true) {
                        Interface(questions)
                    } else {
                        console.log("Shutting down...");
                    }
                })
            })
    })
}

export { Interface }