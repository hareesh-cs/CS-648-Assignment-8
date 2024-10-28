/*eslint-env browser*/
let employees = [ 
    ["Hareesh Sikakollu", "Developer", 1005], 
    ["Sarah Johnson", "Product Manager", 1004], 
    ["Michael Smith", "Data Analyst", 1003], 
    ["Jessica Lee", "Human Resources", 1002], 
    ["Emily Davis", "Marketing Specialist", 1001] 
]; 
 
const employeeForm = document.getElementById("employeeForm"); 
const employeeTableBody = document.getElementById("employeeTableBody"); 
const employeeCount = document.getElementById("employeeCount"); 
 
function validateTextInput(input, messageElement, message) { 
    const regex = /^[a-zA-Z\s]+$/;
    if (!input.value.trim()) { 
        messageElement.textContent = message; 
        return false; 
    } else if (!regex.test(input.value.trim())) {
        messageElement.textContent = "Only letters and spaces are allowed.";
        return false;
    }
    messageElement.textContent = ""; 
    return true; 
} 
 
function validateExtension(input, messageElement) { 
    if (!input.value.trim()) { 
        messageElement.textContent = "Extension is required."; 
        return false; 
    }
    messageElement.textContent = ""; 
    return true; 
} 

document.getElementById("extension").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});
 
function renderEmployees() { 
    employeeTableBody.innerHTML = employees 
        .map((employee, index) => ` 
            <tr> 
                <td>${employee[0]}</td> 
                <td>${employee[1]}</td> 
                <td>${employee[2]}</td> 
                <td><button class="deleteBtn" data-index="${index}">Delete</button></td> 
            </tr> 
        `).join(''); 
    employeeCount.textContent = `Showing ${employees.length} Employees`; 
} 
function addEmployee() { 
    const nameInput = document.getElementById("name"); 
    const titleInput = document.getElementById("title"); 
    const extensionInput = document.getElementById("extension"); 
 
    const nameError = document.getElementById("nameError"); 
    const titleError = document.getElementById("titleError"); 
    const extensionError = document.getElementById("extensionError"); 
 
    const isNameValid = validateTextInput(nameInput, nameError, "Name is required.");
    const isTitleValid = validateTextInput(titleInput, titleError, "Title is required.");
    const isExtensionValid = validateExtension(extensionInput, extensionError);

    if (!isNameValid || !isTitleValid || !isExtensionValid) {
        return;
    }
 
    employees.push([nameInput.value.trim(), titleInput.value.trim(), extensionInput.value.trim()]); 
    renderEmployees(); 
    employeeForm.reset(); 
} 
 
function deleteEmployee(index) { 
    employees.splice(index, 1); 
    renderEmployees(); 
} 
 
document.getElementById("addEmployee").addEventListener("click", addEmployee); 
 
employeeTableBody.addEventListener("click", (e) => { 
    if (e.target.classList.contains("deleteBtn")) { 
        const index = e.target.getAttribute("data-index"); 
        deleteEmployee(index); 
    } 
}); 
 
document.addEventListener("DOMContentLoaded", renderEmployees); 
