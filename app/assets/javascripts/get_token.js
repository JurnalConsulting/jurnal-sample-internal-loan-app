$(document).ready(function(){
  var times = 0;
  checkExist = setInterval(function() {
    times += 1;
    if(sessionStorage.jurnal_token != undefined){
      if(sessionStorage.jurnal_token != sessionStorage.jurnal_access_token){
        jurnal_token = sessionStorage.jurnal_token;
        sessionStorage.removeItem('jurnal_token');
      }else if(sessionStorage.jurnal_access_token != undefined){
        jurnal_token = sessionStorage.jurnal_access_token;
      }
    }else{
      jurnal_token = JurnalIntegration.get_access_token();
    }
    $('.response').text(jurnal_token);
    if (jurnal_token != undefined) {
      var current_sync_url = $('.sync_url').attr('href');
      var change_sync_url = $('.sync_url').prop("href", (current_sync_url+jurnal_token) );
      if ($('.sync_url').length > 0){
        $('.sync_url')[0].click();
      }
      clearInterval(checkExist);
    }
    if(jurnal_token == undefined && times==20){
      clearInterval(checkExist);
    }
  }, 100);

  checkValue = setInterval(function() {
    if($('.current').text().trim()!='' && $('.response').text()!=''){
      if($('.current').text().trim() == $('.response').text()){
      }else{
        access_token = $('.response').text();
        sessionStorage.jurnal_token = access_token;
        $('.logout_url')[0].click();
      };
      clearInterval(checkValue);
    }
  }, 100);

});