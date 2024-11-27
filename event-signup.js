if(typeof window === "undefined") {
    // window object represents the browser window
    // if window is undefined, export
    module.exports = {  attachEventListener,
                        formDataObject,
                        validateEventName,  
                        validateRepresentativeName, 
                        validateRepresentativeEmail, 
                        validateRoleSelection };
} else {
    // on load window, invoke init
    window.onload = init;
}

/**
 * Selects form elemtent and invokes attachEventListener().
 */
function init(){
    // Select html element
    const formNode = document.querySelector("#event-signup");
    
    // Invokes function to attach event listener to form and function to form
    attachEventListener(formNode, validateForm);
}


/**
 * Attaches event listener and callback function to element
 * @param {HTMLelement} formNode - html element to which the submit event listener will be attached
 * @param {function} - callback function to be invoked when form is submitted
 */
function attachEventListener(formNode, callback) {
    formNode.addEventListener("submit", (event) => {
        event.preventDefault();
        callback();
    })
}

/**
 * Validates form by checking values of input fields. Ensures criteria are met.
 * If inputs are valid, invoke formDataObject(). Clears error messages.
 */
function validateForm(){

    // clear error messages
    clearErrorMessages();

    // validate four inputs, selects require html elements
    const eventNameSection = document.querySelector("#event-name-section");
    const eventNameInputNode = document.querySelector("#event-name");
    const isValidEventName = validateEventName(eventNameInputNode.value, eventNameSection);


    const representativeNameSection = document.querySelector("#representative-name-section");
    const representativeNameInputNode = document.querySelector("#representative-name");
    const isValidRepName = validateRepresentativeName(representativeNameInputNode.value, representativeNameSection);


    const representativeEmailSection = document.querySelector("#representative-email-section");
    const representativeEmailInputNode = document.querySelector("#representative-email");
    const isValidRepEmail = validateRepresentativeEmail(representativeEmailInputNode.value, representativeEmailSection);

    const roleSelectionSection = document.querySelector("#role-selection-section");
    const roleSelectionNode = document.querySelector("#role-selection");
    const isValidRole = validateRoleSelection(roleSelectionNode.value, roleSelectionSection);

    // if all 4 inputs are valid, invoke function to create data object
    if(isValidEventName && isValidRepName && isValidRepEmail && isValidRole){
        formDataObject(eventNameInputNode.value, representativeNameInputNode.value, representativeEmailInputNode.value, roleSelectionNode.value);
    }
}

/**
 * Creates an object containing form data. Includes, event name, 
 * representative name, representative name, representative's role
 *
 * @param {string} event - The name of the event.
 * @param {string} name - The name of the representative.
 * @param {string} email - The email address of the representative.
 * @param {string} role - The role of the representative.
 * @returns {object} - form data object6
 */
function formDataObject(event, name, email, role){
    let formData = {event: event,
                    name: name,
                    email: email,
                    role: role
    };
    console.log(formData);
    return formData;
}


/**
 * Validates the event name input by checking if it is empty.
 * If the event name is empty, an error message is displayed.
 *
 * @param {string} eventName - The event name 
 * @param {HTMLelement} section - The section that the error message is displayed
 * @returns {boolean} - Returns "true' if event name is not empty, if it is, return "false"
 */
function validateEventName(eventName, section){
    let event = escapeHTML(eventName);

    // Check if input was empty
    if(event === ""){
        let error = "Please enter an event name";
        displayErrorMessage(section, error);
        return false;
    }else{
        return true;
    }
}

/**
 * Validates the representative name input by checking if it is empty.
 * If the representative name is empty, an error message is displayed.
 *
 * @param {string} representativeName - The name of the representative
 * @param {HTMLelement} section - The section that the error message is displayed
 * @returns {boolean} Returns "true" if the representative name is not empty, if it is, returns "false".
 */
function validateRepresentativeName(representativeName, section){
    let representative = escapeHTML(representativeName);

    // checks if input is empty
    if(representative === ""){
        let error = "Please enter a name";
        displayErrorMessage(section, error);
        return false;
    }else{
        return true;
    }
}

/**
 * Validates the representative email input by checking if it is empty 
 * and if it matches the required email format.
 * If either occurs, an error message is displayed.
 *
 * @param {string} representativeEmail - The email address of the representative
 * @param {HTMLelement} section - The section that the error message is displayed.
 * @returns {boolean} Returns "true" if the email address is not empty and passes the regex pattern.
 *                    If the email is empty, or fails the regex pattern test, returns "false"
 */
function validateRepresentativeEmail(representativeEmail, section){
    let email = escapeHTML(representativeEmail);

    // Regex pattern for email
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i;

    // checks if email address inputted is empty
    if(email === ""){
        let error = "Please enter an email address";
        displayErrorMessage(section, error);
        return false
    // tests email input against email regex pattern
    }else if(!(pattern.test(email))){
        let error = "Please enter a valid email address";
        displayErrorMessage(section, error);
        return false;
    }else{
        return true;
    }
}

/**
 * Validates the role selection input by checking if a valid role has been selected from the dropdown.
 * If no role is selected, an error message is displayed.
 *
 * @param {string} roleSelection - The selected value from the role selection dropdown.
 * @param {HTMLelement} section - The section that the error message will be displayed.
 * @returns {boolean} Returns "true" if a role is selected, if no role is selected, returns "false".
 */
function validateRoleSelection(roleSelection, section){

    // check if value was selected from dropdown
    if(roleSelection === ""){
        let error = "Please select a role";
        displayErrorMessage(section, error);
        return false;
    }else{
        return true;
    }
}


/**
 * Creates and displays error messages to appropriate node and corresponding message
 * @constructor
 * @param {element} element - element to display error message to
 * @param {string} error - error message to be displayed
 */
function displayErrorMessage(element, error){

    // creates span element to insert error message
    const errorMessageNode = document.createElement("div");

    // inserts text from error into span
    errorMessageNode.textContent = error;

    // assigns error message element class "errorMessage"
    errorMessageNode.className = "error-message";

    // appends error message element to parent, section where invalid input occurred
    element.appendChild(errorMessageNode);
}


/**
 * Clears error messages upon entering valid entry and pressing submit
 */
function clearErrorMessages(){
    // selects all error messages
    const errorMessages = document.querySelectorAll(".error-message");

    // loops through error messages that were selected and removes them
    for(const errors of errorMessages){
        errors.remove();
    }
}


/**
 * Translates special characters to corresponding HTML entities
 * @param {string} input - text inputs
 * @returns HTML entities after converting special characters
 */
function escapeHTML(input){
    return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}