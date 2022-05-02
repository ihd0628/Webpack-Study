import hello_word from './hello.js';
import world_word from './world.js';
import css from './style.css';

console.log(css);
document.querySelector('#root').innerHTML = world_word + ' ' + hello_word;
