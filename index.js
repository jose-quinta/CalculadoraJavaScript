
var cifra="";
var acumulado=0;
var suma=false, resta=false, multiplicacion=false, division=false;
var pOperacion=true;
function displayNumero(numero){
	//alert("prueba");
	//document.getElementById("display").value+=numero;//mi manera
	document.getElementById("display").value = cifra+numero;
	cifra = document.getElementById("display").value;
}

function sumar(){
	if(resta){
		acumulado = acumulado-parseInt(cifra);
		document.getElementById("display").value=acumulado;
	}else{
		acumulado = acumulado+parseInt(cifra);
		document.getElementById("display").value=acumulado;
	}
		cifra="";
		rest=false;
		suma=true;

}

function restar(){
	if(pOperacion==false){
		if(suma){
			acumulado = acumulado+parseInt(cifra);
			document.getElementById("display").value=acumulado;
		}else{
			acumulado = acumulado-parseInt(cifra);
			document.getElementById("display").value=acumulado;
		}
	}else{
		acumulado=parseInt(cifra);
		pOperacion=false;
	}		
	cifra="";
	suma=false;
	resta=true;
	pOperacion=false;
}

function multiplicar(){
	acumulado = acumulado*parseInt(cifra);
	document.getElementById("display").value=acumulado;
	cifra="";
	multiplicacion=true;
}

function dividir(){
	acumulado = acumulado/parseInt(cifra);
	document.getElementById("display").value=acumulado;
	cifra="";
	division=true;
}

function resultado(){
	if(suma==true){
		document.getElementById("display").value=acumulado+parseInt(cifra);

	}else if(resta==true){
		document.getElementById("display").value=acumulado-parseInt(cifra);

	}else if(multiplicacion==true){

	}else if(division==true){

	}
	acumulado = parseInt(document.getElementById("display").value);
	cifra=0;
}