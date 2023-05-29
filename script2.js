
//Prueba usuarios
const objectUsers = [
  {
    "usuario": "Amir",
    "Corrects": {
      "0": 4,
      "1": 2,
      "2": 8
    }
  },
  {
    "usuario": "Sara",
    "Corrects": {
      "0": 6,
      "1": 3,
      "2": 7
    }
  },
  {
    "usuario": "John",
    "Corrects": {
      "0": 2,
      "1": 5,
      "2": 9
    }
  },
  {
    "usuario": "Ismael",
    "Corrects": {
      "0": 1,
      "1": 10,
      "2": 9
    }
  },
  {
    "usuario": "Phill",
    "Corrects": {
      "0": 9,
      "1": 5,
      "2": 3
    }
  }
];

// Ordenar los usuarios por la cantidad de respuestas correctas
function printTopUsers() {
  
  const sortedUsers = objectUsers.sort((a, b) => {
    const totalCorrectsA = Object.values(a.Corrects).reduce((sum, value) => sum + value, 0);
    const totalCorrectsB = Object.values(b.Corrects).reduce((sum, value) => sum + value, 0);
    return totalCorrectsB - totalCorrectsA;
  });

  // Imprimir ordenados
  const form = document.getElementById("container");

  for (let i = 0; i < Math.min(5, sortedUsers.length); i++) {
    const user = sortedUsers[i];
    const totalCorrects = Object.values(user.Corrects).reduce((sum, value) => sum + value, 0);
    const position = i + 1;
    const paragraph = document.createElement("p");
    paragraph.textContent = `${position}. ${user.usuario}: ${totalCorrects} Puntos`;
    form.appendChild(paragraph);
  }
}

printTopUsers();


// Hamburguesa 
const header = document.getElementById("burger");
const container = document.getElementById("container");

const links = [
  { id: "link1", text: "Login/Register", url: "" },
  { id: "link2", text: "Quiz", url: "" },
  { id: "link3", text: "Graficas", url: "" },
];

links.forEach(link => {
  const button_link = document.createElement("button");
  button_link.id = link.id;
  button_link.textContent = link.text;
  button_link.addEventListener("click", () => {
    window.location.href = link.url;
  });
  header.appendChild(button_link);
});


/*
  function grafic (){  
let arrNumberCorrect = [1,2,3,4,5,6,4,3,2,1];
let arrNumberQuestions = [];
let nQuiz= 9;

        for(i=0; i<=nQuiz; i++){
          arrNumberQuestions.push(i);
        }
        var data = {         
          labels: arrNumberQuestions,
          
          series: [arrNumberCorrect]
        };
      
        var options = {
          width: 500,
          height: 400
        };
        
        new Chartist.Line('.ct-chart', data, options);
        
    }
    

grafic()
*/