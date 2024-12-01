const API_BASE_URL = "http://localhost:3000/animais";

const form = document.getElementById("addAnimalForm");
const nomeInput = document.getElementById("nome");
const especieInput = document.getElementById("especie");
const idadeInput = document.getElementById("idade");
const tutorInput = document.getElementById("tutor");
const contatoInput = document.getElementById("contato");
const animalList = document.getElementById("animalsList");
const searchQueryInput = document.getElementById("searchQuery");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");

let editingAnimalId = null; // Armazena o ID do animal sendo editado

// Função para formatar o telefone
const formatPhoneNumber = (phone) => {
  if (!phone) return "Não especificado";
  return phone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
};

// Função para buscar e exibir todos os animais
async function fetchAnimals() {
  try {
    const response = await fetch(API_BASE_URL);
    const animals = await response.json();
    renderAnimals(animals);
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
  }
}

// Função para exibir os animais na lista
function renderAnimals(animals) {
  animalList.innerHTML = ""; // Limpa a lista

  if (animals.length === 0) {
    const noResults = document.createElement("li");
    noResults.textContent = "Nenhum animal encontrado.";
    animalList.appendChild(noResults);
    return;
  }

  animals.forEach((animal) => {
    const li = document.createElement("li");

    const info = document.createElement("span");
    info.textContent = `${animal.Nome} (${animal.Especie}) - Idade: ${animal.Idade} anos - Tutor: ${animal.Tutor} - Contato: ${formatPhoneNumber(animal.ContatoTutor)}`;

    const actions = document.createElement("div");
    actions.classList.add("list-actions");

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", () => prepareEditAnimal(animal));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", () => deleteAnimal(animal._id));

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    li.appendChild(info);
    li.appendChild(actions);
    animalList.appendChild(li);
  });
}

// Função para preparar a edição de um animal
function prepareEditAnimal(animal) {
  // Preenche os campos com os dados do animal
  nomeInput.value = animal.Nome;
  especieInput.value = animal.Especie;
  idadeInput.value = animal.Idade;
  tutorInput.value = animal.Tutor;
  contatoInput.value = animal.ContatoTutor || "";

  // Define o ID do animal que está sendo editado
  editingAnimalId = animal._id;

  // Atualiza o botão do formulário
  form.querySelector("button").textContent = "Atualizar";
}

// Função para adicionar ou atualizar um animal
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = nomeInput.value;
  const especie = especieInput.value;
  const idade = Number(idadeInput.value);
  const tutor = tutorInput.value;
  const contato = contatoInput.value || undefined;

  try {
    if (editingAnimalId) {
      // Atualizar animal
      await fetch(API_BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingAnimalId,
          Nome: nome,
          Especie: especie,
          Idade: idade,
          Tutor: tutor,
          ContatoTutor: contato,
        }),
      });
      editingAnimalId = null; // Limpa o ID do animal editado
      form.querySelector("button").textContent = "Adicionar"; // Volta o texto do botão
    } else {
      // Adicionar novo animal
      await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nome: nome,
          Especie: especie,
          Idade: idade,
          Tutor: tutor,
          ContatoTutor: contato,
        }),
      });
    }

    form.reset(); // Limpa o formulário
    fetchAnimals(); // Recarrega a lista de animais
  } catch (error) {
    console.error("Erro ao salvar animal:", error);
  }
});

// Função para buscar animais por nome ou espécie
searchButton.addEventListener("click", async () => {
  const searchQuery = searchQueryInput.value.trim(); // Obtém o valor da busca

  if (!searchQuery) {
    alert("Por favor, insira um nome ou espécie para buscar.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar animais.");
    }
    const animals = await response.json();
    renderAnimals(animals); // Exibe os resultados na lista
  } catch (error) {
    console.error("Erro na busca:", error);
    alert("Não foi possível buscar os animais. Tente novamente mais tarde.");
  }
});

// Função para redefinir a busca
resetButton.addEventListener("click", () => {
  searchQueryInput.value = "";
  fetchAnimals(); // Recarregar a lista completa
});

// Função para excluir animal
async function deleteAnimal(id) {
  if (confirm("Tem certeza de que deseja excluir este animal?")) {
    try {
      await fetch(API_BASE_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchAnimals(); // Recarregar a lista após exclusão
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
    }
  }
}

// Carregar a lista de animais ao iniciar
fetchAnimals();
