import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

let todoList = [
  {
    item: 'Buy Milk',
    dueDate: '4/10/2023'
  },
  {
    item: 'Go to College',
    dueDate: '4/10/2023'
  }
];

displayItems();

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let dateElement = document.querySelector('#todo-date');
  let todoItem = inputElement.value;
  let todoDate = dateElement.value;
  todoList.push({item: todoItem, dueDate: todoDate});
  inputElement.value = '';
  dateElement.value = '';

  const firebaseConfig = {
    apiKey: "AIzaSyAo2Yxs2tKSzvEY0oN_ks_cXb2g-M7ra2U",
    authDomain: "todoapp-8bdb8.firebaseapp.com",
    databaseURL: "https://todoapp-8bdb8-default-rtdb.firebaseio.com",
    projectId: "todoapp-8bdb8",
    storageBucket: "todoapp-8bdb8.firebasestorage.app",
    messagingSenderId: "591722680070",
    appId: "1:591722680070:web:d78d543de28cc420705887",
    measurementId: "G-B8L54TGGQB"
  };
  
     // Initialize Firebase
     const app = initializeApp(firebaseConfig);
    //  const db="https://todoapp-8bdb8-default-rtdb.firebaseio.com/"
  const database=getDatabase(app);
  
  // Reference a path in the database
  const dbRef = ref(database, 'users');
  
  // Write data to the database
  document.querySelector(".btn-todo").addEventListener("click",(e)=>{
    e.preventDefault()
    console.log(`this is todo : ${todoItem}`)
  
  set(dbRef, {
    Todo: todoItem,
    Date: todoItem,
  })
  .then(() => {
    console.log("Data written successfully!");
  })
  .catch((error) => {
    console.error("Error writing data:", error);
  });
  })
  
  displayItems();
}

function displayItems() {
  let containerElement = document.querySelector('.todo-container');
  let newHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    let {item, dueDate} = todoList[i];
    newHtml += `
      <span>${item}</span>
      <span>${dueDate}</span>
      <button class='btn-delete' onclick="todoList.splice(${i}, 1);
      displayItems();">Delete</button>
    `;
  }
  containerElement.innerHTML = newHtml;
}


