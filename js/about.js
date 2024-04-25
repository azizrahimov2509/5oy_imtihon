const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('slug');
const darkModeBtn = document.getElementById("darkModeBtn");
const darkModeImg = document.getElementById("darkModeImg");
const callBlack = document.getElementById('call-black');
const loader = document.getElementById('loader'); 
const errorElement = document.getElementById('error'); 
const details =document.getElementById('details');



//Slug





function fetchItem(query) {
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
fetchItem(`https://frontend-mentor-apis-6efy.onrender.com/countries/${myParam}`);



//UI

function createUI(item) {
    details.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('infos');
        const formattedPopulation = item.population?.toLocaleString('en-US');
        div.innerHTML = `
        <div class="photo">
                        <img src=${item.flags.png} alt="Flag_of${item.name.common}">
                    </div>
                    <div class="cntrs">
                       <div class="cntr">
                        <div class="flag-details"> 
                            <div class="list-things">
                                <h3>${item.name.common}</h3>
                                <div class="informs">
                                    <ul class="infor">
                                        <li><p>Native Name:<span> ${item.name.nativeName}</span></p></li> 
                                        <li><p>Population:<span> ${formattedPopulation}</span></p></li> 
                                        <li><p>Region:<span> ${item.region}</span></p></li>
                                        <li><p>Sub Region:<span> ${item.subregion}</span></p></li>
                                        <li><p>Capital:<span> ${item.capital}</span></p></li>
                                     </ul> 
                                     <ul class="infor">
                                    <li><p>Top Level Domain:<span> .${item.cca3}</span></p></li> 
                                    <li><p>Currencies:<span> ${item.currencies}</span></p></li>
                                    <li><p>Language:<span> ${item.languages}</span></p></li>
                                 </ul>
                                </div>
                                <div class="border-countiries">
                                    <p>Border Counties:</p>
                                    <div class="buttonCntrs">
                                    ${item.borders.length === 0
                                        ? '<h4 class = "h4-border">There are no border countries</h4>' 
                                        : item.borders.map(border => `<a href="about.html?slug=${border.slug}" class="bndCountries">${border.common}</a>`).join('')
                                    }
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div> 
                    </div>`;
        details.appendChild(div);
}



//Dark Mode 
if (localStorage.getItem('DarkMode') === "dark") {
    document.body.classList.add("dark-theme");
    darkModeBtn.lastChild.textContent = "Light Mode";
    darkModeImg.setAttribute('src', 'images/Group 3.svg');
    callBlack.setAttribute('src','images/white-call.svg');
} else {
    document.body.classList.remove('dark-theme');
    darkModeBtn.lastChild.textContent = "Dark Mode";
    darkModeImg.setAttribute('src', 'images/Path.svg');
    callBlack.setAttribute('src','images/black-call.svg');
}


darkModeBtn.addEventListener('click',()=>{

    if(document.body.classList.contains("dark-theme")){
        document.body.classList.remove("dark-theme");
        darkModeBtn.lastChild.textContent ="Dark Mode";
        darkModeImg.setAttribute('src','images/Path.svg');
        callBlack.setAttribute('src','images/black-call.svg');
        localStorage.setItem('DarkMode',"light");
    }  else {
        document.body.classList.add('dark-theme');
        darkModeBtn.lastChild.textContent = "Light Mode";
        darkModeImg.setAttribute('src', 'images/Group 3.svg');
        callBlack.setAttribute('src','images/white-call.svg');
        localStorage.setItem('DarkMode', "dark");
    }
});


