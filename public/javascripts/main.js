//fazenda
(function ($) {

    var self = $.fazenda = new function () { };
    var itens = "";
    var url = "./fazenda.json";
    var posicao = [];

    $.extend(self, {
        fazenda_init: function (lstInfos) {
            $.ajax({
                url: url,
                cache: false,
                dataType: "json",
                success: function(retorno) {
                    for (var i = 0; i < retorno.data.length; i++) {
                        //Resgatando os votos positivos e negativos e somando os dois valores
                        var positive = parseFloat(retorno.data[i].positive);
                        var negative = parseFloat(retorno.data[i].negative);
                        var total = positive + negative;

                        //Efetuando o cálculo para saber quantos votos teve para positivos e negativos
                        positive = (positive / total) * 100;
                        negative = (negative / total) * 100;

                        //Fazendo o arredondamento
                        positive = Math.round(positive);
                        negative = Math.round(negative);

                        //Verificando caso algum voto existe ou é nulo e armazenando o resultado final nas variáveis
                        if (!$.isNumeric(retorno.data[i].positive)) {
                            positive = "0";
                            negative = "0";
                        } else {
                            positive = positive;
                            negative = negative;
                        }

                        posicao.push(positive);
                        posicao.sort();
                        posicao.reverse();

                        itens +=  "<li class=\"ranking-participant\">";
                        itens +=  "<div class=\"image-participant\">";
                        itens +=  " <figure>";
                        itens += "  <img src=\"" + retorno.data[i].picture + "\" alt=\"" + retorno.data[i].name + "\" />";
                        itens +=  " </figure>";
                        itens += "  <span class=\"ranking-position\">" + posicao.length + "</span>";
                        itens +=  "</div>";
                        itens +=  " <div class=\"participant-infos\">";
                        itens +=  "     <h3 class=\"participant-title\">" + retorno.data[i].name + "</h3>";
                        itens +=  "     <p class=\"participant-info\">" + retorno.data[i].description + "</p>";
                        itens +=  " </div>";
                        itens += "  <div class=\"ranking-info\">";
                        itens += "      <ul>";
                        itens += "          <li>";
                        itens += "              <span class=\"ranking-info-title\">GOSTAM</span>";
                        itens += "              <span class=\"ranking-info-percentage\">" + positive + "%</span>";
                        itens += "          </li>";
                        itens += "          <li>";
                        itens += "              <span class=\"ranking-info-title\">NÃO GOSTAM</span>";
                        itens += "              <span class=\"ranking-info-percentage\">" + negative + "%</span>";
                        itens += "          </li>";
                        itens += "      </ul>";
                        itens += "  </div>";
                        itens +=  "</li>";
                    }

                    $(".ranking-list").html(itens);
                },
                error: function() {
                    $("body").html("Houve um erro inesperado com os dados").css("background", "#fff");
                }
            });
        },
    });

    $(function () {
        self.fazenda_init(self.fazenda);
    });
})(jQuery);