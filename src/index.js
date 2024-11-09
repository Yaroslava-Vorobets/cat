import './css/styles.css'

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select ')
const catInfo = document.querySelector('.cat_info');
const wrapper = document.querySelector(".wrapper")

import {Notify} from 'notiflix';

  select.classList.add('hidden')
 
  wrapper.classList.add('visible')

fetchBreeds().then((data) => {
  Notify.success('operation finished with success!!!', {  
    position: 'center-center',
    width: '400px',
    clickToClose: 'true'
  })
  data.map(({id, name}) => {
    const option = document.createElement('option');
    option.classList.add('optionclass')
    option.value = `${ id }`
    option.textContent = ` ${name}`;

    select.classList.toggle('hidden')    
    wrapper.classList.toggle('hidden');    
    select.appendChild(option)

    
  })
}).catch(() => {
  select.classList.replace('visible','hidden');
  wrapper.classList.replace('visible','hidden');
  Notify.failure('OOOps!!! something went wrong. Please try again',{  
    position: 'center-center',
    width: '400px',
    clickToClose: 'true'
  });
})

select.addEventListener("click", inputValue)

function inputValue(e) { 
  const id = e.target.value;
  fetchCatByBreed(id)   
  .then((data) => {
    catInfo.classList.add('hidden')
    wrapper.classList.add('visible')
    Notify.success('yesss we fined something interesting for yuo!!!')  
    const marckup = data.map(({url,breeds: {
0:{ id, name, temperament, description }}}) => {
    console.log(data)
      return `
            <img src = ${url}>
            <div class="description"> 
              <h1 class="cat_name" id = ${id}>${name}</h1> 
              <h2 class= "cat_title">Cat temperament:</h2>
              <p class="cat_description"> ${temperament}</p>
              <h2 class= "cat_title">Description of breed:</h2>
              <p class="cat_description">${description}</p> 
            </div>
            `

    }).join('')

    catInfo.classList.replace('hidden','visible'); 

    wrapper.classList.replace('visible','hidden');
 
    catInfo.innerHTML = marckup;   
   
  }).catch(() => {
    select.classList.add('hidden');
    wrapper.classList.add('hidden');
    catInfo.classList.add('hidden')
    
    Notify.failure('OOOps!!! something went wrong. Please try again', {  
    position: 'center-center',
    width: '400px',
    clickToClose: 'true'
  });
  })


 
}

  

 

