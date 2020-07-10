//variables
const cart = document.getElementById('cart');
const courses = document.getElementById("courses");
const empty = document.getElementById('empty');
const grid = document.querySelector('#tbody');

//listeners
loadEventListeners();
function loadEventListeners(){
    courses.addEventListener('click', buyCourse);
    cart.addEventListener('click', deleteCourse);
    empty.addEventListener('click', emptyCart);
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

//functions
function buyCourse(e) {
    e.preventDefault();
    if(e.target.classList.contains('add-cart')){
        const course = e.target.parentElement.parentElement;
        readDataCourse(course);
    }
}

function readDataCourse(course){
    const info = {
        image: course.querySelector('img').src, 
        title: course.querySelector('h5').textContent,
        price: course.querySelector('.price').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
    }
    insertInCart(info);
}   

//insert to cart
function insertInCart(course) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${course.image}" width=100px>
    </td>        
    <td>${course.title}</td>
    <td>${course.price}</td>
    <td><a href="#" class="delete-course" data-id="${course.id}">X</td>
    `;
    grid.appendChild(row);
    saveCourseLocalStorage(course);
}

//Remove item from cart
function deleteCourse(e) {
    e.preventDefault();
    let course, courseID;
    if (e.target.classList.contains('delete-course')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseID = course.querySelector('a').getAttribute('data-id');
    }
    deleteCoursesLocalStorage(courseID);
    console.log(course);
}

//empty the cart
function emptyCart() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    emptyLocalStorage();
    return false;
}

//store courses to local storage
function saveCourseLocalStorage(course) {
    console.log('abc');
    let courses;
    courses = getCoursesLocalStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

//check for items in local storage
function getCoursesLocalStorage() {
    let courseLS;
    if (localStorage.getItem('courses') === null) {
        courseLS = [];
    }
    else
    {
        courseLS = JSON.parse(localStorage.getItem('courses'));
    }
    console.log(courseLS);
    return courseLS;
}

//put items from local storage into the cart
function readLocalStorage() {
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function(course) { 
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${course.image}" width=100px>
        </td>        
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td><a href="#" class="delete-course" data-id="${course.id}">X</td>
        `;
        grid.appendChild(row);
    });
}


//delete courses by ID in cart
function deleteCoursesLocalStorage(course) {

    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    console.log(course);
    coursesLS.forEach( function(courseLS, index) {
        if (courseLS.id === course) {
            coursesLS.splice(index, 1);
        }
    });
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//empty cart in local storage
function emptyLocalStorage() {
    localStorage.clear();
}
    
    