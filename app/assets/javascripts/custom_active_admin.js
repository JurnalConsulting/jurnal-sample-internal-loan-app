function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function(){
  // English Form Options
  $('.option_opt_title, .option_opt_buss_dur, .option_opt_buss_type, .option_opt_loan, .option_opt_cities').hide();
  // Indonesia Form Options
  $('.option_opt_title_id, .option_opt_buss_dur_id, .option_opt_loan_id').hide();

  if(getParameterByName('param')=='title'){
    $('.option_opt_title').show(); 
    $('.option_opt_title_id').show(); 
  }
  if(getParameterByName('param')=='buss_dur'){
    $('.option_opt_buss_dur').show(); 
    $('.option_opt_buss_dur_id').show(); 
  }
  if(getParameterByName('param')=='buss_type'){
    $('.option_opt_buss_type').show(); 
  }
  if(getParameterByName('param')=='loan'){
    $('.option_opt_loan').show(); 
    $('.option_opt_loan_id').show(); 
  }
  if(getParameterByName('param')=='cities'){
    $('.option_opt_cities').show();
  }
});