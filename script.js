const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);

    textAreaData.forEach( (note) => {
         return notes.push(note.value);
    })
    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') =>{
    
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text? "" : "hidden" }"> </div> 
    <textarea class="${text? "hidden" : "" }"></textarea>`;

    note.insertAdjacentHTML('afterbegin',htmlData);

    //getting the refrences
    const editbutton = note.querySelector('.edit');
    const delbutton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deleting the note
    delbutton.addEventListener('click',() => {
        note.remove();
        updateLSData();
    })

    //toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;

    editbutton.addEventListener('click',() => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })
    
    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })
    
  
    document.body.appendChild(note);
} 

//getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){ notes.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', () => addNewNote());