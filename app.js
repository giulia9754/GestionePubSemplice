//simuliamo un database per il menù
var menu = [
    { nome: 'Birra', prezzo: 5 },
    { nome: 'Panino', prezzo: 8 },
    { nome: 'Patatine', prezzo: 3 }
];
//Array per la gestione degli ordini
var ordini = [];
//Funzione per aggiornare la tabella del nostro menu
function aggiornaMenu() {
    var menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = '';
    //popoliamo la tabella con foreach
    menu.forEach((articolo, index) => {
        var row = document.createElement('tr');
        row.innerHTML = `<td>${articolo.nome}</td>
                         <td>${articolo.prezzo} €</td>
                         <td><button onclick="rimuoviArticolo(${index})">Rimuovi</button></td>`;

        //aggiunta della riga alla tabella
        menuItems.appendChild(row);
    });
}
//Funzione per rimuovere un articolo dalla tabella del menu e quindi dal suo array
function rimuoviArticolo(index) {
    menu.splice(index, 1);
    aggiornaMenu();
}
//Funzione per aggiungere un nuovo articolo al menu
function aggiungiArticolo() {
    var nome = document.getElementById('item-name').value;
    var prezzo = parseFloat(document.getElementById('item-price').value);
    //controllo verifica dati input
    if (nome && prezzo) {
        menu.push({ nome, prezzo });
        aggiornaMenu();
        //ripuliamo i  campi di input
        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
    } else {
        alert('Inserisci nome e prezzo validi.');
    }
}
//Funzione per aggiungere un nuovo ordine
function aggiungiOrdine() {
    //da compilare
    //crea un array per memorizzare i dati dell'ordine corrente
    var ordine = [];
    //scorriamo gli articoli del menu
    for (var i = 0; i < menu.length; i++) {
        //aggiungiamo ogni articolo del menu come oggetto dell'array ordine
        ordine.push({
            nome: menu[i].nome,
            prezzo: menu[i].prezzo,
            quantita: 0
        });
    }
    //aggiunge l'array ordine all'array globale ordini
    ordini.push(ordine);
    //aggiorniamo gli ordini
    aggiornaOrdini();
}
// Funzione per aggiornare la lista degli ordini
function aggiornaOrdini() {
    //puntiamo sull'eleemnto da  modificare con il DOM
    var orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    //creiamo un ciclo for per scorrere all'interno di ciascun ordine presente in ordini
    for (var ordineIndex = 0; ordineIndex < ordini.length; ordineIndex++) {
        var ordine = ordini[ordineIndex]; //singolo ordine
        //creazione di un div per rappresentare l'ordine nel DOM
        var ordineDiv = document.createElement('div');
        //imposta una classe per il div generato
        ordineDiv.className = 'ordine';
        //dichiarazione ed inizializzazione di una variabile per il totale
        var totale = 0;
        //ciclo for nidificato al ciclo per la getsione degli ordini per prelevare gli articoli presenti nell'ordine
        for (
            var articoloIndex = 0;
            articoloIndex < ordine.length;
            articoloIndex++
        ) {
            var articolo = ordine[articoloIndex];
            //creazione di un div per rappresentare i dettagli dell'articolo
            var articoloDiv = document.createElement('div');
            //imposta il contenuto del div
            articoloDiv.innerHTML = `<strong>${articolo.nome}:</strong> ${articolo.prezzo} € x <input type="number" value="${articolo.quantita}" min ="0" onchange="aggiornaQuantita(${ordineIndex}, ${articoloIndex}, this.value)" />`;
            //aggiungere il div con gli articoli al div per gli ordini
            ordineDiv.appendChild(articoloDiv);
            //calcoliamo il costo totale di questo articolo e lo aggiungiamo al totale
            totale += articolo.prezzo * articolo.quantita;
        }
        //fuori dal for degli articoli, ma dentro il for degli ordini
        //stampo il totale all'interno del DOM
        ordineDiv.innerHTML += `<p><strong>Totale:</strong> ${totale} € </p>`;
        //una volta ottenuto l'ordine completo lo aggiungiamo alla lista degli ordini
        orderList.appendChild(ordineDiv);
    }
}
//Funzione per aggiornare le quantita in base all'input utente
function aggiornaQuantita(ordineIndex, articoloIndex, nuovaquantita) {
    //converte il valore della quantita in un numero intero
    ordini[ordineIndex][articoloIndex].quantita = parseInt(nuovaquantita);
    //richiama aggiornaOrdini() per far visualizzare le modifiche nell'interfaccia dell'utente
    aggiornaOrdini();
}
//inizializza la visualizzazione del menù
aggiornaMenu();
