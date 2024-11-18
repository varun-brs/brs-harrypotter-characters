const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];
let no_image_available = "assets/img/No_Image_Available.jpg";
let chathams_blue = "#1A4B84";

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log(e);

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString) ||
      character.actor.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    document.getElementById("load").classList.remove("d-none");
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    console.log(res);
    document.getElementById("load").classList.add("d-none");
    hpCharacters = await res.json();
    console.log(hpCharacters);
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <li class="character">
                <h2 id="name">${character.name}</h2>
                <p id="house">House: ${character.house}</p>
                <p id="actor">Actor: ${character.actor}</p>
                <p id="ancestry">Ancestry: ${character.ancestry}</p>
                <p id="dateOfBirth">Date of Birth: ${character.dateOfBirth}</p>
                <p id="dateOfBirth">Date of Birth: ${character.image}</p>
                <img src="${character.image || no_image_available}"></img>
            </li>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
