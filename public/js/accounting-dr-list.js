$(document).ready(function() {
    let dr_id;


      $('.payment-btn').click(function() {
            dr_id = $(this);
        });

        $('#continueUpdateModal').click(function(){
            let id = dr_id.attr('data-id');

            $.post(`/updatestatus`, {id: id}, function(data, status){
                if(data == 'success') {
                    dr_id.removeClass("paymentStatus");
                    dr_id.addClass("paidStatus");
                    dr_id.text("Paid");
                    dr_id.off('hover');
                    dr_id.prop("disabled",true);
                    refreshRow();

                }
                    
                
            });
        })

    /*
        Change style of div based on payment status
    */
    var paymentStatus = $(".paymentStatus");
    var paid = "paid";
    var pending = "pending";
    
    paymentStatus.each(function(){
        if($(this).text().toUpperCase() == paid.toUpperCase()){
            $(this).removeClass("paymentStatus");
            $(this).addClass("paidStatus");
            $(this).text("Paid");
            $(this).off('hover');
            $(this).prop("disabled",true);

        }
        else if($(this).text().toUpperCase() == pending.toUpperCase()){
            // $(this).css("background-color","#545454");
            $(this).text("Pending");
        }
    });

    
    var title;

    // Setup - add a text input to each footer cell
    $('.drDataTable tfoot th.filterCol').each( function () {
        title = $(this).text();
        $(this).html( '<input type="text" placeholder="'+ " " + title +'" class ="searchField" />' );
    } )

    //Set Placeholder for Payment Status Column and Truck Plate No. Column
    $('.searchField').eq(7).attr("placeholder"," Plate No.");
    $('.searchField').eq(9).attr("placeholder"," Status");
 
    // DataTable
    var table = $('.drDataTable').DataTable({  bAutoWidth: false,
        columnDefs: [
            { orderable: false, targets: -2 }
         ],
         "order": [[ 6, "desc" ],[0,"desc"],],
        aoColumns : [
          { sWidth: '120px' },
          { sWidth: '170px' },
          { sWidth: '170px' },
          { sWidth: '170px' },
          { sWidth: '80px' },
          { sWidth: '40px' },
          { sWidth: '70px' }
        ],
        initComplete: function () {
            // Apply the search
            this.api().columns().every( function () {
                var that = this;
 
                $( 'input', this.footer() ).on( 'keyup change clear', function () {
                    if ( that.search() !== this.value ) {
                        that
                            .search( this.value )
                            .draw();
                    }
                } );
            } );
        }
    });

    /*
        This is used to append the search fields to the header since it's originally
        placed in the footer.
    */

    $('.drDataTable tfoot tr').appendTo('.drDataTable thead');
    $('.dataTables_filter input[type="search"]').css(
        {'width':'50px','display':'inline-block'}
     );

     $('#myInputTextField').keyup(function(){
        table.search($(this).val()).draw();
    })
    /*
        This function gets all of the search input fields and adjusts the width of each.
    */
    //  var searchFields = $(".searchField");
    //     for(var i=0; i<searchFields.length; i++){
    //         var instanceOfSearchField= searchFields.eq(i);
            
    //         switch(i)
    //         {
    //             // case 0:
                   
    //             case 1:
    //                 instanceOfSearchField.css("width","100px");
    //                 break;
    //             case 2:
    //                 instanceOfSearchField.css("width","160px");
    //                 break;
    //             case 3:
    //                 instanceOfSearchField.css("width","160px");
    //                 break;
    //             case 4:
    //                 instanceOfSearchField.css("width","160px");
    //                 break;
    //             case 5:
    //                 instanceOfSearchField.css("width","100px");
    //                 break;
    //             case 6:
    //                 instanceOfSearchField.css("width","90px");
    //                 break;
    //         }
    //     }

        //This just removes the text for the Edit DR column
        $('th').eq(12).text("");
        
        //Adds an ID "searchDrForm" to the search input to resize it
        $("label").eq(1).attr('id','searchDrForm');
        $("input[type='search']").css("width","200px");
        $("label").eq(2).css('position','relative');
        $("label").eq(2).css('bottom','20px');
        $("label").eq(2).css('right','10px');

        /* Set Year */
        $('#set-year-btn').prop('disabled', true);

        $('#set-year-btn').click(function(){
            let companyName = $('#company-name-title').attr('data-id');
            let year = $('#set-year-input').val();
            
            window.location = `/accounting/${year}`;
        });

        $('#set-year-input').keyup(function(){
            let year = $(this).val();
            let date = new Date()
        
            if(!(year < 1000 || year > date.getFullYear()))
                $('#set-year-btn').prop('disabled', false);
            else 
                $('#set-year-btn').prop('disabled', true);
        })
        
        $.fn.dataTable.ext.search.push(
            function( settings, data, dataIndex ) {
                var year = $('#set-year-input').val();
                var date = ( data[0] ) || 0; // use data for the age column
        
                if ( date.includes(year))
                    return true;
        
                return false;
            }
        );
    
        $(document).ready(function() {
            var table = $('#dr-datatable').DataTable();
            
            // Event listener filtering inputs to redraw on input
            $('#set-year-input').keyup( function() {
                table.draw();
            });
        });


        /**
         * This function refreshes the row to enable filtering after updating the payment status .
         */
      function refreshRow(){
          
        var rowToUpdate = dr_id.parent().parent();
        var row = table.row(rowToUpdate);
        table.cell(row,6).data("Paid").draw(false);

        if(rowToUpdate.text() == "Paid"){
            rowToUpdate.text("");
            rowToUpdate.append('<button class="paidStatus payment-btn"> Paid </button>');
            rowToUpdate.children().off('hover');
            rowToUpdate.children().prop("disabled",true);
        } 

      }
});