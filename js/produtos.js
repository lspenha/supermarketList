var produtos = [];

$("#addProduto").bind("click", addProduto);

function addProduto() {
  if (validar()) {
    console.log("Adicionando produto...");

    newProduto = {
      id: produtos.length + 1,
      nome: $('#nomeProduto').val().trim(),
      preco: moneyToFloat($('#precoUnitarioProduto').val()),
      qtd: $('#qtdProduto').val()
    };

    valorTotal();
    produtos.push(newProduto);

    clearInputs();
    var id = gerarTabela(produtos);
    $("#excluir" + id).bind("click", excluirProduto);

    if (produtos.length > 0) {
      $('#limparTudo').prop('disabled', false);
    }

    calcValorTotal(produtos);
  } else {
    console.log("Não é possível adicionar o produto...");
  }
}

function excluirProduto() {
  var id = $(this).val();

  var index = produtos.findIndex((element, index) => { if (element.id == id) { return index + 1 } });
  produtos.splice(index, 1);

  $('#produto' + id).remove();

  if (!produtos.length > 0) {
    $('#limparTudo').prop('disabled', true);
  }

  calcValorTotal(produtos);
}

$("#limparTudo").click(limparLista)

function limparLista() {
  produtos = [];
  calcValorTotal(produtos);
  $('#tBody').empty();
  $('#limparTudo').prop('disabled', true);
  parseFloat($('#valorTotal').text("00,00"));
}


function calcValorTotal(produtos) {
  var vt = 0;
  produtos.forEach((produto) => {
    vt += produto.preco * produto.qtd;
  })
  $('#valorTotal').text(vt.toFixed(2).replace(".", ","));
};


function gerarTabela(produtos) {
  var produto = produtos[(produtos.length - 1)]
  newRow = "<tr class='row' id='produto" + produto.id + "'>" +
    "<td class='d-none d-md-table-cell col-2'>#" + produto.id + "</td>" +
    "<td class='col-4 small-sm'>" + produto.nome + "</th>" +
    "<td class='col-2 text-center'>" + produto.qtd + "</th>" +
    "<td class='col-4 col-md-3 small-sm mask-money'>R$ " + produto.preco.replace('.', ',') + "</th>" +
    "<td class='col-1 text-center'><button value='" + produto.id + "' id='excluir" + produto.id + "' class='btn btn-outline-danger btn-sm circle'><i class='fas fa-trash'></i></button></th>" +
    "</tr>";
  $('#tBody').append(newRow);

  return produto.id;
}


function subValortotal(){

};