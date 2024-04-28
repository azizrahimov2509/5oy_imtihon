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



select.addEventListener('change', () => {
    fetchData(select.value, input.value);
});

input.addEventListener('input', () => {
    fetchData(select.value,input.value);
});


//   Search and Filter by regions
function fetchData(region, search) {
    flags.innerHTML = '';
    loader.classList.remove('hidden');
    let url = `https://frontend-mentor-apis-6efy.onrender.com/countries?search=${search}&region=${region} `;
    if (region === "All") {
        url = `https://frontend-mentor-apis-6efy.onrender.com/countries?search=${search}`;
    }
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
        .catch((error) => {
            loader.classList.add('hidden');
            error.classList.remove('hidden');
        });
}



//UI

function createUI(data) {
    flags.innerHTML = '';
    data.data.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('flag-list');
        const formattedPopulation = item.population?.toLocaleString('en-US');
        div.innerHTML = `
        <a href="about.html?slug=${item.name.slug}" class="btn-details">
            <img src=${item.flags.png}> 
        <div class="list-things">
            <h3>${item.name.common}</h3>
            <ul class="info">
                <li><p>Population:<span> ${formattedPopulation}</span></p></li> 
                <li><p>Region:<span> ${item.region}</span></p></li>
                <li><p>Capital:<span> ${item.capital}</span></p></li>
     </ul>   
</div>
</a>`;
        flags.appendChild(div);
    });
}



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
