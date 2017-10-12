$(document).on('turbolinks:load',function(){
  // DataTable 
  var t = $('#form_draft').DataTable({
    searching: false,
    paging: false,
    info: false,
    targets: 0,
    order: [[1,'desc']],
    columnDefs: [
      { orderable: false, targets:[0] },
      { orderable: false, targets:[4] }
    ],
    language: {
      emptyTable: " "
    }
  });

  t.on( 'order.dt search.dt', function () {
    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
    } );
  } ).draw();

});