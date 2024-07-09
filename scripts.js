/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getGameList = async () => {
  let url = 'http://127.0.0.1:5000/games';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.games.forEach(item => insertList(item.id,item.label, item.cost, item.location, item.game_date, item.duration_minutes), );
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getPLayerList = async () => {
  let url = 'http://127.0.0.1:5000/players';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.games.forEach(item => insertList(item.label, item.cost, item.location, item.game_date, item.duration_minutes))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getGameList()
// addRowHandlers('gamesTable')


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputGameLabel, inputCost, inputLocation, inputGameDate, inputDuration) => {
  const formData = new FormData();
  formData.append("label", inputGameLabel);
  formData.append("cost", inputCost);
  formData.append("location", inputLocation);
  // formData.append("game_date", inputGameDate);
  formData.append("duration_minutes", inputDuration);
  // formData.append("id", "1");
  formData.append("creation_date", "");
  console.log("inputs: ", inputGameLabel, inputCost, inputLocation, inputGameDate, inputDuration);
  // console.log("formdata: ", formData.entries());

  for (var key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  }


  let url = 'http://127.0.0.1:5000/game';
  fetch(url, {
    method: "POST",
    body: formData,
    headers: {'content-type': 'multipart/form-data'}
  })
    .then((response) => 
      [console.log(response),
    response.json()])
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const gameId = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteGame(gameId)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteGame = (gameId) => {
  console.log(gameId)
  let url = 'http://127.0.0.1:5000/game?id=' + gameId;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newGame = () => {
  let inputGameLabel = document.getElementById("newGameLabel").value;
  let inputCost = document.getElementById("newCost").value;
  let inputLocation = document.getElementById("newLocation").value;
  let inputGameDate = document.getElementById("newGameDate").value;
  let inputDuration = document.getElementById("newDuration").value;
  console.log('inputs: ', inputGameLabel, inputCost, inputLocation, inputGameDate, inputDuration);


  if (inputGameLabel === '' || inputCost=== '' || inputLocation=== '' || inputGameDate=== '' || inputDuration=== '') {
    alert("Todos os campos devem ser preenchidos!");
  } else if (isNaN(inputCost) || isNaN(inputDuration)) {
    alert("Os campos VALOR e DURAÇÃO devem ser preenchidos somente com algarismos");
  } else {
    insertList(inputGameLabel, inputCost, inputLocation, inputGameDate, inputDuration)
    postItem(inputGameLabel, inputCost, inputLocation, inputGameDate, inputDuration)
    alert("Pelada registrada!")
    // location.reload();
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newPlayer = () => {
  let inputPlayerName = document.getElementById("newPlayerName").value;
  let inputPlayerEmail = document.getElementById("newPlayerEmail").value;
  let gameId = document.getElementById("newCost").value;


  if (inputGameLabel === '' || inputCost=== '' || inputLocation=== '' || inputGameDate=== '' || inputDuration=== '') {
    alert("Todos os campos devem ser preenchidos!");
  } else if (isNaN(inputCost) || isNaN(inputDuration)) {
    alert("Os campos VALOR e DURAÇÃO devem ser preenchidos somente com algarismos");
  } else {
    insertList(inputGameLabel, inputCost, inputLocation, inputGameDate, inputDuration)
    postItem(inputGameLabel, inputCost, inputLocation, inputGameDate, inputDuration)
    alert("Pelada registrada!")
  }
}



/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (GameId,GameLabel, Cost, Location, GameDate, Duration) => {
  var item = [GameId,GameLabel, Cost, Location, GameDate, Duration]
  var table = document.getElementById('gamesTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newGameLabel").value = "";
  document.getElementById("newCost").value = "";
  document.getElementById("newLocation").value = "";
  document.getElementById("newGameDate").value = "";
  document.getElementById("newDuration").value = "";

  removeElement()
}



// function addRowHandlers(table) {
//   var table = document.getElementById(table);
//   var rows = table.getElementsByTagName("tr");
//   for (i = 0; i < rows.length; i++) {
//     var currentRow = table.rows[i];
//     var createClickHandler = function(row) {
//       return function() {
//         var cell = row.getElementsByTagName("td")[0];
//         var id = cell.innerHTML;
//         alert("id:" + id);
//       };
//     };
//     // currentRow.onclick = getPLayerList(currentRow);
//   }
// }

// document.querySelectorAll('td').forEach(cell => {
//   cell.addEventListener('click', evt => {
//     console.log('The element that was clicked was ', evt.target);
//     console.log('The cell clicked was ', cell);
//   }); 
// });