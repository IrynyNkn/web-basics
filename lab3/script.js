const container = document.getElementById("container");

async function getRandomPerson() {
  try {
    const server = "https://randomuser.me/api";
    const response = await fetch(server, {
      method: "GET",
    });

    const responseResult = await response.json();
    return responseResult.results[0];
  } catch (error) {
    console.error("Error fetching random user:", error);
  }
}

async function add() {
  const person = await getRandomPerson();

  const temple = `
    <div class="card">
        <img src="${person.picture.large}" class="card-img-top" alt="error">
        <div class="card-body">
            <p class="card-text"><b>Name:</b><br>${person.name.title} ${person.name.first} ${person.name.last}</p>
            <p class="card-text"><b>Email:</b><br>${person.email}</p>
            <p class="card-text"><b>Phone:</b><br>${person.phone}</p>
            <p class="card-text"><b>City:</b><br>${person.location.city}</p>
        </div>
    </div>`;

  container.insertAdjacentHTML("afterbegin", temple);
}

function del() {
  container.innerHTML = "";
}
