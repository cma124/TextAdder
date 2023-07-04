const textInput = document.querySelector("#text-input");
const textOutput = document.querySelector("#result-output");

const addButton = document.querySelector("#add-btn");
const clearButton = document.querySelector("#secondary-clear-btn");
const secondaryAddBtn = document.querySelector("#secondary-add-btn");

const listContainer = document.querySelector("#list-container");
const secondaryResult = document.querySelector("#secondary-result");

// Event -> Calculate Sum of Input Text Area
addButton.addEventListener("click", (event) => {
    event.preventDefault();

    let textValue = textInput.value;

    // Create List in Secondary Container
    if(textValue.trim() !== "" && textValue.replace(/\D/g, "") !== "") {
        createList(calculatePrimarySum(textValue));

        const closeArray = document.querySelectorAll(".close");
        closeArray.forEach(arr => {
            arr.onclick = () => {
                arr.parentElement.remove();
            }
        });    
    }
});

// Event -> Calculate Sum of All Lists in Secondary Container
secondaryAddBtn.addEventListener("click", () => {
    let liArray = document.querySelectorAll(".list-result");
    let allLiValue = 0;

    liArray.forEach(arr => {
        allLiValue += parseInt(arr.textContent);
    });

    secondaryResult.textContent = allLiValue;    
});

// Event -> Remove All Lists in Secondary Container
clearButton.addEventListener("click", ()=> {
    const liArray = document.querySelectorAll(".list-result");

    liArray.forEach(arr => {
        arr.remove();
    });

    secondaryResult.textContent = "";
});

// Function -> Create List & Close Button in Secondary Container
const createList = input => {
    const li = document.createElement("li");
    const liValue = document.createTextNode(input);
    li.appendChild(liValue);
    li.className = "box list-result";
    listContainer.appendChild(li);

    const span = document.createElement("span");
    const spanValue = document.createTextNode("X");
    span.appendChild(spanValue);
    span.className = "close";

    li.appendChild(span);
}

// Function -> Filter Text & Calculate Sum
const calculatePrimarySum = str => {
    let result = 0;

    let resultArray = str.split("\n");

    resultArray = resultArray.map(element => element.toLowerCase().trim());
    console.log(resultArray);

    resultArray = resultArray.filter(element => !!element).map(element => {
        if(element.indexOf(" ") === -1) {
            element = " " + element;
        }
        return element;
    });
    console.log(resultArray);

    // resultArray = resultArray.map(element => {
    //     if(element.indexOf(" ") === -1) {
    //         element = " " + element;
    //     }
    //     return element;
    // });

    resultArray = resultArray.map(element => {
        // element.indexOf("r") !== -1
        // ? element = element.substring(element.indexOf("r"))
        // : element = element.substring(element.lastIndexOf(" "));

        if(element.indexOf("r") !== -1) {
            element = element.substring(element.indexOf("r"));
        } 
        else if(element.indexOf("ပတ်") !== -1) {
            element = element.substring(element.indexOf("ပတ်"));
        }
        else if(element.indexOf(" ") !== -1) {
            element = element.substring(element.lastIndexOf(" "));
        }

        return element;
    });
    console.log(resultArray);

    resultArray.forEach(arr => {
        // let tempValue = parseInt(arr.substring(1));
        let tempValue = parseInt(arr.replace(/\D/g, ""));

        if(!isNaN(tempValue)) {
            // arr[0] === "r"
            // ? result += (tempValue * 2)
            // : result += tempValue;

            tempValue = 0;

            if(arr[0] === "r") {
                arr = arr.replace(/\D/g, "");
                tempValue = parseInt(arr);
                result += (tempValue * 2);
                console.log("R Work", tempValue);
            } 
            else if(arr[0] === " ") {
                arr = arr.replace(/\D/g, "");
                tempValue = parseInt(arr);
                result += tempValue;
                console.log("Space Work", tempValue);
            } 
            else if(arr.startsWith("ပတ်")) {
                arr = arr.replace(/\D/g, '');
                // console.log(arr);
                tempValue = parseInt(arr);
                result += (tempValue * 20 - tempValue);
                console.log("Around Work", tempValue);
                console.log(result);
            }
        }
    });
    
    return result;
}