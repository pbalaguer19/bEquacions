function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

m1 = getRndInteger(-10, 10);
n1 = getRndInteger(-10, 10);
m2 = getRndInteger(-10, 10);
n2 = getRndInteger(-10, 10);

equacions = [];
operacions = [];

mostraEquacio();

function mostraEquacio(){
	if(n1 % 1 != 0) n1 = n1.toFixed(2)
	if(m1 % 1 != 0) m1 = m1.toFixed(2)
	if(n2 % 1 != 0) n2 = n2.toFixed(2)
	if(m2 % 1 != 0) m2 = m2.toFixed(2)
	// M1
	if(m1 == 1){
		eq = "x";
	}else{
		if(m1 == 0){
			eq = "";
		}else{
			if(m1 == -1){
				eq = "-x";
			}else{
				eq = m1 + "x";
			}
		}
	}

	// N1
	if(n1 == 0 && m1 != 0){
		eq = eq + " = ";
	}else{
		if(m1 != 0){
			eq = eq + " + " + n1 + " = ";
		}else{
			eq = eq + n1 + " = ";
		}
	}

	// M2
	if(m2 > 1){
		eq = eq + m2 + "x";
	}else{
		if(m2 == 0){
			eq = eq + "";
		}else{
			if(m2 == -1){
				eq = eq + "-x";
			}else{
				eq = eq + "x";
			}
		}
	}

	// N2
	if(n2 != 0){
		if(m2 != 0){
			eq = eq + " + " + n2;
		}else{
			eq = eq + n2;
		}
	}else{
		if(m2 == 0){
			eq = eq + "0"
		}
	}

	equacions.push(eq);
	$("#equacio").text(eq)
	$("#numero").val("");
	dibuixa();
	checkIfResult();
}

function suma(){
	if(!isNaN($("#numero").val())){
		n1 = n1 + parseFloat($("#numero").val());
		n2 = n2 + parseFloat($("#numero").val());
		operacions.push("+" + $("#numero").val());
	}else if($("#numero").val().toLowerCase().includes("x")){
		if($("#numero").val().toLowerCase() == "x"){
			m1 = m1 + 1;
			m2 = m2 + 1;
			operacions.push("+" + $("#numero").val());
		}else{
			number = $("#numero").val().substring(0,$("#numero").val().length-1);
			if(!isNaN(number)){
				m1 = m1 + parseFloat(number);
				m2 = m2 + parseFloat(number);
				operacions.push("+" + $("#numero").val());
			}else{
				window.alert("Valor invàlid!");
			}
		}
	}else{
		window.alert("Valor invàlid!");
	}
	mostraEquacio();
}
function resta(){
	if(!isNaN($("#numero").val())){
		n1 = n1 - parseFloat($("#numero").val());
		n2 = n2 - parseFloat($("#numero").val());
		operacions.push("-" + $("#numero").val());
	}else if($("#numero").val().toLowerCase().includes("x")){
		if($("#numero").val().toLowerCase() == "x"){
			m1 = m1 - 1;
			m2 = m2 - 1;
			operacions.push("-" + $("#numero").val());
		}else{
			number = $("#numero").val().substring(0,$("#numero").val().length-1);
			if(!isNaN(number)){
				m1 = m1 - parseFloat(number);
				m2 = m2 - parseFloat(number);
				operacions.push("-" + $("#numero").val());
			}else{
				window.alert("Valor invàlid!");
			}
		}
	}else{
		window.alert("Valor invàlid!");
	}
	mostraEquacio();
}
function divisio(){
	if(!isNaN($("#numero").val())){
		n1 = n1 / parseFloat($("#numero").val());
		n2 = n2 / parseFloat($("#numero").val());
		m1 = m1 / parseFloat($("#numero").val());
		m2 = m2 / parseFloat($("#numero").val());
		operacions.push("%" + $("#numero").val());
	}else{
		window.alert("Valor invàlid!");
	}
	mostraEquacio();
}
function multiplicacio(){
	if(!isNaN($("#numero").val())){
		n1 = n1 * parseFloat($("#numero").val());
		n2 = n2 * parseFloat($("#numero").val());
		m1 = m1 * parseFloat($("#numero").val());
		m2 = m2 * parseFloat($("#numero").val());
		operacions.push("*" + $("#numero").val());
	}else{
		window.alert("Valor invàlid!");
	}
	mostraEquacio();
}

function checkIfResult(){
	if(m1 == 1 && n1 == 0 && m2 == 0){
		window.alert("El valor de x és: " + n2);
	}

	if(m2 == 1 && n2 == 0 && m1 == 0){
		window.alert("El valor de x és: " + n1);
	}
}

function passos(){
	llistaPassos = ""
	for(var i = 0; i<equacions.length; i++){
		if(i>0) llistaPassos += "[" + operacions[i-1] + "]\n" + equacions[i] + "\n";
		else llistaPassos += equacions[i] + "\n";
	}
	window.alert(llistaPassos);
}

function reinicia(){
	location.reload();
}

function dibuixa(){
	tmp = [];
	edges = [];
	// Balança 1
	if(m1 >= 0){
		for(var i=0; i<m1; i++){
			tmp.push({ id: i, label: "x", shape: "box", color: "#97C2FC", x:-400, y:35*i })
		}
	}else{
		for(var i=0; i<Math.abs(m1); i++){
			tmp.push({ id: i, label: "x", shape: "box", color: "#DF644E", x:-400, y:35*i })
			edges.push({ from: i, to: 104 });
		}
	}

	if(n1 >= 0){
		for(var i=0; i<n1; i++){
			tmp.push({ id: Math.abs(m1)+i, label: "1", shape: "ellipse", color: "#6E6EFD", x:-350, y:35*i })
		}
	}else{
		for(var i=0; i<Math.abs(n1); i++){
			tmp.push({ id: Math.abs(m1)+i, label: "1", shape: "ellipse", color: "#902A18", x:-350, y:35*i })
			edges.push({ from: Math.abs(m1)+i, to: 104 });
		}
	}

	// Balança 2
	if(m2 >= 0){
		for(var i=0; i<m2; i++){
			tmp.push({ id: i+Math.abs(n1)+Math.abs(m1), label: "x", shape: "box", color: "#97C2FC", x:400, y:35*i})
		}
	}else{
		for(var i=0; i<Math.abs(m2); i++){
			tmp.push({ id: i+Math.abs(n1)+Math.abs(m1), label: "x", shape: "box", color: "#DF644E", x:400, y:35*i})
			edges.push({ from: i+Math.abs(n1)+Math.abs(m1), to: 204 });
		}
	}

	if(n2 >= 0){
		for(var i=0; i<n2; i++){
			tmp.push({ id: Math.abs(m2)+i+Math.abs(n1)+Math.abs(m1), label: "1", shape: "ellipse", color: "#6E6EFD", x:450, y:35*i})
		}
	}else{
		for(var i=0; i<Math.abs(n2); i++){
			tmp.push({ id: Math.abs(m2)+i+Math.abs(n1)+Math.abs(m1), label: "1", shape: "ellipse", color: "#902A18", x:450, y:35*i})
			edges.push({ from: Math.abs(m2)+i+Math.abs(n1)+Math.abs(m1), to: 204 });
		}
	}

	var multip = Math.max(Math.abs(n1), Math.abs(m1), Math.abs(n2), Math.abs(m2));
	// Barra esquerra
	for(var i=0; i<8; i++){
		tmp.push({ id: 100 + i, label: "", shape: "box", color: "#000000", x:-450+(i*20), y:(35*multip)+100 })

	}
	// Barra dreta
	for(var i=0; i<8; i++){
		tmp.push({ id: 200 + i, label: "", shape: "box", color: "#000000", x:350+(i*20), y:(35*multip)+100 })

	}
	// Barra llarga
	i = 0;
	while((-450+(i*20)) < 510){
		tmp.push({ id: 300 + i, label: "", shape: "box", color: "#000000", x:-450+(i*20), y:(35*multip)+140 })
		i++;
	}
	tmp.push({ id: 300 + i, label: "", shape: "triangle", color: "#000000", x:0, y:(35*multip)+180 })
	var nodes1 = new vis.DataSet(tmp);
	var edges1 = new vis.DataSet(edges);

	var container1 = document.getElementById("mynetwork1");
	var data1 = {
		nodes: nodes1,
		edges: edges1
	};

	var options = {
		clickToUse: false,
		physics:{
			enabled:false
		},
		interaction:{
			dragNodes: false,
			dragView: false,
			zoomView: false
		},
		nodes:{
			widthConstraint:
				 { minimum: 20}
			 ,
			 heightConstraint:
					{ minimum: 20}
				,
				font: {
						size: 20 // Works when size is > 4
				}
		},
	};

	var network = new vis.Network(container1, data1, options);
}
