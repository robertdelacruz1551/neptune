<script>
$(document).ready(){
// constructor will get the json 
// from database to build the form


	function picassoForm(formid) {
		var formHtml;
		$.get('application-functions/php/picassoForm.php?formid='+formid, function(data, status){
		  if(status === "success"){
		  	var form		 = jQuery.parseJSON(data);
		    		formHtml = createForm(formid, form.action_method, form.targe, form.form_name, form.version_no);
		  }
		});
		return formHtml;
	}




	function createForm(formid, formMethod, formAction, formName, formVersion) {
				// Build the form
		var formHtml  = '<form id="' +formid+ '" method="' +formMethod+ '" action="' +formAction+ '" Name="' +formName+ '">';
				formHtml += '<div class="ibox float-e-margins">';
				formHtml += '<div class="ibox-title">';
				formHtml += '<small class="pull-right">Version: '+formVersion+'</small>';
				formHtml += '<h5>'+formName+'</h5>';
				formHtml += '</div>';
				formHtml += '<div class="ibox-content" id="'+formid+'-content"></div>';
				formHtml += '</div>'; 
				formHtml += '</form>';

		return formHtml;
	}




	function picassoElement(formid) {
		// fetch the form attributes 
		// from the database
		$.get('application-functions/php/picassoElement.php?formid='+formid, function(data, status){
		  if(status === "success"){
		    var element	= jQuery.parseJSON(data);
		    var elementHtml;
		    var eId;
		    var eHeight;
		    var eWidth;
		    var eDText;
		    var eType;
		    var eName;
		    var ePlaceholder;
		    var eFootnote;

		    for (var i=0; i<element.length; i += 1) {
			    eId 			= element[i].element_id;
			    eSize 		= element[i].element_size;
			    eDText		= element[i].display_text;
			    eType 		= element[i].element_type;
			    eName 		= element[i].element_name;
			    eHeight		= element[i].height;
			    ePlacehldr= element[i].placeholder
			    eFootnote = element[i].footnote;

		    	switch(element[i].element_type){				    
		    		case 'text':
		    			elementHtml = createTextbox(eId, eWidth, eDText, eName, ePlacehldr,eFootnote);
		    			break;
		    		case 'textarea'
		    			elementHtml = createTextarea(elementId, elementSize, elementHeight, displayText, elementName, elementFootnote);
		    			break;
		    	}

		    	document.getElementById(formid).innerHTML += elementHtml;
		    }
		  }
		});
	}




	function createTextbox(elementId, elementSize, displayText, elementName, elementPlaceholder, elementFootnote) {
		var textbox  = '<div class="form-group col-sm-'+elementSize+'">';
				textbox += '<i hidden="true" class="fa fa-question-circle pull-right"></i>';
		    textbox += '<label>'+displayText+'</label>';
		    textbox += '<input id="'+elementId+'" type="text" name="'+elementName+'" placeholder="'+elementPlaceholder+'" class="form-control" >';
		    textbox += '<small>'+elementFootnote+'</small>';
		    textbox += '</div>';
		return textbox;
	}

	function createTextarea(elementId, elementSize, elementHeight, displayText, elementName, elementFootnote) {
		var textareahtml  = '<div class="form-group col-sm-'+elementSize+'">';
				textareahtml += '<i hidden="true" class="fa fa-question-circle pull-right"></i>';
				textareahtml += '<label>'+displayText+'</label>';
				textareahtml += '<textarea id="'+elementId+'" name="'+elementName+'" class="form-control input-sm" rows="'+elementHeight+'"></textarea>';
				textareahtml += '</div>';
		return textareahtml;
	}

	function createCheckbox(elementId, elementSize, elementDefaultVal, elementName, displayText) {
		var checkboxHtml = '<div class="checkbox col-sm-'+elementSize+'">';
				checkboxHtml = '<label><input id="'+elementId+'" value="'+elementDefaultVal+'" name='+elementName+' type="checkbox"> '+displayText+'</label>';
				checkboxHtml = '</div>';
		return checkboxHtml;
	}

}
</script>