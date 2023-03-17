import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref,push,onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://cart-9e2d3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app =initializeApp(appSettings)
const database = getDatabase(app)
const thingsinDB = ref(database,"things")
const items = document.getElementById("items")

const input = document.getElementById("inp");
but.addEventListener("click", function() {
   const inputval  = input.value;
    console.log(thingsinDB,inputval);
    push(thingsinDB,inputval)
    clear()
    console.log(`${inputval} added to database`)
})

onValue(thingsinDB,function(snapshot){
    // console.log(snapshot.val())
    const thingsArray = Object.entries(snapshot.val())
    console.log(thingsArray)
    clearShoppingList();
    for(let i=0;i<thingsArray.length;i++){
        let currentThing = thingsArray[i]
        let thingsArraykey = currentThing[0]
        let thingsArrayvalue = currentThing[1]
        append(thingsArrayvalue)
    }

})

function clear()    {
    input.innerHTML = "";
}

function append(inputval){
    // items.innerHTML += `<li>${inputval}</li>`

    let newElement = document.createElement("li");
    newElement.innerHTML = inputval;
    items.appendChild(newElement);

}
function clearShoppingList(){
    items.innerHTML = "";
}