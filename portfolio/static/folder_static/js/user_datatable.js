$(document).ready(function() {
	$('table').dataTable( {
        "bJQueryUI": false,
		"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": "../ajax_user/",
		"bPaginate": true,
        "sPaginationType": "full_numbers",
		"aoColumns": geraColunas(),
		"oLanguage": {
            "oPaginate": {
                "sFirst": "Primeiro",
                "sLast": "Último",
                "sNext": "Próximo",
                "sPrevious": "Anterior"
            },
            "sEmptyTable": "Não foram encontrados registros",
            "sInfo": "<span>Exibindo de <b>_START_</b> até <b>_END_</b> de <b>_TOTAL_</b> registros encontrados.</span>",
            "sInfoEmpty": " ",
            "sInfoFiltered": "",
            "sInfoThousands": ".",
            "sLengthMenu": "Exibir _MENU_ registros",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sSearch": "Pesquisa:",
            "sZeroRecords": "Não foram encontrados registros"
        },
	});
});

function geraColunas() {
    var colunas = [
                        /*{ "sTitle": "Nome", "sClass": "grid-cell left ws", "mData": "json_reg.str_nm_user" },
                        { "sTitle": "Login", "sClass": "center ws", "sWidth": "30%", "mData": "json_reg.str_login" },
                        { "sTitle": "Email", "sClass": "center ws", "sWidth": "30%", "mData": "json_reg.str_email" }
						*/
			{"sWidth": '200px', "mDataProp": "json_reg.str_nm_user"},
        		{"sWidth": '200px', "mDataProp": "json_reg.str_login"},
        		{"sWidth": '200px', "mDataProp": "json_reg.str_email"},
			{ "sWidth":'100px' ,"mDataProp": function(data, type, json_reg) {

                               var buttonAction = '<div class="btn-group">\
                               	       			<button class="btn">Ação</button>\
							<button class="btn dropdown-toggle" data-toggle="dropdown">\
								<span class="caret"></span>\
							</button>\
							<ul class="dropdown-menu">\
								<li><a href="#' + data.json_reg._metadata.id_reg +'"><i class="icon-pencil"></i> Editar</a></li>\
								<li><a href="#"><i class="icon-trash"></i> Excluir</a></li>\
								<li><a href="#"><i class="icon-ban-circle"></i> Ban</a></li>\
								<li class="divider"></li>\
								<li><a href="#"><i class="i"></i> Tornar admin</a></li>\
							</ul>\
						</div>';
                               var detalhes = "";
                               var alterar = "";
                               var excluir = "";
                               
                              // detalhes = "&nbsp;<a href='javascript:Nada();' onclick='javascrip:btDetalhes(" + full._metadata.id_reg + ");' title='Detalhes'><img valign='absmiddle' alt='Detalhes' src='" + urlPadrao + "/Padrao/Imagens/ico_detalhes.png' /></a>";
                               
                               
                               //alterar = "&nbsp;<a href='javascript:Nada();' onclick='javascrip:btAlterar(" + full._metadata.id_reg + ");'  title='Editar'><img valign='absmiddle' alt='Editar' src='" + urlPadrao + "/Padrao/Imagens/ico_editar.png' /></a>";
                               
                               
                              // excluir = "&nbsp;<a href='javascript:Nada();' onclick='javascrip:btExcluir(" + full._metadata.id_reg + ");'  title='Excluir'><img valign='absmiddle' alt='Excluir' src='" + urlPadrao + "/Padrao/Imagens/ico_excluir.png' /></a>";
                               
                               return buttonAction; //detalhes + alterar + excluir;
                           }
                       }

                  ];
    return colunas;
}
