
$(function() {

	  var GET_USER = function() {
	  	return URPO_USERLIST;
	  };

	  var GET_LASTUPDATE = function() {
	  	return LASTUPDATELIST;
	  };

	  var POST_LASTUPDATE = function(data) {
      var id = Number(data.project_id);
      console.log(id);
      if(data.project_id == undefined) {
      	console.log('project_id missing');
      	return;
      }

      if (typeof(id) != typeof(234)) {
      	console.log('project_id need to be a valid number');
      	return('project_id need to be a valid number');
      }

      if(data.edit_state == undefined) {
      	console.log('edit_state is undefined');
      	return('edit_state is undefined');
      } else if (data.edit_state.add_or_edit == undefined) {
      	console.log('add_or_edit is undefined');
      	return('add_or_edit is undefined');
      } else if (data.edit_state.edit_person == undefined) {
      	console.log('edit_person undefined');
      	return('edit_person undefined');
      } else if (data.edit_state.edit_column == undefined) {
      	console.log('edit_column is undefined');
      	return('edit_column is undefined');
      }

      if(data.edit_state.length != undefined) {
      	console.log('edit_state should only contain one object. you have length: ' + data.edit_state.length);
      	return('edit_state should only contain one object. you have length: ' + data.edit_state.length);
      }

      if(data.edit_state.add_or_edit != "add" && data.edit_state.add_or_edit != "edit") {
      	console.log('edit_state.add_or_edit must equal "add" or  "edit"');
      	return('edit_state.add_or_edit must equal "add" or  "edit"');
      }

	  	LASTUPDATELIST.push(data);
	  	console.log('success');
	  	return data;
	  }

	  var GET_PM = function() {
	  	return PMLIST;
	  }



	  $('#go').click( function() {
	  	POST_LASTUPDATE({
				"project_id": '00027', "edit_state": {"add_or_edit":"edit","edit_person":"test","edit_column":"Collaboration_Model 000 11"}			
			});
			console.log(GET_LASTUPDATE());
	  });


});