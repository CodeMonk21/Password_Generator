const checkBoxList = document.querySelectorAll("input[type=checkbox]")
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercase = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_-+={[}]|\:;<,>.?/"
let checkboxArray = []
let passwordLength = 0
let password = ""

//check when copy button is clicked
document.getElementById("copy-btn").addEventListener("click",()=>{
    if(password.length==0){
        alert("First Generate Password")
    }else{
        navigator.clipboard.writeText(password)
        alert(`Password copied`)
    }
})

//Check when generate button is clicked 
document.getElementById("generate-btn").addEventListener("click",()=>{
    const passwordInputValue = Number(document.getElementById("ps-length").value)
    passwordLength = passwordInputValue
    if(passwordLength<4 || passwordLength>20){
        alert(`Password length should between 4 to 20`)
    }
    else if(checkboxArray.length == 0){
        alert(`Please select checkbox`)
    }
    else{
        password = generatePassword()
        document.getElementById("password-show").value = password
    }
})

//Check when any checkbox is clicked
checkBoxList.forEach((checkBoxElement)=>
checkBoxElement.addEventListener("click",(event)=>{
    const checkbox = event.target
    if(checkbox.checked){
        addCheckboxValue(checkbox)
    }else{
        removeCheckboxValue(checkbox)
    }
}))

//fn: add character list according to checkbox 
function addCheckboxValue(checkbox){
    if(checkbox.getAttribute("id")=="uppercase-check"){checkboxArray.push(uppercase)}
    else if(checkbox.getAttribute("id")=="lower-check"){checkboxArray.push(lowercase)}
    else if(checkbox.getAttribute("id")=="number-check"){checkboxArray.push(numbers)}
    else if(checkbox.getAttribute("id")=="symbol-check"){checkboxArray.push(symbols)}
}
//fn: remove character list according to checkbox 
function removeCheckboxValue(element){
    let checkboxId = element.getAttribute("id")
    if(checkboxId=="uppercase-check"){checkboxArray = checkboxArray.filter((list) => list!=uppercase)}
    else if(checkboxId=="lower-check"){checkboxArray = checkboxArray.filter((list) => list!=lowercase)}
    else if(checkboxId=="number-check"){checkboxArray = checkboxArray.filter((list) => list!=numbers)}
    else if(checkboxId=="symbol-check"){checkboxArray = checkboxArray.filter((list) => list!=symbols)}
}

//fn: Generate random password: with all the checkbox 
function generatePassword(){
    let password = ""
    let index = 0
    let characterList = checkboxArray[index]
    for (let i=0;i<passwordLength;i++) {
        if(index >= checkboxArray.length){
            index = 0
        }
        characterList = checkboxArray[index++]
        password += characterList[randomNumber(characterList.length)] 
    }
    return password
}
//fn: return random number from 0 to given length
function randomNumber(length){
    return Math.floor(Math.random() * length);
}