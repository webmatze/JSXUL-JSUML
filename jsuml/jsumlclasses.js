/**
* JavaScript UML
* Author: Mathias Karstaedt
* Version: N/A
* Classes: Class, Attribute, Method, Diagramm, Association
*/


/**
* @class Class
* @tooltip No description available.
* @author Mathias Karstaedt
* @version N/A
* @see Association
* @see Method
* @see Attribute
* @see Diagramm
*/
Class = function(id, thename) {
	/**
	* @property attributes
	* @type object[]
	*/
	this.attributes = new Array();
	/**
	* @property height
	* @type number
	*/
	this.height = null;
	/**
	* @property methods
	* @type object[]
	*/
	this.methods = new Array();
	/**
	* @property name
	* @type string
	*/
	this.name = thename;
	/**
	* @property width
	* @type number
	*/
	this.width = 150;
	/**
	* @property x
	* @type number
	*/
	this.x = 0;
	/**
	* @property y
	* @type number
	*/
	this.y = 0;
	
	this.id = id;
	
	//HTML erstellen
	this.create();

	this.setName(this.name);
}

/**
* @method draw
*/
Class.prototype.draw = function() {
	this.element.style.top = this.y + "px";
	this.element.style.left = this.x + "px";
	this.element.style.width = this.width + "px";
}

/**
* @method create
* @param
* @return 
*/
Class.prototype.create = function() {
	//Class div erstellen
	var container = document.createElement("div");
	container.setAttribute("class","class");
	container.setAttribute("id",this.id);
	this.element = document.body.appendChild(container);
	
	this.element.umlClass = this;

	//name div erstellen
	var nameContainer = document.createElement("div");
	with (nameContainer) {
		setAttribute("class","name");
		setAttribute("id",this.id + "_name");
		appendChild(document.createTextNode(this.name));
	}
	this.nameElement = this.element.appendChild(nameContainer);
	
	//attributes div erstellen
	var attrContainer = document.createElement("div");
	with (attrContainer) {
		setAttribute("class","attributes");
		setAttribute("id",this.id + "_attributes");
	}
	this.attrElement = this.element.appendChild(attrContainer);
	
	//methods div erstellen
	var methContainer = document.createElement("div");
	with (methContainer) {
		setAttribute("class","methods");
		setAttribute("id",this.id + "_methods");
	}
	this.methElement = this.element.appendChild(methContainer);
  
  //drag and drop functionality
  Drag.init(this.nameElement, this.element);

  this.element.onDrag = function(x, y) {
    this.umlClass.x = x.valueOf();
    this.umlClass.y = y.valueOf();
		window.document.diagramm.update();
	}
  
}

/**
* @method setName
* @param name (String) attribute name.
* @return 
*/
Class.prototype.setName = function(thename) {
		this.nameElement.firstChild.nodeValue = thename;
}

/**
* @method addAttribute
* @param attribute (Object) attribute parameter.
* @return 
*/
Class.prototype.addAttribute = function(attribute) {
	this.attributes.push(attribute);
	var attr = document.createElement("div");
	attr.appendChild(document.createTextNode(attribute.name + " : " + attribute.type));
	this.attrElement.appendChild(attr);
}

/**
* @method addMethod
* @param method (Object) method parameter.
* @return 
*/
Class.prototype.addMethod = function(method) {
	this.methods.push(method);
	var meth = document.createElement("div");
	meth.appendChild(document.createTextNode(method.name + " : " + method.returnType));
	this.methElement.appendChild(meth);
}



/**
* @class Attribute
* @tooltip No description available.
* @author Mathias Karstaedt
* @version N/A
* @see Class
*/
Attribute = function(name, type) {
	/**
	* @property name
	* @type string
	*/
	this.name = name;
	/**
	* @property type
	* @type string
	*/
	this.type = type;
}




/**
* @class Method
* @tooltip No description available.
* @author Mathias Karstaedt
* @version N/A
* @see Class
*/
Method = function(name, type) {
	/**
	* @property name
	* @type string
	*/
	this.name = name;
	/**
	* @property returnType
	* @type string
	*/
	this.returnType = type;
}




/**
* @class Diagramm
* @tooltip No description available.
* @author Mathias Karstaedt
* @version N/A
* @see Class
*/
Diagramm = function(name) {
	/**
	* @property associations
	* @type object[]
	*/
	this.associations = new Array();
	/**
	* @property author
	* @type string
	*/
	this.author = null;
	/**
	* @property classes
	* @type object[]
	*/
	this.classes = new Array();
	/**
	* @property name
	* @type string
	*/
	this.name = name;
}

/**
* @method getClassById
* @param id (int) id parameter.
* @return Class Object
*/
Diagramm.prototype.getClassById = function(id) {
	for (var i = 0; i < this.classes.length; i++) {
		var klasse = this.classes[i];
		if (klasse.id == id) {
			return klasse;
		}
	}
	return null;
}

/**
* @method addAssociation
* @param association (Object) association parameter.
* @return 
*/
Diagramm.prototype.addAssociation = function(association) {
	this.associations.push(association);
}

/**
* @method addClass
* @param classobj (Object) class parameter.
*/
Diagramm.prototype.addClass = function(classobj) {
	this.classes.push(classobj);
}

/**
* @method updateAssociations
*/
Diagramm.prototype.updateAssociations = function() {
	for (var i = 0; i < this.associations.length; i++) {
		this.associations[i].draw();
	}
}

/**
* @method updateClasses
*/
Diagramm.prototype.updateClasses = function() {
	for (var i = 0; i < this.classes.length; i++) {
		this.classes[i].draw();
	}
}

/**
* @method updateClasses
*/
Diagramm.prototype.update = function() {
	this.updateClasses();
	this.updateAssociations();
}

/**
* @method hideAssociations
*/
Diagramm.prototype.hideAssociations = function() {
	for (var i = 0; i < this.associations.length; i++) {
		this.associations[i].hide();
	}
}


/**
* @class Association
* @tooltip No description available.
* @author Mathias Karstaedt
* @version N/A
* @see Class
*/
Association = function(startClass, endClass) {
	/**
	* @property endClass
	* @type object
	*/
	this.endClass = endClass;
	/**
	* @property startClass
	* @type object
	*/
	this.startClass = startClass;
	/**
	* @property type
	* @type string
	*/
	this.type = null;

	this.one = null;
	this.two = null;
	this.three = null;
	
	this.create();
}

/**
* @method create
*/
Association.prototype.create = function() {
	this.one = document.createElement("div");
	document.body.appendChild(this.one);

	this.two = document.createElement("div");
	document.body.appendChild(this.two);

	this.three = document.createElement("div");
	document.body.appendChild(this.three);

	this.one.setAttribute("class","assoHorz");
	this.two.setAttribute("class","assoVert");
	this.three.setAttribute("class","assoHorz");
}

/**
* @method draw
*/
Association.prototype.draw = function() {

	if (this.startClass.x <= this.endClass.x) {

		var xdist = this.endClass.x - (this.startClass.x + this.startClass.width);
		var xdisthalf = Math.round(xdist / 2);

		with (this.one.style) {
			left = (this.startClass.x + this.startClass.width) + "px";
			top = this.startClass.y + "px";
			width = xdisthalf + "px";
		}

		with (this.two.style) {
			left = ((this.startClass.x + this.startClass.width) + xdisthalf) + "px";
			if (this.startClass.y <= this.endClass.y) {
				var ydist = this.endClass.y - this.startClass.y;
				top = this.startClass.y + "px";
			}else{
				var ydist = this.startClass.y - this.endClass.y;
				top = this.endClass.y + "px";
			}
				height = ydist + "px";
		}

		with (this.three.style) {
			left = (this.endClass.x - xdisthalf) + "px";
			top = this.endClass.y + "px";
			width = xdisthalf + "px";
		}

	}else{
	
		var xdist = this.startClass.x - (this.endClass.x + this.endClass.width);
		var xdisthalf = Math.round(xdist / 2);

		with (this.one.style) {
			left = (this.endClass.x + this.endClass.width) + "px";
			top = this.endClass.y + "px";
			width = xdisthalf + "px";
		}

		with (this.two.style) {
			left = ((this.endClass.x + this.endClass.width) + xdisthalf) + "px";
			if (this.endClass.y <= this.startClass.y) {
				var ydist = this.startClass.y - this.endClass.y;
				top = this.endClass.y + "px";
			}else{
				var ydist = this.endClass.y - this.startClass.y;
				top = this.startClass.y + "px";
			}
				height = ydist + "px";
		}

		with (this.three.style) {
			left = (this.startClass.x - xdisthalf) + "px";
			top = this.startClass.y + "px";
			width = xdisthalf + "px";
		}

	}

}

/**
* @method hide
*/
Association.prototype.hide = function() {

}
