const openPopUpBtn = document.querySelector('.add-book');
const showOptions = document.querySelector('.top');
const mainBookDisplay = document.querySelector('.main-container');
const booksOnPage = document.querySelectorAll('.book-item');
const bookNumber = document.querySelector('.book-number');
const completedBooks = document.querySelector('.completed-number');
const totalPagesString = document.querySelector('.page-number');
const bookDetailPopup = document.querySelector('.overLayFlex');

const bookTitlePopup = document.querySelector('.book-title');
const bookAuthorPopup = document.querySelector('.book-author');
const bookPagePopup = document.querySelector('.book-page');
const bookUrlPopup = document.querySelector('.detail-popup-src');
const exitPopup = document.querySelector('.close-popup');
const deleteObject = document.querySelector('.remove-book');

const enterUserForm = document.querySelector('.input-complete');
let display = 0;

let myLibrary = [{title: "The Hobbit", author: "JRR Tolkin", pages: "123", url: "https://images-na.ssl-images-amazon.com/images/I/A1E+USP9f8L.jpg"},{title: "Murder On The Express ", author: "Agatha Christie", pages: "256", url: "https://images-na.ssl-images-amazon.com/images/I/51+2QZIRWfL.jpg"},{title: "1984", author: "George Orwell", pages: "328", url: "https://m.media-amazon.com/images/I/41E9Z5XaHcL.jpg"}];
let currentBookNumber = myLibrary.length;

goThroughArrayDisplayAndAdd()
clickableImg();
updateInformation();

enterUserForm.addEventListener('click',function(){
    let titleOfBook = document.getElementById('title').value;
    let title = titleOfBook;

    let authorName = document.getElementById('author').value;
    let author = authorName;

    let pageNumber = document.getElementById('pNumber').value;
    let pNumber = pageNumber;

    let bookImage = document.getElementById('url').value;
    let bookUrl = bookImage;


    myLibrary.push(new Book(title,author,pNumber,bookUrl));
    clearScreen(mainBookDisplay);
    goThroughArrayDisplayAndAdd();
});

//Open the userpopup box
openPopUpBtn.addEventListener("click", ()=>{
    if(display == 0){
        showOptions.style.display = 'block';
        openPopUpBtn.style.backgroundColor = "darkred";
        ++display;
    }else if(display == 1){
        showOptions.style.display = 'none';
        openPopUpBtn.style.backgroundColor = "rgb(0, 80, 145)";
        openPopUpBtn.innerHTML=`+`;
        --display;
    }
})

function Book(title,author,pages,url){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.url = url;
}

Book.prototype.addBookToLibrary = function(){
    myLibrary.push(newBook);
}

Book.prototype.removeBookFromLibrary = function(){

}

function goThroughArrayDisplayAndAdd(){
    myLibrary.forEach((element,index)=>{
        //every element added, give a data- attribute to note and delete.
        let newDivElement = document.createElement('div');
        let headerTwo = document.createElement('h2');
        let text = document.createTextNode(element.title);
        headerTwo.appendChild(text);
        let newElement = document.createElement("img");
        newElement.setAttribute('src', element.url);
        newElement.setAttribute('data-element', index);

    
        let addedDiv = mainBookDisplay.appendChild(newDivElement);

        addedDiv.appendChild(newElement);
        addedDiv.appendChild(headerTwo);
        addedDiv.setAttribute('class', 'book-item');
        addedDiv.setAttribute('data-element', index);


        clickableImg();
    });
}

function clearScreen(mainBookDisplay){
    while(mainBookDisplay.firstChild){
        mainBookDisplay.removeChild(mainBookDisplay.firstChild);
    }
}


function clickableImg(){
    let allImg = document.querySelectorAll('img');
    allImg.forEach(element =>{
        
        element.addEventListener('click', (clickedElement)=>{
            bookDetailPopup.style.display = 'flex';
            updatePopup(element.getAttribute('data-element'));
        })

    });

}

function updatePopup(index){
    let currentObject = myLibrary[index];

    bookTitlePopup.innerHTML = currentObject.title;
    bookAuthorPopup.innerHTML= currentObject.author;
    bookPagePopup.innerHTML = currentObject.pages;
    bookUrlPopup.setAttribute('src', currentObject.url);
    deleteObject.setAttribute('data-element',index);
}



exitPopup.addEventListener('click',function(){
    bookDetailPopup.style.display = 'none';
});

deleteObject.addEventListener('click',()=>{
    let deleteElement = deleteObject.getAttribute('data-element');
    myLibrary.splice(deleteElement, 1);
    console.log(myLibrary);

    clearScreen(mainBookDisplay);
    goThroughArrayDisplayAndAdd();

    bookDetailPopup.style.display = 'none';
    updateInformation()

});





function updateInformation(){
    bookNumber.innerHTML=myLibrary.length;
    let totalPages = 0;

    myLibrary.forEach(element =>{
        let currentNumber = Number(element.pages)
        totalPages += currentNumber;
    })

    totalPagesString.innerHTML=totalPages;

    



};













