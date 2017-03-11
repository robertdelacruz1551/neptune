$(document).ready(function () {


	function Input(elementjson){
		this.eWrpClass= "form-group";
		this.eClass 	= "form-control";
		this.elemCat	= elementjson.element_category;
		this.eEntity	= elementjson.entity_id;
		this.eType 	  = elementjson.element_type;
		this.eId 	  	= elementjson.element_id;
		this.eName 	  = elementjson.element_name;
		this.eDisTxt	= elementjson.display_text;
		this.eRow			= elementjson.height;	
	};

	
});