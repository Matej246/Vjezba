// Kreirati vlastite GET, POST, PUT, DELETE API-je za rad s objektom 
//unutar vlastitog projekta

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let knjige = [
    {
        "id": 1,
        "naslov": "Lord of the Rings",
        "autor": "J.R.R. Tolkien",
        "god_izdanja": "1954",
        "izdavac": "Allen & Unwin"
    },
    {
        "id": 2,
        "naslov": "Funny Story",
        "autor": "Emily Henry",
        "god_izdanja": "2024",
        "izdavac": "Berkley"
    },
]
// READ -> GET API
app.get('/getKnjige/', (request, response) => {
    return response.send('Popis knjiga');
});

app.get('/getKnjige/:id', (request, response) => {
    let id = request.params.id;
    let knjiga = "";
    knjige.forEach(element => {
        if (element.id == id) {
            knjiga = JSON.stringify(element);
        }
    });
    return response.send('Dohvat knjige '+knjiga);
});

// CREATE -> POST API
app.post('/addKnjiga', (request, response) => {
    //naslov, autor, god_izdanja, izdavac
    const data = request.body;
    const naslov = data.naslov;
    const autor = data.autor;
    const god_izdanja = data.god_izdanja;
    const izdavac = data.izdavac;

    let knjiga = {
        "id": knjige.length+1,
        "naslov": naslov,
        "autor": autor,
        "god_izdanja": god_izdanja,
        "izdavac": izdavac
    };
    knjige.push(knjiga);
    return response.send("Dodavanje knjige. Novi popis: "+ JSON.stringify(knjige));
        //naslov+" "+autor+ " "+god_izdanja+" "+izdavac);
});

// UPDATE -> PUT API
app.put('/updateKnjiga/:id', (request, response) => {
    let id = request.params.id
    const data = request.body;
    const naslov = data.naslov;
    const autor = data.autor;
    const god_izdanja = data.god_izdanja;
    const izdavac = data.izdavac;
    return response.send('Ažuriranje knjige id '+id+" naslov:"+naslov+" "+
        autor+" "+god_izdanja+" "+izdavac);
});

// DELETE -> DELETE API
app.delete('/deleteKnjiga/:id', (request, response) => {
    let id = request.params.id
    knjige.forEach(element => {
        if (element.id == id) {
            knjige.pop(element); // nije dobro rješenje!!
        }
    });
    
    return response.send('Brisanje knjige s id '+id+". Novi popis "+JSON.stringify(knjige));
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});