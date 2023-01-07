import { Interface } from "./Interface.js"

const questions = [
    {
        type: 'input',
        name: 'pokemon',
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

Interface(questions)