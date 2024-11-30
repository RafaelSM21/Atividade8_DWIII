const apiUrl = "http://localhost:3000"; // URL do seu backend

const form = document.getElementById("animal-form");
const animalList = document.getElementById("animal-list");
const search = document.getElementById("search");

// Função para cadastrar animal
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const animal = {
    Nome: form.Nome.value,
    Especie: form.Especie.value,
    Idade: parseInt(form.Idade.value),
    Tutor: form.Tutor.value,
    ContatoTutor: form.ContatoTutor.value,
  };

  try {
    const response = await fetch("http://localhost:3000/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animal),
    });

    if (response.ok) {
      const newAnimal = await response.json();
      addAnimalToList(newAnimal);
      form.reset();
    } else {
      console.error("Erro ao cadastrar animal.");
    }
  } catch (error) {
    console.error("Erro:", error);
  }
});

// Função para exibir a lista de animais
async function fetchAnimals() {
  try {
    const response = await fetch("http://localhost:3000/animals");
    if (response.ok) {
      const animals = await response.json();
      animalList.innerHTML = "";
      animals.forEach(addAnimalToList);
    }
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
  }
}

// Função para adicionar animal à lista
function addAnimalToList(animal) {
  const li = document.createElement("li");
  li.textContent = `${animal.Nome} - ${animal.Especie} (${animal.Idade} anos) | Tutor: ${animal.Tutor}`;
  animalList.appendChild(li);
}

// Função para buscar animais
search.addEventListener("input", async (e) => {
  const query = e.target.value;

  try {
    const response = await fetch(`http://localhost:3000/animals/search?query=${query}`);
    if (response.ok) {
      const results = await response.json();
      animalList.innerHTML = "";
      results.forEach(addAnimalToList);
    }
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
  }
});

// Inicializar a lista de animais ao carregar a página
fetchAnimals();
