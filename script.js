const contact = document.getElementById("result")
const w = document.getElementById("loader")
const nameInput = document.getElementById("InputName")
const durationInput = document.getElementById("inputDuration")
const dateInput = document.getElementById("inputDate")



const modal = document.getElementById("modal");

const open = document.querySelector(".search-btn").onclick = () => {
    modal.classList.add("active");
}

const p = document.getElementById("closeModal").onclick = () => {
    modal.classList.remove("active");
}

const close = document.getElementById("cancelBtn").onclick = () => {
    modal.classList.remove("active");
}

window.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
}

function get() {
    w.style.display = "flex"
    fetch('https://6a3b6583e4a07f202e14e54b.mockapi.io/workouts')
        .then(res => res.json())
        .then(data => {
            contact.innerHTML = ""
            data.forEach(item => {
                contact.innerHTML += `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">${item.name}</h2>
                        <span class="badge">${item.difficulty}</span>
                    </div>
                    <div class="meta">
                        <span class="meta-item"><i class="ti ti-barbell"></i> ${item.category}</span>
                        <span class="meta-item"><i class="ti ti-clock"></i> ${item.duration} min</span>
                        <span class="meta-item"><i class="ti ti-calendar"></i> ${item.date}</span>
                    </div>
                    <p class="notes">${item.notes}</p>
                    <hr class="divider"/>
                    <div class="actions">
                        <button class="btn btn-done"><i class="ti ti-check"></i></button>
                        <button onclick="edit(${item.id})" class="btn btn-edit"><i class="ti ti-edit"></i>Edit...</button>
                        <button class="btn btn-del" onclick="Delete(${item.id})"><i class="ti ti-trash"></i></button>
                    </div>
                </div>`
            })
        })
        .finally(() => {
            w.style.display = "none"
        })
}

get()

function add() {

    const values = {

        name: document.getElementById("inputName").value,

        category: document.getElementById("inputCategory").value,

        difficulty: document.getElementById("inputDifficulty").value,

        duration: document.getElementById("inputDuration").value,

        date: document.getElementById("inputDate").value,

        notes: document.getElementById("inputNotes").value

    }

    fetch("https://6a3b6583e4a07f202e14e54b.mockapi.io/workouts", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(values)

    })

        .then(res => res.json())

        .then(data => {

            console.log(data)

            modal.classList.remove("active")

            get()

        })

}

function Delete(id) {
    fetch(`https://6a3b6583e4a07f202e14e54b.mockapi.io/workouts/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            location.reload()
        })
}




function edit(id) {
    fetch(`https://6a3b6583e4a07f202e14e54b.mockapi.io/workouts/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            modal.classList.add("active")
            nameInput.value = res.name;
        })
}