


function get() {
    w.style.display = "flex"
    fetch('https://6a3a7a71917c7b14c74d9349.mockapi.io/cards')
        .then(res => res.json())
        .then(data => {


            data.forEach(contact => {
                console.log(contact);

                res.innerHTML += `
                <div id="skeletiooon-1">
                <h1></h1>
                <p></p>
                <p></p>
                <p></p>
                <p></p>

                <hr />

                <button></button><button>Edit</button><button></button>
                </div>`;
            })
        })
        .finally(() => {
            w.style.display = "none"
        })
}

get()

function add() {
    const values = {
        name: inputname.value,
        email: inputemail.value,
        phone: inputphone.value
    };

    fetch('https://6a3a7a71917c7b14c74d9349.mockapi.io/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            location.reload();
        });
}

function Delete(id) {
    fetch(`https://6a3a7a71917c7b14c74d9349.mockapi.io/cards/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            location.reload();
        });
}