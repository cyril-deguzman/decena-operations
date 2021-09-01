$(document).ready(function () {

    /* Keyup events for real time validation */

    //Alpha
    $("#client-name, #driver" ).keyup(function () {
        var alphaClientName = validator.trim($("#client-name").val());
        validAlpha(alphaClientName, $("#p1Error2"), $("#client-name").attr("id"));
    });

    $("#driver").keyup(function () {
        var alphaDriver = validator.trim($("#driver").val());
        validAlpha(alphaDriver, $("#p4Error2"), $("#driver").attr("id"));
    });

    $("#helper").keyup(function () {
        var alphaHelper = validator.trim($("#helper").val());
        validAlpha(alphaHelper, $("#p4Error3"), $("#helper").attr("id"));
    });

    $("#processor").keyup(function () {
        var alphaProcessor = validator.trim($("#processor").val());
        validAlpha(alphaProcessor, $("#p2Error3"), $("#processor").attr("id"));
    });

    // Alphanumeric
    $("#company-name").keyup(function () {
        var alphaCompanyName = validator.trim($('#company-name').val());
        var companyLen = document.getElementById("company-name").getAttribute("maxlength");
        validLen(alphaCompanyName, $('#p1Error1'), $('#company-name').attr('id'), companyLen );
    });

    $("#pickup-site").keyup(function () {
        var alphaPickSite = validator.trim($('#pickup-site').val());
        var pickLen = document.getElementById("pickup-site").getAttribute("maxlength");
        validLen(alphaPickSite, $('#p1Error3'), $('#pickup-site').attr('id'), pickLen);
    });

    $("#delivery-site").keyup(function () {
        var alphaDelSite = validator.trim($('#delivery-site').val());
        var delLen = document.getElementById("delivery-site").getAttribute("maxlength");
        validLen(alphaDelSite, $('#p1Error4'), $('#delivery-site').attr('id'), delLen);
    });

    $("#plate-number").keyup(function () {
        var alphaPlateNum = validator.trim($('#plate-number').val());
        var plateLen = document.getElementById("plate-number").getAttribute("maxlength");
        validLen(alphaPlateNum, $('#p4Error1'), $('#plate-number').attr('id'), plateLen);
    });
    
    $("#description").keyup(function () {
        var alphaDescription = validator.trim($('#description').val());
        var descriptionLen = document.getElementById("description").getAttribute("maxlength");
        validLen(alphaDescription, $('#p2Error4'), $('#description').attr('id'), descriptionLen);
    });

    // Checkbox
    $("#docs-options").on("change", function () {
        validCheckbox($("#docs-options").attr('id'), $("#p2Error2"));
    });

    // Numeric
    $("#quantity").on("change", function () {
        var quantityNum = document.getElementById("quantity").value;
        validAmount(quantityNum, $("#p2Error1"), $("#quantity").attr("id"));
    });

    /**
     * Prints the data inputted by the user in the Modal if there are no errors.
     * Otherwise, it scrolls up to first occurrence of the error.
     */
    $("#submit").click(function () {
        getValidation();
        getConditions();
    });

    /**
     * Runs another set of validation for the whole form after submission
    */
    function getValidation() {

        // Alpha
        var alphaClientName = validator.trim($("#client-name").val());
        validAlpha(alphaClientName, $("#p1Error2"), $("#client-name").attr("id"));

        var alphaDriver = validator.trim($("#driver").val());
        validAlpha(alphaDriver, $("#p4Error2"), $("#driver").attr("id"));

        var alphaHelper = validator.trim($("#helper").val());
        validAlpha(alphaHelper, $("#p4Error3"), $("#helper").attr("id"));

        var alphaProcessor = validator.trim($("#processor").val());
        validAlpha(alphaProcessor, $("#p2Error3"), $("#processor").attr("id"));

        // Alphanumeric
        var alphaCompanyName = validator.trim($('#company-name').val());
        var companyLen = document.getElementById("company-name").getAttribute("maxlength");
        validLen(alphaCompanyName, $('#p1Error1'), $('#company-name').attr('id'), companyLen );

        var alphaPickSite = validator.trim($('#pickup-site').val());
        var pickLen = document.getElementById("pickup-site").getAttribute("maxlength");
        validLen(alphaPickSite, $('#p1Error3'), $('#pickup-site').attr('id'), pickLen);

        var alphaDelSite = validator.trim($('#delivery-site').val());
        var delLen = document.getElementById("delivery-site").getAttribute("maxlength");
        validLen(alphaDelSite, $('#p1Error4'), $('#delivery-site').attr('id'), delLen);

        var alphaPlateNum = validator.trim($('#plate-number').val());
        var plateLen = document.getElementById("plate-number").getAttribute("maxlength");
        validLen(alphaPlateNum, $('#p4Error1'), $('#plate-number').attr('id'), plateLen);

        var alphaDescription = validator.trim($('#description').val());
        var descriptionLen = document.getElementById("description").getAttribute("maxlength");
        validLen(alphaDescription, $('#p2Error4'), $('#description').attr('id'), descriptionLen);

        // Checkbox
        validCheckbox($("#docs-options").attr('id'), $("#p2Error2"));

        // Numeric
        var quantityNum = document.getElementById("quantity").value;
        validAmount(quantityNum, $("#p2Error1"), $("#quantity").attr("id"));
    }

    /**
     * Sets the error fields appearance for invalid inputs
     * 
     * @param {String} field        The ID of the field in the form with discrepancies
     * @param {String} errormsg     The error message to show in the form
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
    */
    function setInvalid(field, errormsg, errorfield) {
        field = "#" + field;
        $(field).css('background-color', '#FFB0B0');
        errorfield.text(errormsg);
    }

    /**
     * Sets the error fields appearance for valid inputs
     * 
     * @param {String} field        The ID of the field in the form with discrepancies
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
    */
    function setValid(field, errorfield) {
        field = "#" + field;
        $(field).css('background-color', '#FFFFFF');
        errorfield.text('');
        errorfield.css('background-color', '#FFFFFF');
    }

    /**
     * Checks name fields for invalid inputs
     * 
     * @param {String} input        The user input for a specific field in the form
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
     * @param {String} id           The ID of the field in the form with discrepancies
    */
    function validAlpha (input, errorfield, id) {
        const blacklist = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
                        "_", "=", "+", "{", "}", "[", "]", "|", "\\", ";", ":", "\'",
                        "\"", ",", "<", ">", "/", "?", "1", "2", "3", "4", "5", "6", 
                        "7", "8", "9", "0"];
        var flag = false;

        for (const item of blacklist) {
            if (input.indexOf(item) != -1)
                flag = true;
        }

        if (validator.isEmpty(input))
            setInvalid(id, "Invalid input. Field must not be empty.", errorfield);
        else if (flag)
            setInvalid(id, "Invalid input. Use Alpha characters (A-Z, a-z), period (.), and hyphens (-) only.", errorfield);
        else if (!validator.isLength(input, {min: 1, max: 50}))
            setInvalid(id, "Invalid input. Minimum of 1 character and maximum of 50 characters.", errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks if quantity stays in the range 0 - 100
     * 
     * @param {String} input        The user input for a specific field in the form
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
     * @param {String} id           The ID of the field in the form with discrepancies
    */
    function validAmount (input, errorfield, id) {
        if (!(input > 0 && input <= 100))
            setInvalid(id, "Invalid input. Minimum of 1 and maximum of 100.", errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks if at least one checkbox is checked
     * 
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
     * @param {String} id           The ID of the field in the form with discrepancies
    */
    function validCheckbox (id, errorfield) {
        checked = $("input[type=checkbox]:checked").length;
        if (checked <= 0)
            setInvalid(id, "Invalid input. At least one box must be checked.", errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks the length of a string if it is within the given min-max range
     * 
     * @param {String} input        The user input for a specific field in the form
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
     * @param {String} id           The ID of the field in the form with discrepancies
    */
    function validLen (input, errorfield, id, length) {
        if (!validator.isLength(input, {min: 1, max: length}))
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 150 characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Finds the y value of a given object
     * 
     * @param {Object} obj  The object to find in the window
    */
    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        return [curtop];
        }
    }

    /**
     * Checks the form for any errors. Prompts the modal if there is none.
     * Otherwise, it scrolls to the top showing all errors
    */
    function getConditions() {

        const formErrors = ["p1Error1", "p1Error2", "p1Error3", "p1Error4", "p1Error5", 
                    "p2Error1", "p2Error2", "p2Error3", "p2Error4", "p4Error1", "p4Error2", "p4Error3", "p4Error4", 
                    "p4Error5", "pick-up-errors", "destination-errors"];

        const formFields = ["company-name", "client-name", "pickup-site", "delivery-site", "date-issued", 
                            "quantity", "docs-options", "processor", "description", "p-arrival-date", 
                            "p-departure-date", "p-arrival-time", "p-departure-time", "d-arrival-date", "start-load-date", 
                            "finish-load-date", "d-departure-date", "d-arrival-time", "start-load-time", "finish-load-time", 
                            "d-departure-time", "plate-number", "driver", "helper", "ack-date", 
                            "ack-time"];
        var temp, error = "";

        for (let j = 0; j < formErrors.length; j++) {
            if(document.getElementById(formErrors[j]).innerHTML != "") {
                error = formFields[j];
                j = formErrors.length;
            }
        }

        if (error == "") {
            $("#submit").attr("data-toggle", "modal");
            getModal();
        }

        else {
            $("#submit").removeAttr("data-toggle");
            temp = findPos(document.getElementById(error));
            window.scroll(0, temp - 100);
            // window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Gets and displays the modal form
    */
    function getModal () {
        // Part 1
        var dataP1 = [];
        var fieldsP1 = [];

        fieldsP1.push("Date Issued ")
        fieldsP1.push("Forwarding/Broker's Company ");
        fieldsP1.push("Client ");
        fieldsP1.push("Pick-Up Site ");
        fieldsP1.push("Delivery Site ");
        dataP1.push($("#date-issued").val());
        dataP1.push($("#company-name").val());
        dataP1.push($("#client-name").val());
        dataP1.push($("#pickup-site").val());
        dataP1.push($("#delivery-site").val());
        
        var strDataUpper1P1 = dataP1.slice(0,2).join("<br>");
        var strFieldUpper1P1 = fieldsP1.slice(0,2).join("<br>");
        
        // Part 2
        var dataP2 = [];
        var fieldsP2 = [];
        var docs = [];
        $.each($("input[name=document]:checked"), function(){
            docs.push($(this).val());
        });
        fieldsP2.push("Mode of Shipment ");
        fieldsP2.push("List of Documents ");
        fieldsP2.push("Processor ");
        fieldsP2.push("Quantity ");
        fieldsP2.push("Description of Commodity ");
        dataP2.push($("input[name=shipment]:checked").val());
        dataP2.push(docs.join("<br>"));
        dataP2.push($("#processor").val());
        dataP2.push($("#quantity").val());
        dataP2.push($("#description").val());
        
        var strFieldUpperP2 = fieldsP2.slice(0,2).join("<br>");
        var strFieldLowerP2 = fieldsP2.slice(3,5).join("<br>");
        var strDataUpperP2 = dataP2.slice(0,2).join("<br>");
        var strDataLowerP2 = dataP2.slice(3,5).join("<br>");
        
        // Part 3
        var dataP3 = [];
        var fieldsP3 = [];
        
        fieldsP3.push("Arrival Date ");
        fieldsP3.push("Date Started Loading/Unloading ");
        fieldsP3.push("Date Finished Loading/Unloading ");
        fieldsP3.push("Departure Date ");
        fieldsP3.push("Time ");
        
        dataP3.push($("#p-arrival-date").val());
        dataP3.push($("#p-arrival-time").val());
        dataP3.push($("#p-departure-date").val());
        dataP3.push($("#p-departure-time").val());
        dataP3.push($("#d-arrival-date").val());
        dataP3.push($("#d-arrival-time").val());
        dataP3.push($("#start-load-date").val());
        dataP3.push($("#start-load-time").val());
        dataP3.push($("#finish-load-date").val());
        dataP3.push($("#finish-load-time").val());
        dataP3.push($("#d-departure-date").val());
        dataP3.push($("#d-departure-time").val());
        
        // Part 4
        var dataP4 = [];
        var fieldsP4 = [];
        
        fieldsP4.push("Truck Plate Number ");
        fieldsP4.push("Driver ");
        fieldsP4.push("Helper ");
        fieldsP4.push("Acknowledgement ");
        fieldsP4.push("Date ");
        fieldsP4.push("Time ");

        dataP4.push($("#plate-number").val());
        dataP4.push($("#driver").val());
        dataP4.push($("#helper").val());
        dataP4.push($("input[name=acknowledgement]:checked").val());
        dataP4.push($("#ack-date").val());
        dataP4.push($("#ack-time").val());
        
        var strFieldUpper1P4 = fieldsP4.slice(0,2).join("<br>");
        var strFieldLower2P4 = fieldsP4.slice(4,6).join("<br>");
        var strDataUpper1P4 = dataP4.slice(0,2).join("<br>");
        var strDataLower2P4 = dataP4.slice(4,6).join("<br>");
        
        // Displaying all contents of field[] and data[];
        $("#upper1-left-p1").html(strFieldUpper1P1);
        $("#upper2-left-p1").html(fieldsP1[2]); 
        $("#lower1-left-p1").html(fieldsP1[3]);
        $("#lower2-left-p1").html(fieldsP1[4]);
        $("#upper1-right-p1").html(strDataUpper1P1);
        $("#upper2-right-p1").html(dataP1[2]);
        $("#lower1-right-p1").html(dataP1[3]);
        $("#lower2-right-p1").html(dataP1[4]);
        
        $("#upper-left-p2").html(strFieldUpperP2);
        $("#upper-right-p2").html(strDataUpperP2);
        $("#middle-left-p2").html(fieldsP2[2]);
        $("#middle-right-p2").html(dataP2[2]);
        $("#lower-left-p2").html(strFieldLowerP2);
        $("#lower-right-p2").html(strDataLowerP2);
        
        $("#a-left-left-p3").html(fieldsP3[0] + "<br>" + fieldsP3[4]);
        $("#a-left-right-p3").html(dataP3.slice(0,2).join("<br>"));
        $("#d-left-left-p3").html(fieldsP3[3] + "<br>" + fieldsP3[4]);
        $("#d-left-right-p3").html(dataP3.slice(2,4).join("<br>"));                
        $("#a-right-left-p3").html(fieldsP3[0] + "<br>" + fieldsP3[4]);
        $("#a-right-right-p3").html(dataP3.slice(4,6).join("<br>"));
        $("#sl-right-left-p3").html(fieldsP3[1] + "<br>" + fieldsP3[4]);
        $("#sl-right-right-p3").html(dataP3.slice(6,8).join("<br>"));
        $("#fl-right-left-p3").html(fieldsP3[2] + "<br>" + fieldsP3[4]);
        $("#fl-right-right-p3").html(dataP3.slice(8,10).join("<br>"));
        $("#d-right-left-p3").html(fieldsP3[3] + "<br>" + fieldsP3[4]);
        $("#d-right-right-p3").html(dataP3.slice(10,12).join("<br>"));
        
        $("#upper1-left-p4").html(strFieldUpper1P4);
        $("#upper1-right-p4").html(strDataUpper1P4);
        $("#upper2-left-p4").html(fieldsP4[2]);
        $("#upper2-right-p4").html(dataP4[2]);
        $("#lower1-left-p4").html(fieldsP4[3]);
        $("#lower1-right-p4").html(dataP4[3]);                
        $("#lower2-left-p4").html(strFieldLower2P4);
        $("#lower2-right-p4").html(strDataLower2P4);
    }

    /**
     * Setting the DEFAULT & MAX DATE to today (for all date fields)
     */
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd < 10)
        dd='0'+dd;
    if(mm < 10)
        mm='0'+mm; 
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("date-issued").setAttribute("value", today);
    document.getElementById("date-issued").setAttribute("max", today);  
    document.getElementById("p-arrival-date").setAttribute("value", today);
    document.getElementById("p-arrival-date").setAttribute("max", today);   
    document.getElementById("p-departure-date").setAttribute("value", today);
    document.getElementById("p-departure-date").setAttribute("max", today);
    document.getElementById("d-arrival-date").setAttribute("value", today);
    document.getElementById("d-arrival-date").setAttribute("max", today);   
    document.getElementById("d-departure-date").setAttribute("value", today);
    document.getElementById("d-departure-date").setAttribute("max", today); 
    document.getElementById("start-load-date").setAttribute("value", today);
    document.getElementById("start-load-date").setAttribute("max", today);  
    document.getElementById("finish-load-date").setAttribute("value", today);
    document.getElementById("finish-load-date").setAttribute("max", today); 
    document.getElementById("ack-date").setAttribute("value", today);
    document.getElementById("ack-date").setAttribute("max", today);                                         

    /**
     * Displaying number of characters left in Description of Commodity
     */
    var div1 = document.createElement("div");
    var commodityDesc = document.getElementById("description");
    var div2 = document.createElement("div");
    var counter = document.createElement("span");

    div1.style.position = "relative";
    div2.style.position = "absolute";
    div2.style.bottom = "8px";
    div2.style.color = "#ccc";
    div2.style.left = "71%";
    commodityDesc.parentNode.appendChild(div1);
    div1.appendChild(commodityDesc);
    div2.appendChild(counter);
    div1.appendChild(div2);

    function charLeft() {
        counter.innerHTML = (200 - this.value.length);
    }

    commodityDesc.addEventListener("input", charLeft);
    charLeft.call(commodityDesc);   

    /**
     * Adding a default value for the radio buttons
     */
    radBtnShip = document.getElementById("shipment1");
    radBtnShip.checked = true;

    radBtnAck = document.getElementById("acknowledgement1");
    radBtnAck.checked = true;
});