function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

m1 = getRndInteger(-10, 10);
n1 = getRndInteger(-10, 10);
do{
	m2 = getRndInteger(-10, 10);
}while(m2 == m1);
n2 = getRndInteger(-10, 10);

equacions = [];
operacions = [];

mostraEquacio();

function mostraEquacio(){
	if(n1 % 1 != 0) n1 = parseFloat(n1).toFixed(2);
	if(m1 % 1 != 0) m1 = parseFloat(m1).toFixed(2);
	if(n2 % 1 != 0) n2 = parseFloat(n2).toFixed(2);
	if(m2 % 1 != 0) m2 = parseFloat(m2).toFixed(2);
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
	if(m2 != 1 && m2 != -1 && m2 != 0){
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

function afegirOperacio(op, num){
	if(num.includes("-")) operacions.push(op + "(" + num + ")");
	else operacions.push(op + num);
}

function suma(){
	if($("#numero").val() == ""){
		window.alert("Afegeix alguna expressió!");
		return;
	}
	if(!isNaN($("#numero").val())){
		n1 = n1 + parseFloat($("#numero").val());
		n2 = n2 + parseFloat($("#numero").val());
		afegirOperacio("+", $("#numero").val());
	}else if($("#numero").val().toLowerCase().includes("x")){
		if($("#numero").val().toLowerCase() == "x"){
			m1 = m1 + 1;
			m2 = m2 + 1;
		}else{
			number = $("#numero").val().substring(0,$("#numero").val().length-1);
			if(!isNaN(number)){
				m1 = m1 + parseFloat(number);
				m2 = m2 + parseFloat(number);
			}else{
				window.alert("Valor invàlid!");
			}
		}
		afegirOperacio("+", $("#numero").val());
	}else{
		window.alert("Valor invàlid!");
	}
	mostraEquacio();
}
function resta(){
	if($("#numero").val() == ""){
		window.alert("Afegeix alguna expressió!");
		return;
	}
	if(!isNaN($("#numero").val())){
		n1 = n1 - parseFloat($("#numero").val());
		n2 = n2 - parseFloat($("#numero").val());
		afegirOperacio("-", $("#numero").val());
	}else if($("#numero").val().toLowerCase().includes("x")){
		if($("#numero").val().toLowerCase() == "x"){
			m1 = m1 - 1;
			m2 = m2 - 1;
		}else{
			number = $("#numero").val().substring(0,$("#numero").val().length-1);
			if(!isNaN(number)){
				m1 = m1 - parseFloat(number);
				m2 = m2 - parseFloat(number);
			}else{
				window.alert("Valor invàlid!");
			}
		}
		afegirOperacio("-", $("#numero").val());
	}else{
		window.alert("Valor invàlid!");
	}
	mostraEquacio();
}
function divisio(){
	if($("#numero").val() == ""){
		window.alert("Afegeix alguna expressió!");
		return;
	}
	if(!isNaN($("#numero").val())){
		n1 = n1 / parseFloat($("#numero").val());
		n2 = n2 / parseFloat($("#numero").val());
		m1 = m1 / parseFloat($("#numero").val());
		m2 = m2 / parseFloat($("#numero").val());
		afegirOperacio("÷", $("#numero").val());
	}else{
		window.alert("Valor invàlid!");
	}
	mostraEquacio();
}
function multiplicacio(){
	if($("#numero").val() == ""){
		window.alert("Afegeix alguna expressió!");
		return;
	}
	if(!isNaN($("#numero").val())){
		n1 = n1 * parseFloat($("#numero").val());
		n2 = n2 * parseFloat($("#numero").val());
		m1 = m1 * parseFloat($("#numero").val());
		m2 = m2 * parseFloat($("#numero").val());
		afegirOperacio("·", $("#numero").val());
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
		if(i>0) llistaPassos += "[ Operació: " + operacions[i-1] + "]\n" + equacions[i] + "\n";
		else llistaPassos += equacions[i] + "\n";
	}
	window.alert(llistaPassos);
}

function reinicia(){
	location.reload();
}

function personalitza(){
	do{
		m1 = prompt("Coeficient de la 'x' del primer membre (a). \n(Equació del tipus ax + b = cx + d)", "1");
		if (m1 === null){location.reload(); return;}
	}while(isNaN(m1));
	m1 = parseFloat(m1);

	do{
		n1 = prompt("Terme independent del primer membre (b). \n(Equació del tipus ax + b = cx + d)", "1");
		if (n1 === null){location.reload(); return;}
	}while(isNaN(n1));
	n1 = parseFloat(n1);

	do{
		m2 = prompt("Coeficient de la 'x' del segon membre (c). \n(Equació del tipus ax + b = cx + d)", "1");
		if (m2 === null){location.reload(); return;}
	}while(isNaN(m2));
	m2 = parseFloat(m2);

	do{
		n2 = prompt("Terme independent del segon membre (d). \n(Equació del tipus ax + b = cx + d)", "1");
		if (n2 === null){location.reload(); return;}
	}while(isNaN(n2));
	n2 = parseFloat(n2);

	equacions = [];
	operacions = [];

	mostraEquacio();
}

function crearNodes(tmp, n, id, label, shape, colorPos, colorNeg, x, y, to){
	var multip = Math.max(Math.abs(n1), Math.abs(m1), Math.abs(n2), Math.abs(m2));
	var color = colorPos;
	var lab = label;
	if(n < 0){
		color = colorNeg;
		lab = "-" + label;
	}
	for(var i=0; i<Math.abs(parseInt(n)); i++){
		if(n < 0){
			tmp.push({ id: id+i, label: lab, shape: shape, color: color, x:x, y:(-y*multip)+(y*i) })
			edges.push({ from: id+i, to: to });
		}else{
			tmp.push({ id: id+i, label: lab, shape: shape, color: color, x:x, y:-y*i })
		}
	}

	if(parseInt(n) != n){
		lab = (n - parseInt(n)).toFixed(2);
		if(label.includes("x")){
			if (lab < 0) lab = "-" + Math.abs(lab).toString() + "x";
			else lab = lab.toString() + "x";
		}
		if(n < 0){
			edges.push({ from: id+i, to: to });
			tmp.push({ id: 999+id+i, label: lab.toString(), shape: shape, color: color, x:x, y:y*i })
		}else{
			tmp.push({ id: 999+id+i, label: lab.toString(), shape: shape, color: color, x:x, y:-y*i })
		}
	}

	return tmp;
}

function dibuixaBalanca(tmp){
	// Barra esquerra
	for(var i=0; i<8; i++){
		tmp.push({ id: 100 + i, label: "", shape: "box", color: "#000000", x:-450+(i*20), y:35 })

	}
	// Barra dreta
	for(var i=0; i<8; i++){
		tmp.push({ id: 200 + i, label: "", shape: "box", color: "#000000", x:350+(i*20), y:35 })

	}
	// Barra llarga
	i = 0;
	while((-450+(i*20)) < 510){
		tmp.push({ id: 300 + i, label: "", shape: "box", color: "#000000", x:-450+(i*20), y:80 })
		i++;
	}
	tmp.push({ id: 300 + i, label: "", shape: "triangle", color: "#000000", x:0, y:120 })
	return tmp;
}

function dibuixa(){
	tmp = [];
	edges = [];
	// Balança 1
	tmp = crearNodes(tmp, m1, 0, "x", "box", "#97C2FC", "#DF644E", -400, 35, 104);
	tmp = crearNodes(tmp, n1, Math.abs(m1), "1", "ellipse", "#6E6EFD", "#902A18", -350, 35, 104);

	// Balança 2
	tmp = crearNodes(tmp, m2, Math.abs(n1)+Math.abs(m1), "x", "box", "#97C2FC", "#DF644E", 400, 35, 204);
	tmp = crearNodes(tmp, n2, Math.abs(m2)+Math.abs(n1)+Math.abs(m1), "1", "ellipse", "#6E6EFD", "#902A18", 450, 35, 204);

	tmp = dibuixaBalanca(tmp);

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
