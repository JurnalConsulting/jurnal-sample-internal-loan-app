$(document).on('turbolinks:load',function(){
  // Variables for Validate one by one
  var v_name = false, v_title = false, v_email = false, v_city = false, v_addr = false, v_tel = false, v_buss_dur = false, v_buss_type = false, v_loan = false, v_f_name = false, v_f_email = false, v_f_title = false, v_f_tel = false, v_f_hp = false, v_f_addr = false, v_f_city = false;

  var check_disclaimer = false;

  // Form Validator
  $('#form')
    .steps({
      headerTag: 'h3',
      bodyTag: 'section',
      // Triggered when clicking the Previous/Next buttons
      onStepChanging: function(e, currentIndex, newIndex) {
          var fv = $('#form').data('formValidation'), 
          // FormValidation instance
              // The current step container
              $container = $('#form').find('section[data-step="' + currentIndex +'"]');

          
          // If user click on "Previous" button, we just normally let he/she goes
          if (newIndex < currentIndex) {
              return true;
          }

          // Validate the container
          fv.validateContainer($container);
          // Validate Button Prev & Next
          var isValidStep = fv.isValidContainer($container);
          if (isValidStep === false || isValidStep === null) {
              // Do not jump to the next step
              $(".actions ul li").first().next().addClass("disabled");
              return false;
          }else{
            // Hide button Draft then Show button Prev with Submit
            $(".actions ul li").first().next().removeClass("disabled");
            $(".actions ul li").first().show();
            $('.submit_modal_btn').show();
          }
          return true;
      }
    })
    .find('[name="form[form_title]"]')
      .select2()
        // Revalidate the color when it is changed
        .change(function(e) {
            $('#form').formValidation('revalidateField', 'form[form_title]');
        })
      .end()
    .find('[name="form[form_city]"]')
      .select2()
        .change(function(e) {
            $('#form').formValidation('revalidateField', 'form[form_city]');
        })
      .end()
    .find('[name="form[form_bussiness_duration]"]')
      .select2()
        .change(function(e) {
            $('#form').formValidation('revalidateField', 'form[form_bussiness_duration]');
        })
      .end()
    .find('[name="form[form_bussiness_type]"]')
      .select2()
        .change(function(e) {
            $('#form').formValidation('revalidateField', 'form[form_bussiness_type]');
        })
      .end()
    .find('[name="form[form_loan_amount]"]')
      .select2()
        .change(function(e) {
            $('#form').formValidation('revalidateField', 'form[form_loan_amount]');
        })
      .end()
    .find('[name="form[form_friend_title]"]')
      .select2()
        .change(function(e) {
            $('#form').formValidation('revalidateField', 'form[form_friend_title]');
        })
      .end()
    .find('[name="form[form_friend_city]"]')
      .select2()
        .change(function(e) {
            $('#form').formValidation('revalidateField', 'form[form_friend_city]');
        })
      .end()
    .formValidation({
      framework: 'bootstrap',
      excluded: ':disabled',
      icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      addOns: {
        i18n: {}
      },
      button: {
        selector: '#submit_btn',
        disabled: 'disabled'
      },
      fields: {
        'form[form_title]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please select your title.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_friend_title]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please select your friend title.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_city]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please select your city.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_friend_city]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please select your friend\'s city.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_name]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your name correctly.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_friend_name]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your friend\'s name correctly.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_address]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your address correctly.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_friend_address]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your friend\'s address correctly.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_email]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your email correctly.',
                id_ID: 'Wajib Diisi'
              }
            },
            emailAddress: {
                message: {
                  en_US: 'The value is not a valid email address.',
                  id_ID: 'Nilai tersebut bukan alamat email yang valid.'
                }
            }
          }
        },
        'form[form_friend_email]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your friend\'s email correctly.',
                id_ID: 'Wajib Diisi'
              }
            },
            emailAddress: {
                message: {
                  en_US: 'The value is not a valid email address.',
                  id_ID: 'Nilai tersebut bukan alamat email yang valid.'
                }
            }
          }
        },
        'form[form_telephone]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your telephone number.',
                id_ID: 'Wajib Diisi'
              }
            },
            regexp: {
              en_US: 'The phone number can only contain the digits, spaces, -, (, ), + and .',
              id_ID: 'Nomor telepon hanya dapat mengandung angka, spasi, -, (, ), + dan .',
              regexp: /^[0-9\s\-()+\.]+$/
            }
          }
        },
        'form[form_friend_telephone]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your friend\'s telephone number.',
                id_ID: 'Wajib Diisi'
              }
            },
            regexp: {
              en_US: 'The phone number can only contain the digits, spaces, -, (, ), + and .',
              id_ID: 'Nomor telepon hanya dapat mengandung angka, spasi, -, (, ), + dan .',
              regexp: /^[0-9\s\-()+\.]+$/
            },
          }
        },
        'form[form_friend_handphone]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please input your friend\'s mobile phone number.',
                id_ID: 'Wajib Diisi'
              }
            },
            regexp: {
              en_US: 'The phone number can only contain the digits, spaces, -, (, ), + and .',
              id_ID: 'Nomor telepon hanya dapat mengandung angka, spasi, -, (, ), + dan .',
              regexp: /^[0-9\s\-()+\.]+$/
            },
          }
        },
        'form[form_bussiness_duration]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please select your bussiness duration.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_bussiness_type]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please select your bussiness type.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_loan_amount]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please select your loan amount.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        },
        'form[form_disclaimer]': {
          validators: {
            notEmpty: {
              message: {
                en_US: 'Please tick to agree and continue.',
                id_ID: 'Wajib Diisi'
              }
            }
          }
        }
      }
    })
    // When there is Invalid Fields
    .on('err.validator.fv', function(e, data) {
      $('.submit_modal_btn').addClass("disabled");

      // Show only 1 error messages
      if (data.field === 'form[form_email]') {
        data.element
          .data('fv.messages')
          .find('.help-block[data-fv-for="' + data.field + '"]').hide()
          .filter('[data-fv-validator="' + data.validator + '"]').show();
      }
      if (data.field === 'form[form_friend_email]') {
        data.element
          .data('fv.messages')
          .find('.help-block[data-fv-for="' + data.field + '"]').hide()
          .filter('[data-fv-validator="' + data.validator + '"]').show();
      }
      if (data.field === 'form[form_telephone]') {
        data.element
          .data('fv.messages')
          .find('.help-block[data-fv-for="' + data.field + '"]').hide()
          .filter('[data-fv-validator="' + data.validator + '"]').show();
      }
      if (data.field === 'form[form_friend_telephone]') {
        data.element
          .data('fv.messages')
          .find('.help-block[data-fv-for="' + data.field + '"]').hide()
          .filter('[data-fv-validator="' + data.validator + '"]').show();
      }
      if (data.field === 'form[form_friend_handphone]') {
        data.element
          .data('fv.messages')
          .find('.help-block[data-fv-for="' + data.field + '"]').hide()
          .filter('[data-fv-validator="' + data.validator + '"]').show();
      }
    })
    // Checking Each Fields One by One
    .on('status.field.fv', function(e, data) {
      // Validate if is Edit Menu
      // if (window.location.href.indexOf('/edit')!=-1) {
      //   $(form).data('formValidation').validate();
      // }

      // For all validator notEmpty fields
      if(data.validator === 'notEmpty'){
        if (data.field === 'form[form_title]'){
          if (data.status === 'NOT_VALIDATED'){
            v_title = null;
            if($('.form_form_title :selected').select2('data').val().length > 0){
              $(form).formValidation('revalidateField', 'form[form_title]');
            }
          }else if (data.status === 'INVALID'){
            v_title = false;
          }else if (data.status === 'VALID'){
            v_title = true;
          }
        }
        if (data.field === 'form[form_friend_title]'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_title = null;
            if($('.form_form_friend_title :selected').select2('data').val().length > 0){
              $(form).formValidation('revalidateField', 'form[form_friend_title]');
            }
          }else if (data.status === 'INVALID'){
            v_f_title = false;
          }else if (data.status === 'VALID'){
            v_f_title = true;
          }
        }
        if (data.field === 'form[form_name]'){
          if (data.status === 'NOT_VALIDATED'){
            v_name = null;
            if($('#form_form_name').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_name]');
            }
          }else if (data.status === 'INVALID'){
            v_name = false;
          }else if (data.status === 'VALID'){
            v_name = true;
          }
        }
        if (data.field === 'form[form_friend_name]'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_name = null;
            if($('#form_form_friend_name').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_friend_name]');
            }
          }else if (data.status === 'INVALID'){
            v_f_name = false;
          }else if (data.status === 'VALID'){
            v_f_name = true;
          }
        }
        if (data.field === 'form[form_address]'){
          if (data.status === 'NOT_VALIDATED'){
            v_addr = null;
            if($('#form_form_address').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_address]');
            }
          }else if (data.status === 'INVALID'){
            v_addr = false;
          }else if (data.status === 'VALID'){
            v_addr = true;
          }
        }
        if (data.field === 'form[form_friend_address]'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_addr = null;
            if($('#form_form_friend_address').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_friend_address]');
            }
          }else if (data.status === 'INVALID'){
            v_f_addr = false;
          }else if (data.status === 'VALID'){
            v_f_addr = true;
          }
        }
        if (data.field === 'form[form_city]'){
          if (data.status === 'NOT_VALIDATED'){
            v_city = null;
            if($('.form_form_city :selected').select2('data').val().length > 0){
              $(form).formValidation('revalidateField', 'form[form_city]');
            }
          }else if (data.status === 'INVALID'){
            v_city = false;
          }else if (data.status === 'VALID'){
            v_city = true;
          }
        }
        if (data.field === 'form[form_friend_city]'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_city = null;
            if($('.form_form_friend_city :selected').select2('data').val().length > 0){
              $(form).formValidation('revalidateField', 'form[form_friend_city]');
            }
          }else if (data.status === 'INVALID'){
            v_f_city = false;
          }else if (data.status === 'VALID'){
            v_f_city = true;
          }
        }
        if (data.field === 'form[form_bussiness_duration]'){
          if (data.status === 'NOT_VALIDATED'){
            v_buss_dur = null;
            if($('.form_form_bussiness_duration :selected').select2('data').val().length > 0){
              $(form).formValidation('revalidateField', 'form[form_bussiness_duration]');
            }
          }else if (data.status === 'INVALID'){
            v_buss_dur = false;
          }else if (data.status === 'VALID'){
            v_buss_dur = true;
          }
        }
        if (data.field === 'form[form_bussiness_type]'){
          if (data.status === 'NOT_VALIDATED'){
            v_buss_type = null;
            if($('.form_form_bussiness_type :selected').select2('data').val().length > 0){
              $(form).formValidation('revalidateField', 'form[form_bussiness_type]');
            }
          }else if (data.status === 'INVALID'){
            v_buss_type = false;
          }else if (data.status === 'VALID'){
            v_buss_type = true;
          }
        }
        if (data.field === 'form[form_loan_amount]'){
          if (data.status === 'NOT_VALIDATED'){
            v_loan = null;
            if($('.form_form_loan_amount :selected').select2('data').val().length > 0){
              $(form).formValidation('revalidateField', 'form[form_loan_amount]');
            }
          }else if (data.status === 'INVALID'){
            v_loan = false;
          }else if (data.status === 'VALID'){
            v_loan = true;
          }
        }
      }

      // For all Field with multiple validator
      if (data.field === 'form[form_email]'){
        if (data.validator === 'notEmpty'){
          if (data.status === 'NOT_VALIDATED'){
            v_email = null;
            if($('#form_form_email').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_email]');
            }
          }else if (data.status === 'INVALID'){
            v_email = false;
          }
        }else if (data.validator === 'emailAddress'){
          if (data.status === 'NOT_VALIDATED'){
            v_email = null;
            if($('#form_form_email').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_email]');
            }
          }else if (data.status === 'INVALID'){
            v_email = false;
          }else if (data.status === 'VALID'){
            if($('#form_form_email').val().length>0){
              v_email = true;
            }
          }
        }
      }
      if (data.field === 'form[form_friend_email]'){
        if (data.validator === 'notEmpty'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_email = null;
            if($('#form_form_friend_email').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_friend_email]');
            }
          }else if (data.status === 'INVALID'){
            v_f_email = false;
          }
        }else if (data.validator === 'emailAddress'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_email = null;
            if($('#form_form_friend_email').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_friend_email]');
            }
          }else if (data.status === 'INVALID'){
            v_f_email = false;
          }else if (data.status === 'VALID'){
            if($('#form_form_friend_email').val().length>0){
              v_f_email = true;
            }
          }
        }
      }
      if (data.field === 'form[form_telephone]'){
        if (data.validator === 'notEmpty'){
          if (data.status === 'NOT_VALIDATED'){
            v_tel = null;
            if($('#form_form_telephone').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_telephone]');
            }
          }else if (data.status === 'INVALID'){
            v_tel = false;
          }
        }else if (data.validator === 'regexp'){
          if (data.status === 'NOT_VALIDATED'){
            v_tel = null;
            if($('#form_form_telephone').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_telephone]');
            }
          }else if (data.status === 'INVALID'){
            v_tel = false;
          }else if (data.status === 'VALID'){
            if($('#form_form_telephone').val().length>0){
             v_tel = true;
           }
          }
        }
      }
      if (data.field === 'form[form_friend_telephone]'){
        if (data.validator === 'notEmpty'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_tel = null;
            if($('#form_form_friend_telephone').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_friend_telephone]');
            }
          }else if (data.status === 'INVALID'){
            v_f_tel = false;
          }
        }else if (data.validator === 'regexp'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_tel = null;
            if($('#form_form_friend_telephone').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_friend_telephone]');
            }
          }else if (data.status === 'INVALID'){
            v_f_tel = false;
          }else if (data.status === 'VALID'){
            if($('#form_form_friend_telephone').val().length>0){
              v_f_tel = true;
            }
          }
        }
      }
      if (data.field === 'form[form_friend_handphone]'){
        if (data.validator === 'notEmpty'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_hp = null;
            if($('#form_form_friend_handphone').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_friend_handphone]');
            }
          }else if (data.status === 'INVALID'){
            v_f_hp = false;
          }else if (data.status === 'VALID'){
            v_f_hp = true;
          }
        }else if (data.validator === 'regexp'){
          if (data.status === 'NOT_VALIDATED'){
            v_f_hp = null;
            if($('#form_form_friend_handphone').val().length>0){
              $(form).formValidation('revalidateField', 'form[form_friend_handphone]');
            }
          }else if (data.status === 'INVALID'){
            v_f_hp = false;
          }else if (data.status === 'VALID'){
            if($('#form_form_friend_handphone').val().length>0){
              v_f_hp = true;
            }
          }
        }
      }

      // Validate Button for All Fields
      if(v_title && v_name && v_email && v_city && v_addr && v_tel && v_buss_dur && v_buss_type && v_loan){
        $(".actions ul li").first().next().removeClass('disabled');
      }else{
        $(".actions ul li").first().next().addClass('disabled');
      }
      
      if(v_f_name && v_f_email && v_f_title && v_f_tel && v_f_hp && v_f_addr && v_f_city){
        check_disclaimer = true;
        if($('#form_form_disclaimer').is(':checked')){
          $('.submit_modal_btn').removeClass('disabled');
        }
      }else{
        check_disclaimer = false;
        $('.submit_modal_btn').addClass('disabled');
      }
    })
    .on('success.field.fv', function(e, data) {
      if (data.fv.getInvalidFields().length > 0) {    
        // There is invalid field
        data.fv.disableSubmitButtons(true);
      }else{
        data.fv.disableSubmitButtons(false);
      }
    });

  $('#form_form_disclaimer').on('click',function(){
    $('#form').formValidation('revalidateField', 'form[form_disclaimer]');
    if($('#form_form_disclaimer').is(':checked')){
      if(check_disclaimer){
        $('.submit_modal_btn').removeClass('disabled');
      }
    }else{
      $('.submit_modal_btn').addClass('disabled');
    }
  })

  // Handler for ENTER Key between Form Pages
  $('input').keydown( function(e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if(key == 13) {
      e.preventDefault();
      var next_btn = $(".actions ul li").first().next().children();
      if($(next_btn).is(':visible')){
        next_btn.click();
      }else if($('.submit_modal_btn').is(':visible')){
        $('.submit_modal_btn').click();
        // Enter on Terms&Condition
        // if($('.submit_btn_dummy').is(':visible')){
        //   $('.submit_btn_dummy').click();
        // }
      }
    }
  });

  // Easy Prefilled Second Form Data 
  if (/forms.*new/.test(window.location.href)){
    flag = 0;
    $($(".actions ul li").first().next().children()).on('click',function(){
      if(flag==0){
        var form1_title = $('#form_form_title').select2().val();
        $('#form_form_friend_title').select2().val(form1_title).trigger("change");

        var form1_name = $('#form_form_name').val();
        $('#form_form_friend_name').val(form1_name);
        $(form).formValidation('revalidateField', 'form[form_friend_name]');

        var form1_addr = $('#form_form_address').val();
        $('#form_form_friend_address').val(form1_addr);
        $(form).formValidation('revalidateField', 'form[form_friend_address]');

        var form1_telp = $('#form_form_telephone').val();
        $('#form_form_friend_telephone').val(form1_telp);
        $(form).formValidation('revalidateField', 'form[form_friend_telephone]');

        var form1_city = $('#form_form_city').select2().val();
        $('#form_form_friend_city').select2().val(form1_city).trigger("change");

        var form1_email = $('#form_form_email').val();
        $('#form_form_friend_email').val(form1_email);
        $(form).formValidation('revalidateField', 'form[form_friend_email]');
      }
        flag = 1;
    });
  };

  // Validate Again if in Edit Mode
  if (/forms.*edit/.test(window.location.href)){
    if($('.form_form_title :selected').select2('data').val().length > 0){
      $(form).formValidation('revalidateField', 'form[form_title]');
    }

    if($('.form_form_friend_title :selected').select2('data').val().length > 0){
      $(form).formValidation('revalidateField', 'form[form_friend_title]');
    }

    if($('#form_form_name').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_name]');
    }

    if($('#form_form_friend_name').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_friend_name]');
    }

    if($('#form_form_email').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_email]');
    }

    if($('#form_form_friend_email').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_friend_email]');
    }

    if($('#form_form_address').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_address]');
    }

    if($('#form_form_friend_address').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_friend_address]');
    }

    if($('#form_form_telephone').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_telephone]');
    }

    if($('#form_form_friend_telephone').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_friend_telephone]');
    }

    if($('#form_form_friend_handphone').val().length>0){
      $(form).formValidation('revalidateField', 'form[form_friend_handphone]');
    }        

    if($('.form_form_city :selected').select2('data').val().length > 0){
      $(form).formValidation('revalidateField', 'form[form_city]');
    }

    if($('.form_form_friend_city :selected').select2('data').val().length > 0){
      $(form).formValidation('revalidateField', 'form[form_friend_city]');
    }

    if($('.form_form_bussiness_duration :selected').select2('data').val().length > 0){
      $(form).formValidation('revalidateField', 'form[form_bussiness_duration]');
    }

    if($('.form_form_bussiness_type :selected').select2('data').val().length > 0){
      $(form).formValidation('revalidateField', 'form[form_bussiness_type]');
    }

    if($('.form_form_loan_amount :selected').select2('data').val().length > 0){
      $(form).formValidation('revalidateField', 'form[form_loan_amount]');
    }
  }

  // Prefilled Form
  if($('#form').length > 0){
    if($('#form_form_name').val().length == 0){
      $('#form_form_name').val($('.pre_form_name').text().trim());
      if($('#form #form_form_name').val().length>0){
        $(form).formValidation('revalidateField', 'form[form_name]');
      }
    }else{
      $(form).formValidation('revalidateField', 'form[form_name]');
    }
    if($('#form_form_address').val().length == 0){
      $('#form_form_address').val($('.pre_form_address').text().trim());
      if($('#form #form_form_address').val().length>0){
        $(form).formValidation('revalidateField', 'form[form_address]');
      }
    }else{
      $(form).formValidation('revalidateField', 'form[form_address]');
    }
    if($('#form_form_telephone').val().length == 0){
      $('#form_form_telephone').val($('.pre_form_telephone').text().trim());
      if($('#form #form_form_telephone').val().length>0){
        $(form).formValidation('revalidateField', 'form[form_telephone]');
      }
    }else{
      $(form).formValidation('revalidateField', 'form[form_telephone]');
    }
    if($('#form_form_email').val().length == 0){
      $('#form_form_email').val($('.pre_form_email').text().trim());
      if($('#form #form_form_email').val().length>0){
        $(form).formValidation('revalidateField', 'form[form_email]');
      }
    }else{
      $(form).formValidation('revalidateField', 'form[form_email]');
    }
    if($('#form_form_bussiness_type').val().length == 0){
      $('#form_form_bussiness_type').val($('.pre_form_buss_type').text().trim()).trigger('change');
      if($('#form #form_form_bussiness_type').val().length>0){
        $(form).formValidation('revalidateField', 'form[form_bussiness_type]');
      }
    }else{
      $(form).formValidation('revalidateField', 'form[form_bussiness_type]');
    }
  }

  // Loading & Save Draft
  $('.draft_btn_dummy').on('click',function(){
    $('.draft_btn').click();
  });
  // Check if User scroll bottom for Terms&Condition Modal 
  if($('.modal-body').scrollTop() == 0){
    // $('.submit_btn_dummy').addClass("disabled");
    $('.submit_btn_dummy').prop('disabled',true);
  }
  $('.modal-body').scroll(function() {
    $('.submit_btn_dummy').prop('disabled',false);
    $('.submit_btn_dummy').on('click',function(){
      $('.submit_btn').click();
      $('#termModal').modal('hide');
      $('#infoModal').modal('show');
    });
  });

  $('#infoModal').on('hidden.bs.modal', function (e) {
    $('#form_new').addClass("hidden");
    $('.loader').removeClass("hidden");
    $('#infoModal a').click();
    $('#infoModal a')[0].click();
  })

  // Show Terms&Condition Modal if No Invalid Fields
  $('.submit_modal_btn').on('click',function(e){
    $(form).data('formValidation').validate();
    if($(form).data('formValidation').getInvalidFields().length == 0){
      $('#termModal').modal('show');
    }
  });

  // Change Form Validation Locale
  if (window.location.href.indexOf('/id/')!=-1) {
    $('#form').formValidation('setLocale', 'id_ID');
  }else if (window.location.href.indexOf('/id/')!=-1){
    $('#form').formValidation('setLocale', 'en_US');
  }
  
  // Button Draft - Hide Previous and Finish Button
  $('.draft_btn').prependTo('.actions ul');
  $('.submit_modal_btn').appendTo('.actions ul');
  $('.home_btn').prependTo('.actions ul');
  var prev_btn = $(".actions ul li").first().hide();
  var finish_btn = $(".actions ul li").last().hide();
  $('.submit_modal_btn').hide();

  $(prev_btn).on('click',function(){
    if($($(".actions ul li").first().next().children()).is(':visible')){
      $(this).hide();
      $('.draft_btn').show();
      $('.submit_modal_btn').hide();
      $(finish_btn).hide();
    }
  });

  // Hide Finish Button
  $(".actions ul li").first().next().on('click',function(){
    $(finish_btn).hide();
  });
});