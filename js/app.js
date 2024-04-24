const darkModeBtn = document.getElementById("darkModeBtn");
const darkModeImg = document.getElementById("darkModeImg");
const loader = document.getElementById('loader'); 
const errorElement = document.getElementById('error'); 
const flags = document.getElementById('flags');
const input = document.querySelector('#input');
const select = document.querySelector('#select');





// All countries

function fetchImages(query) {
    loader.classList.remove('hidden');
    errorElement.classList.add('hidden');
    fetch(query)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
          createUI(data);
          loader.classList.add('hidden');
        })
      .catch((error) => {
        console.error('Fetch error:', error);
        loader.classList.add('hidden');
        errorElement.classList.remove('hidden');
      });
  }
fetchImages("https://frontend-mentor-apis-6efy.onrender.com/countries");


//UI

function createUI(data){

    flags.innerHTML='';
    const users = Array.isArray(data) ? data : [data];
    data.data.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('flag-list');
        div.innerHTML =`
        <img src=${item.flags.png}> 
        <div class="list-things">
             <h3>${item.name.common}</h3>
             <ul class="info">
                <li><p>Population:<span> ${item.population}</span></p></li> 
                 <li><p>Region:<span> ${item.region}</span></p></li>
                 <li><p>Capital:<span> ${item.capital}</span></p></li>
             </ul>   
        </div>`;
        flags.appendChild(div);
    });
}



// Search

input.addEventListener('input', (e) => {
    flags.innerHTML = '';
    loader.classList.remove('hidden');
    const url = `https://frontend-mentor-apis-6efy.onrender.com/countries?search=${e.target.value}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            loader.classList.add('hidden');
            error.classList.add('hidden');
            if (data.data && data.data.length > 0) {
                createUI(data);
            } else {
                error.classList.remove('hidden');
                error.innerHTML = `<h2 style="display: flex; justify-content: center;color: red;" >Malumot topilmadi!</h2>`;
            }
        })
        .catch((err) => {
            loader.classList.add('hidden');
            err.classList.remove('hidden');
        });
});



//  Filter by Regions
select.addEventListener('change', (e) => {
    flags.innerHTML = '';
    loader.classList.remove('hidden');
    const url = `https://frontend-mentor-apis-6efy.onrender.com/countries?region=${e.target.value}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            loader.classList.add('hidden');
            error.classList.add('hidden');
                createUI(data);
        })
        .catch((err) => {
            loader.classList.add('hidden');
            err.classList.remove('hidden');
        });
});



//Dark Mode 
if (localStorage.getItem('DarkMode') === "dark") {
    document.body.classList.add("dark-theme");
    darkModeBtn.lastChild.textContent = "Light Mode";
    darkModeImg.setAttribute('src', 'images/Group 3.svg');
} else {
    document.body.classList.remove('dark-theme');
    darkModeBtn.lastChild.textContent = "Dark Mode";
    darkModeImg.setAttribute('src', 'images/Path.svg');
}


darkModeBtn.addEventListener('click',()=>{

    if(document.body.classList.contains("dark-theme")){
        document.body.classList.remove("dark-theme");
        darkModeBtn.lastChild.textContent ="Dark Mode";
        darkModeImg.setAttribute('src','images/Path.svg');
        localStorage.setItem('DarkMode',"light");
    }  else {
        document.body.classList.add('dark-theme');
        darkModeBtn.lastChild.textContent = "Light Mode";
        darkModeImg.setAttribute('src', 'images/Group 3.svg');
        localStorage.setItem('DarkMode', "dark");
    }
});