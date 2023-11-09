const API_URL = "https://6542bfba01b5e279de1f84ef.mockapi.io/users"
const results = document.getElementById('results')

const getBtn = document.getElementById('btnGet1')
const inputGetId = document.getElementById('inputGet1Id')

const postBtn = document.getElementById('btnPost')
const postName = document.getElementById('inputPostNombre')
const postLastName = document.getElementById('inputPostApellido')

const deleteBtn = document.getElementById("btnDelete")
const deleteId = document.getElementById('inputDelete')

const btnPut = document.getElementById('btnPut')
const inputPutId = document.getElementById('inputPutId')
const inputPutNombre = document.getElementById('inputPutNombre')
const inputPutApellido = document.getElementById('inputPutApellido')
const btnSendChanges = document.getElementById('btnSendChanges')

function showData (data){
    results.innerHTML = ''
    if (! Array.isArray(data)){
        data = [data]
    }
    console.log(data)
    for(let user of data){
        let element = document.createElement('li')
        element.innerHTML = `<div>
        <p>ID: ${user.id}</p>
        <p>Nombre: ${user.name}</p>
        <p>Apellido: ${user.lastname}</p>
        </div>`
        results.appendChild(element)
    }
}

// GET
getBtn.addEventListener('click', () =>{
    let tempURL = API_URL + '/' + inputGetId.value
    fetch(tempURL).then(res => res.json()).then(data => showData(data))
})


// POST
postName.addEventListener('change', verifyPost)
postLastName.addEventListener('change', verifyPost)
function verifyPost (){
    if(postName.value != "" && postLastName.value != "" ){
        postBtn.disabled = false
    }else{
        postBtn.disabled = true
    }
}
postBtn.addEventListener('click', ()=>{
    let data = {
        name: postName.value,
        lastname: postLastName.value
    }
    const requestOption ={
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(data)
    };       
    fetch(API_URL, requestOption).then(() =>{
        fetch(API_URL).then(res => res.json()).then(data => showData(data))
    })
});



// DELETE
deleteId.addEventListener('change', verifyDel)
function verifyDel (){
    if(deleteId.value != "" ){
        deleteBtn.disabled = false
    }else{
        deleteBtn.disabled = true
    }
}
deleteBtn.addEventListener("click", function() {
    const idToDelete = deleteId.value;
    let url = API_URL + '/' + idToDelete
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        fetch(API_URL).then(res => res.json()).then(data => showData(data))
    })
    .catch(error => {
        console.error('Error al eliminar el usuario', error);
    });
});



// PUT
inputPutId.addEventListener('change', verifyPut)
function verifyPut (){
    if(inputPutId.value != "" ){
        putBtn.disabled = false
    }else{
        putBtn.disabled = true
    }
}

btnPut.addEventListener('click', () => {
    let tempURL = API_URL + '/' + inputPutId.value
    fetch(tempURL).then(res => res.json()).then(data => {
        putName.value = data.name
        putLastName.value = data.lastname
        btnSendChanges.disabled = true
    })
})

inputPutNombre.addEventListener('change', verifyPutModal)
inputPutApellido.addEventListener('change', verifyPutModal)
function verifyPutModal (){
    if(inputPutNombre.value != "" && inputPutApellido.value != "" ){
        btnSendChanges.disabled = false
    }else{
        btnSendChanges.disabled = true
    }
}

btnSendChanges.addEventListener('click', ()=>{
    let data = {
        name: inputPutNombre.value,
        lastname: inputPutApellido.value
    }
    fetch(API_URL, {
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(data),
    }).then(() => {
        fetch(API_URL).then(res => res.json()).then(data => showData(data))
    });
});
    



function nombresPUT(){
    let info = {
        name: inputPutNombre.value,
        lastname: inputPutApellido.value
    }
    console.log(info);
    return info;
}

btnPut.disabled = true;

inputPutId.addEventListener("input", function(){
    if(deshabilitarBoton(inputPutId)){
        btnPut.disabled = true;
    } else {
        btnPut.disabled = false;
    }
});

btnPut.addEventListener("click", function(){
    results.innerHTML = "";
    fetch(URL + inputPutId.value)
    .then(response =>{
        if(!response.ok){
            btnSendChanges.disabled = true;
            toggleError();
        } else {
            btnSendChanges.disabled = false;
            return response.json();
        }
    })
    .then(data => {
        inputPutNombre.value = data.name;
        inputPutApellido.value = data.lastname;
    })
    .catch(error => {
        console.log(error)
    })
    btnSendChanges.addEventListener("click", function(){
    fetch(URL + inputPutId.value, {
        method: "PUT",
        body: JSON.stringify(nombresPUT()),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response =>{
        if(!response.ok){
            toggleError();
        } else {
            showArray();
            return response.json();
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
    });
});

