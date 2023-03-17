import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://cart-9e2d3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app =initializeApp(appSettings)
const database = getDatabase(app)
const thingsinDB = ref(database,"things")
const items = document.getElementById("items")

const input = document.getElementById("inp");

but.addEventListener("click", function() {
    if(input.value != ""){
   const inputval  = input.value;
    push(thingsinDB,inputval)
    console.log(`${inputval} added to database`)
    clear()
    }
})


//sits and listens for changes in the database
onValue(thingsinDB,function(snapshot){
    if(snapshot.exists()){
    const thingsArray = Object.entries(snapshot.val())
    console.log(thingsArray)
    clearShoppingList();
    for(let i=0;i<thingsArray.length;i++){
        let currentThing = thingsArray[i]
        append(currentThing)
    }
}
else{
    items.innerHTML = "No items left try adding some..."
}
})

function clear(){
    input.value = "";
}

function append(inputval){
    let thingsId = inputval[0]
    let thingsValue = inputval[1]
    let newElement = document.createElement("li");
    newElement.innerHTML = thingsValue;
    items.appendChild(newElement);

    newElement.addEventListener("click",function(){
    console.log(thingsValue)
    remove(ref(database,`things/${thingsId}`))
})

}
function clearShoppingList(){
    items.innerHTML = "";
}
