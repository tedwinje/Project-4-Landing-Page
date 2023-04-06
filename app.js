/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navHeadings = document.querySelector('ul');
const sectionElements = document.querySelectorAll('section');
const navListHeadings = document.querySelectorAll('li');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//function that gets the correct section, concat with # to pass as href for link
function getSectionId(section) {
    const id = "#";
    let attr = section.getAttributeNode('id').value;
        attr = id.concat(attr);
        return attr;
}

//function retrieves section name from nav dataset
function getSectionName(section) {
    let sectionName = section.getAttributeNode('data-nav').value;
    return sectionName;    
}

//fuction retrieves the id value for each section and returns value
function setSectionId(section) {
    let sectionId = section.getAttributeNode('id').value;
    return sectionId;
}

//function to create link element / add click event listener to scroll section into view
function newLinkElement(section) {
    const link = document.createElement('a');
    link.innerHTML = getSectionName(section);
    link.href = getSectionId(section);
    link.addEventListener('click', (event) => {
        event.preventDefault();
        section.scrollIntoView({behavior: 'smooth'});
    });
    link.classList.add('menu__link');
    return link;
}
//function to create li element and append link to element. 
function newListElement(section) {
    const navListItem = document.createElement('li');
    navListItem.setAttribute('id', setSectionId(section));
    navListItem.appendChild(newLinkElement(section));   
    navListItem.classList.add('navbar__menu');  
    return navListItem; 
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// function that loops through each section element to create nav menu. Appends list item to unordered list
sectionElements.forEach((section) => {
    navHeadings.appendChild(newListElement(section));   
});

// function that determines if section is in viewport / highlights nav menu of section in view
const navLi = document.querySelectorAll('li');

window.addEventListener('scroll', function() {
    
    sectionElements.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        const inViewPort = bounds.top >= 0  && bounds.left >= 0 && bounds.right <= this.window.innerWidth && bounds.bottom <= this.window.innerHeight;        
        if (inViewPort) {            
            section.classList.add('your-active-class');
            const sectionId = section.getAttribute('id');
            navLi.forEach((li) => {
                const menuId = li.getAttribute('id');
                if (sectionId == menuId) {                
                    li.classList.add('menu__active');
                } else {
                    li.classList.remove('menu__active');
                }
            });                                
        } else {
            section.classList.remove('your-active-class');
        }        
    });
});


// Add below code to my newLinkElement function to listen for click event and apply smooth scrolling
/* link.addEventListener('click', (event) => {
    event.preventDefault();
    section.scrollIntoView({behavior: 'smooth'});
});*/

/**
 * End Main Functions
 * Begin Events
 * 
*/

