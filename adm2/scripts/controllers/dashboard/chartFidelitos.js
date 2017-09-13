

window.onload = function() {
	
	var url = "http://clientefiel.azurewebsites.net/api/Company/callDataJsonChar?nameChart=";
	var token = 'VsflKrYGpUof1pXxXzObSBD7LxDWR2EcGxegnKszJzhdLvZnaYl78VVaqZMFuQx3I8Q2DxB8FmGYGrQIXRE0-qO8WsUvJxOi7zbKmO9Sd5kQ8kLdGheg8xfZyj5exQWl76499O9n93FpV4ngxTVI6ULf7Ak86SPzuHfN1MFgsSgyVK74aFPt3Pvee8GGckqHrWSYesN21-ZagYfyjlk-VF8gwdu2mLNb5L45CVLZWdQct9CO5PBeArW1GPDNyogVnGn3oMJlS4IlTUgCdcZP3w';
	
	//--------------------------- Informação Geral ---------------------------------------------------------------
	
	$.ajax({ 
		type: 'GET',
		dataType: 'json',
		async : true,
		data: {},
		url: url+"DATA_JSON_INFO_ALL",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'bearer '+token);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);			
		},
		success: function (dados) {	
				$("#info_qtd_client").html(dados[0].qtd_client);
				$("#info_qtd_register").html(dados[0].qtd_register);
				$("#info_qtd_reward").html(dados[0].qtd_reward);
		}
		
	});
	
		//--------------------------- Grafico registro mensal --------------------------------------------------------
	
	
		$.ajax({ 
		type: 'GET',
		dataType: 'json',
		async : true,
		data: {},
		url: url+"DATA_JSON_REGISTER_FOR_MONTH",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'bearer '+token);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			$("#loading_1").hide();
		},
		success: function (dados) {
			var dadosLabels = new Array();
			var dadosValue  = new Array();
			var dadosValue2  = new Array();
			var dadosValue3  = new Array();
			
			$(dados).each(function( index ) {
				dadosLabels.push(this.mes_ano);
				dadosValue.push(this.qtd_registro);
				dadosValue2.push(this.last_qtd_registro);
				dadosValue3.push(this.reward_qtd_registro);
			});
			
			var config = {
				type: 'line',
				data: {
					labels: dadosLabels,
					datasets: [{
						label: "Registros",
						backgroundColor: window.chartColors.blue,
						borderColor: window.chartColors.blue,
						data: dadosValue,
						fill: false,
					},
					{
						label: "Ultimo Registro",
						backgroundColor: window.chartColors.red,
						borderColor: window.chartColors.red,
						data: dadosValue2,
						fill: false,
					},
					{
						label: "Recompensa Recolhida",
						backgroundColor: window.chartColors.green,
						borderColor: window.chartColors.green,
						data: dadosValue3,
						fill: false,
					}
					]
				},
				options: {
					responsive: true,
					title:{
						display:true,
						text:'Registro de Pontos Mensal'
					}
				}
			};
			
			$("#loading_1").hide();
			var ctx = document.getElementById("canvas1").getContext("2d");
			window.myLine =  new Chart(ctx, config);			
		}
		});
		
		
		//--------------------------- Grafico avaliação --------------------------------------------------------
	
		
		$.ajax({ 
		type: 'GET',
		dataType: 'json',
		async : true,
		data: {},
		url: url+"DATA_JSON_EVALUATION",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'bearer '+token);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			$("#loading_2").hide();
		},
		success: function (dados) {
			var dadosLabels = new Array();
			var dadosValue1  = new Array();
			var dadosValue2  = new Array();
			var dadosValue3  = new Array();
			var dadosValue4  = new Array();
			var dadosValue5  = new Array();
			
			$(dados).each(function( index ) {
				if(this.label == 1){
					dadosValue1.push(this.value);
				}
				if(this.label == 2){
					dadosValue2.push(this.value);
				}
				if(this.label == 3){
					dadosValue3.push(this.value);
				}
				if(this.label == 4){
					dadosValue4.push(this.value);
				}
				if(this.label == 5){
					dadosValue5.push(this.value);
				}
				
			});
			
			 var barChartData = {
				labels: dadosLabels,
				datasets: [
					{
						label: '1 Estrela',
						backgroundColor:  color(window.chartColors.red).alpha(0.5).rgbString(),
						borderColor: window.chartColors.red,
						borderWidth: 1,
						data: dadosValue1
					},
					{
						label: '2 Estrelas',
						backgroundColor:  color(window.chartColors.orange).alpha(0.5).rgbString(),
						borderColor: window.chartColors.orange,
						borderWidth: 1,
						data: dadosValue2
					},
					{
						label: '3 Estrelas',
						backgroundColor:  color(window.chartColors.yellow).alpha(0.5).rgbString(),
						borderColor: window.chartColors.yellow,
						borderWidth: 1,
						data: dadosValue3
					},
					{
						label: '4 Estrelas',
						backgroundColor:  color(window.chartColors.blue).alpha(0.5).rgbString(),
						borderColor: window.chartColors.blue,
						borderWidth: 1,
						data: dadosValue4
					},
					{
						label: '5 Estrelas',
						backgroundColor:  color(window.chartColors.green).alpha(0.5).rgbString(),
						borderColor: window.chartColors.green,
						borderWidth: 1,
						data: dadosValue5
					},
					]

			};
				
			
			$("#loading_2").hide();
			var ctx = document.getElementById("canvas2").getContext("2d");
            window.myBar = new Chart(ctx, {
					type: 'bar',
					data: barChartData,
					options: {
						responsive: true,
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: 'Total de Avaliacoes'
						}
					}
				});
			}
		});
		
		
		
		
			
		//--------------------------- Grafico dia da semana --------------------------------------------------------
	
		var color = Chart.helpers.color;
		$.ajax({ 
		type: 'GET',
		dataType: 'json',
		async : true,
		data: {},
		url: url+"DATA_JSON_DAY_OF_THEWEEK",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'bearer '+token);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			$("#loading_3").hide();
		},
		success: function (dados) {
			var dadosLabels = new Array();
			var dadosValue  = new Array();
			
			$(dados).each(function( index ) {
				dadosLabels.push(this.label);
				dadosValue.push(parseInt(this.value));
			});
			
			 var barChartData = {
            labels: dadosLabels,
            datasets: [{
                label: '',
                backgroundColor:  color(window.chartColors.blue).alpha(0.5).rgbString(),
				borderColor: window.chartColors.blue,
                borderWidth: 1,			
                data: dadosValue
            }]

        };
				
			
			$("#loading_3").hide();
			var ctx = document.getElementById("canvas3").getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'radar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Registros por Dia da Semana'
                    }
                }
            });
		}
		});
		
		
		//--------------------------- Grafico Manifestação --------------------------------------------------------
	
		var color = Chart.helpers.color;
		$.ajax({ 
		type: 'GET',
		dataType: 'json',
		async : true,
		data: {},
		url: url+"DATA_JSON_REGISTER_OMBUDSMAN",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'bearer '+token);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			$("#loading_4").hide();
		},
		success: function (dados) {			
			var dadosValue1  = new Array();
			var dadosValue2  = new Array();
			var dadosValue3  = new Array();
			
			
			$(dados).each(function( index ) {
				if(this.id_type == 1){
					dadosValue1.push(this.qtd_ombudsman);
				}
				if(this.id_type == 2){
					dadosValue2.push(this.qtd_ombudsman);
				}
				if(this.id_type == 3){
					dadosValue3.push(this.qtd_ombudsman);
				}
							
			});
			
			 var barChartData = {
				labels: '',
				datasets: [					
					{
						label: 'Reclamacao',
						backgroundColor:  color(window.chartColors.red).alpha(0.5).rgbString(),
						borderColor: window.chartColors.red,
						borderWidth: 1,
						data: dadosValue1
					},
					{
						label: 'Sugestao',
						backgroundColor:  color(window.chartColors.blue).alpha(0.5).rgbString(),
						borderColor: window.chartColors.blue,
						borderWidth: 1,
						data: dadosValue2
					},
					{
						label: 'Elogio',
						backgroundColor:  color(window.chartColors.green).alpha(0.5).rgbString(),
						borderColor: window.chartColors.green,
						borderWidth: 1,
						data: dadosValue3
					},
					]

			};
				
			
			$("#loading_2").hide();
			var ctx = document.getElementById("canvas4").getContext("2d");
            window.myBar = new Chart(ctx, {
					type: 'bar',
					data: barChartData,
					options: {
						responsive: true,
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: 'Manifestacoes'
						}
					}
				});
        			
			
			$("#loading_4").hide();			
			}
		});
		
		
	

	
};