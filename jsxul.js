var gecko	= (document.implementation && document.implementation.createDocument) ? true:false;
var ie		= (window.ActiveXObject && document.all) ? true:false;
//if (gecko) netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");



/**
 * JSXUL Klasssenkonstruktor
 **/
JSXUL = function(url) {
	this.url = url;
	this.xul = null;
	this.application = null;
}


/**
 * Initialisiert die Anwendung und läd die XUL Applikation
 **/
JSXUL.prototype.init = function() {
	this.importXUL();
	this.parseXUL();
}


/**
 * Setzt den richtigen MineType
 **/
JSXUL.prototype.fixMimeType = function(filename) {
	oxmlhttp = null;
	try {
		oxmlhttp = new XMLHttpRequest();
		oxmlhttp.overrideMimeType("text/xml");
	}
	catch(e) {
		try {
			oxmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e) {
			return null;
		}
	}

	if (!oxmlhttp) return null;

	try {
		oxmlhttp.open("GET", filename, false);
		oxmlhttp.send(null);
	}
	catch(e) {
		alert(e);
		return null;
	}

	return oxmlhttp.responseXML;
}


/**
 * importiert die XUL Applikation
 **/
JSXUL.prototype.importXUL = function() {
	// For Gecko Browsers
	if (gecko)
	{
		this.xul = document.implementation.createDocument("", "", null);
		this.xul.async=false;
		this.xul = this.fixMimeType(this.url);
	}

	// For IE/Win
	else if (ie)
	{
		this.xul = new ActiveXObject("Microsoft.XMLDOM");
		this.xul.async=false;
		this.xul.load(this.url);
 	}

	// If a browser doesn't support this, do nothing.
	else return false;

	// If it's all good, return the object.
	if (typeof this.xul != "undefined") return this.xul;
	else return false;
}


/**
 * parsed die XUL Daten und generiert das Applikationsobjekt
 **/
JSXUL.prototype.parseXUL = function() {
	var walker = this.xul.createTreeWalker(this.xul, NodeFilter.SHOW_ELEMENT, null, false);
	var leave = false;
	var diagramm = null;
	var lastClass = null;
	do {
		var node = walker.nextNode();
		if (node != null) {
			//alert(node.nodeName);
			switch (node.nodeName.toLowerCase()) {
			 case "diagramm":
			 	diagramm = new Diagramm(node.getAttribute("name"));
			 	diagramm.author = node.getAttribute("author");
			 	break;
			 case "class":
			 	var klasse = new Class(node.getAttribute("id"), node.getAttribute("name"));
			 	klasse.x = new Number(node.getAttribute("x"));
			 	klasse.y = new Number(node.getAttribute("y"));
			 	diagramm.addClass(klasse);
			 	lastClass = klasse;
			 	break;
			 case "attribute":
			 	var attr = new Attribute(node.getAttribute("name"), node.getAttribute("type"));
			 	lastClass.addAttribute(attr);
			 	break;
			 case "method":
			 	var method = new Method(node.getAttribute("name"), node.getAttribute("returntype"));
			 	lastClass.addMethod(method);
			 	break;
			 case "association":
			 	var startClass = diagramm.getClassById(node.getAttribute("startClass"));
			 	var endClass = diagramm.getClassById(node.getAttribute("endClass"));
			 	var asso = new Association(startClass, endClass);
			 	diagramm.addAssociation(asso);
			 	break;
			}
		}else{
			leave = true;
		}
	} while (!leave);
	
	document.diagramm = diagramm;
	document.diagramm.update();
	
}
