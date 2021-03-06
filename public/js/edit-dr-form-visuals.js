$(document).ready(function () {

    /* Keyup events for real time validation */

    // Alpha
    $("#client-name" ).keyup(function () {
        var alphaClientName = validator.trim($("#client-name").val());
        var clientLen = document.getElementById("client-name").getAttribute("maxlength");
        validLen(alphaClientName, $("#p1Error2"), $("#client-name").attr("id"), clientLen);
        validAlpha(alphaClientName, $("#p1Error2"), $("#client-name").attr("id"));
    });

    $("#driver").keyup(function () {
        var alphaDriver = validator.trim($("#driver").val());
        var driverLen = document.getElementById("driver").getAttribute("maxlength");
        validLen(alphaDriver, $("#p4Error2"), $("#driver").attr("id"), driverLen);
        validAlpha(alphaDriver, $("#p4Error2"), $("#driver").attr("id"));
    });

    $("#helper").keyup(function () {
        var alphaHelper = validator.trim($("#helper").val());
        var helperLen = document.getElementById("helper").getAttribute("maxlength");
        validLen(alphaHelper, $("#p4Error3"), $("#helper").attr("id"), helperLen);
        validAlpha(alphaHelper, $("#p4Error3"), $("#helper").attr("id"));
    });

    $("#processor").keyup(function () {
        var alphaProcessor = validator.trim($("#processor").val());
        var processorLen = document.getElementById("processor").getAttribute("maxlength");
        validLen(alphaProcessor, $("#p2Error3"), $("#processor").attr("id"), processorLen);
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
        validPlateNo(alphaPlateNum, $('#p4Error1'), $('#plate-number').attr('id'), plateLen);
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
        validAmount(quantityNum, $("#quantity").attr("id"));
    });

    // Times
    $("#ack-time").on("change", function () {
        if (!(validTime($("#ack-time").val())))
            setDefTime("ack-time");
        var ackTime = document.getElementById("ack-time").value;
        validStartEndTime(true, ackTime, ackTime, $("#p4Error5"), $("#ack-time").attr("id"), $("#ack-time").attr("id"));
    });

    $("#p-arrival-time").on("change", function () {
        if (!(validTime($("#p-arrival-time").val())))
            setDefTime("p-arrival-time");
    });

    $("#p-departure-time").on("change", function () {
        if (!(validTime($("#p-departure-time").val())))
            setDefTime("p-departure-time");
    });

    $("#d-arrival-time").on("change", function () {
        if (!(validTime($("#d-arrival-time").val())))
            setDefTime("d-arrival-time");
    });

    $("#d-departure-time").on("change", function () {
        if (!(validTime($("#d-departure-time").val())))
            setDefTime("d-departure-time");
    });

    $("#start-load-time").on("change", function () {
        if (!(validTime($("#start-load-time").val())))
            setDefTime("start-load-time");
    });

    $("#finish-load-time").on("change", function () {
        if (!(validTime($("#finish-load-time").val())))
            setDefTime("finish-load-time");
    });

    // Dates
    $("#date-issued").on("change", function () {
        if (!(validDateFilled($("#date-issued").val())))
            setDefDate("date-issued");
        var dateIssued = document.getElementById("date-issued").value;
        validDate(dateIssued, $("#p1Error5"), $("#date-issued").attr("id"));
    });

    $("#ack-date").on("change", function () {
        if (!(validDateFilled($("#ack-date").val())))
            setDefDate("ack-date");
        var ackDate = document.getElementById("ack-date").value;
        validDate(ackDate, $("#p4Error4"), $("#ack-date").attr("id"));
    });

    $("#p-arrival-date").on("change", function () {
        if (!(validDateFilled($("#p-arrival-date").val())))
            setDefDate("p-arrival-date");
    });

    $("#p-departure-date").on("change", function () {
        if (!(validDateFilled($("#p-departure-date").val())))
            setDefDate("p-departure-date");
    });
    
    $("#d-arrival-date").on("change", function () {
        if (!(validDateFilled($("#d-arrival-date").val())))
            setDefDate("d-arrival-date");
    });

    $("#d-departure-date").on("change", function () {
        if (!(validDateFilled($("#d-departure-date").val())))
            setDefDate("d-departure-date");
    });

    $("#start-load-date").on("change", function () {
        if (!(validDateFilled($("#start-load-date").val())))
            setDefDate("start-load-date");
    });

    $("#finish-load-date").on("change", function () {
        if (!(validDateFilled($("#finish-load-date").val())))
            setDefDate("finish-load-date");
    });

    /**
     * Prints the data inputted by the user in the Modal if there are no errors.
     * Otherwise, it scrolls up to first occurrence of the error.
     */
    $("#submit").click(function () {
        getValidation();
        cleanDateAndTime();
        getConditions();
    });

    /**
     * Removes the errors in the dates after changing the value
    */
    function cleanDateAndTime() {
        
        if (($("#pick-up-errors").html() == "Date must be at most today.") ||
            ($("#destination-errors").html() == "Date must be at most today.")) {

            $("#p-arrival-date").on("change", function () {
                var datePArrive = document.getElementById("p-arrival-date").value;
                setValid($("#p-arrival-date").attr("id"), $("#pick-up-errors"));
            });

            $("#p-departure-date").on("change", function () {
                var datePDepart = document.getElementById("p-departure-date").value;
                setValid($("#p-departure-date").attr("id"), $("#pick-up-errors"));
            });

            $("#d-arrival-date").on("change", function () {
                var dateDArrive = document.getElementById("d-arrival-date").value;
                setValid($("#d-arrival-date").attr("id"), $("#destination-errors"));
            });

            $("#d-departure-date").on("change", function () {
                var dateDDepart = document.getElementById("d-departure-date").value;
                setValid($("#d-departure-date").attr("id"), $("#destination-errors"));
            });

            $("#start-load-date").on("change", function () {
                var dateDStartLoad = document.getElementById("start-load-date").value;
                setValid($("#start-load-date").attr("id"), $("#destination-errors"));
            });

            $("#finish-load-date").on("change", function () {
                var dateDEndLoad = document.getElementById("finish-load-date").value;
                setValid($("#finish-load-date").attr("id"), $("#destination-errors"));
            }); 
        }

        else if (($("#pick-up-errors").html() == "Invalid Input. Pick-up point date/time must be before Destination point date/time.") ||
                ($("#destination-errors").html() == "Invalid Input. Pick-up point date/time must be before Destination point date/time.")) {
            $("#p-departure-date, #d-arrival-date, #p-departure-time, #d-arrival-time").on("change", function () {
                var datePDepart = document.getElementById("p-departure-date").value;
                setValid($("#p-departure-date").attr("id"), $("#pick-up-errors"));

                var dateDArrive = document.getElementById("d-arrival-date").value;
                setValid($("#d-arrival-date").attr("id"), $("#destination-errors"));

                var timePDepart = document.getElementById("p-departure-time").value;
                setValid($("#p-departure-time").attr("id"), $("#pick-up-errors"));

                var timeDArrive = document.getElementById("d-arrival-time").value;
                setValid($("#d-arrival-time").attr("id"), $("#destination-errors"));
            });
        }

        else if (($("#pick-up-errors").html() == "Invalid Input. Loading/Unloading date/time should be between arrival and departure date/time.") ||
        ($("#destination-errors").html() == "Invalid Input. Loading/Unloading date/time should be between arrival and departure date/time.")) {
            $("#d-arrival-date, #start-load-date, #d-arrival-time, #start-load-time").on("change", function () {
                var dateDArrive = document.getElementById("d-arrival-date").value;
                setValid($("#d-arrival-date").attr("id"), $("#destination-errors"));

                var timeDArrive = document.getElementById("d-arrival-time").value;
                setValid($("#d-arrival-time").attr("id"), $("#destination-errors"));

                var dateDStartLoad = document.getElementById("start-load-date").value;
                setValid($("#start-load-date").attr("id"), $("#destination-errors"));

                var timeDStartLoad = document.getElementById("start-load-time").value;
                setValid($("#start-load-time").attr("id"), $("#destination-errors"));

            });

            $("#finish-load-date, #d-depart-date, #finish-load-time, #d-depart-time").on("change", function () {
                var dateDDepart = document.getElementById("d-departure-date").value;
                setValid($("#d-depart-date").attr("id"), $("#destination-errors"));
            
                var timeDDepart = document.getElementById("d-departure-time").value;
                setValid($("#d-depart-time").attr("id"), $("#destination-errors"));
                
                var dateDEndLoad = document.getElementById("finish-load-date").value;
                setValid($("#finish-load-date").attr("id"), $("#destination-errors"));
                
                var timeDEndLoad = document.getElementById("finish-load-time").value;
                setValid($("#finish-load-time").attr("id"), $("#destination-errors"));
            });
        }

        else {
            $("#p-arrival-date, #p-departure-date, #p-arrival-time, #p-departure-time").on("change", function () {
                var datePArrive = document.getElementById("p-arrival-date").value;
                setValid($("#p-arrival-date").attr("id"), $("#pick-up-errors"));

                var datePDepart = document.getElementById("p-departure-date").value;
                setValid($("#p-departure-date").attr("id"), $("#pick-up-errors"));

                var timePArrive = document.getElementById("p-arrival-time").value;
                setValid($("#p-arrival-time").attr("id"), $("#pick-up-errors"));

                var timePDepart = document.getElementById("p-departure-time").value;
                setValid($("#p-departure-time").attr("id"), $("#pick-up-errors"));
            });

            $("#d-arrival-date, #d-departure-date, #d-arrival-time, #d-departure-time").on("change", function () {
                var dateDArrive = document.getElementById("d-arrival-date").value;
                setValid($("#d-arrival-date").attr("id"), $("#destination-errors"));

                var dateDDepart = document.getElementById("d-departure-date").value;
                setValid($("#d-departure-date").attr("id"), $("#destination-errors"));

                var timeDArrive = document.getElementById("d-arrival-time").value;
                setValid($("#d-arrival-time").attr("id"), $("#destination-errors"));

                var timeDDepart = document.getElementById("d-departure-time").value;
                setValid($("#d-departure-time").attr("id"), $("#destination-errors"));
            });

            $("#start-load-date, #finish-load-date, #start-load-time, #finish-load-time").on("change", function () {
                var dateDStartLoad = document.getElementById("start-load-date").value;
                setValid($("#start-load-date").attr("id"), $("#destination-errors"));

                var dateDEndLoad = document.getElementById("finish-load-date").value;
                setValid($("#finish-load-date").attr("id"), $("#destination-errors"));

                var timeDStartLoad = document.getElementById("start-load-time").value;
                setValid($("#start-load-time").attr("id"), $("#destination-errors"));

                var timeDEndLoad = document.getElementById("finish-load-time").value;
                setValid($("#finish-load-time").attr("id"), $("#destination-errors"));
            });
        }
    }

    /**
     * Runs another set of validation for the whole form after submission
    */
    function getValidation() {

        // Alpha
        var alphaClientName = validator.trim($("#client-name").val());
        var clientLen = document.getElementById("client-name").getAttribute("maxlength");
        validAlpha(alphaClientName, $("#p1Error2"), $("#client-name").attr("id"));
        validLen(alphaClientName, $("#p1Error2"), $("#client-name").attr("id"), clientLen);

        var alphaDriver = validator.trim($("#driver").val());
        var driverLen = document.getElementById("driver").getAttribute("maxlength");
        validAlpha(alphaDriver, $("#p4Error2"), $("#driver").attr("id"));
        validLen(alphaDriver, $("#p4Error2"), $("#driver").attr("id"), driverLen);

        var alphaHelper = validator.trim($("#helper").val());
        var helperLen = document.getElementById("helper").getAttribute("maxlength");
        validAlpha(alphaHelper, $("#p4Error3"), $("#helper").attr("id"));
        validLen(alphaHelper, $("#p4Error3"), $("#helper").attr("id"), helperLen);

        var alphaProcessor = validator.trim($("#processor").val());
        var processorLen = document.getElementById("processor").getAttribute("maxlength");
        validAlpha(alphaProcessor, $("#p2Error3"), $("#processor").attr("id"));
        validLen(alphaProcessor, $("#p2Error3"), $("#processor").attr("id"), processorLen);

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
        validPlateNo(alphaPlateNum, $('#p4Error1'), $('#plate-number').attr('id'), plateLen);

        var alphaDescription = validator.trim($('#description').val());
        var descriptionLen = document.getElementById("description").getAttribute("maxlength");
        validLen(alphaDescription, $('#p2Error4'), $('#description').attr('id'), descriptionLen);

        // Checkbox
        validCheckbox($("#docs-options").attr('id'), $("#p2Error2"));

        // Numeric
        var quantityNum = document.getElementById("quantity").value;
        validAmount(quantityNum, $("#quantity").attr("id"));

        // Dates
        var dateIssued = document.getElementById("date-issued").value;
        validDate(dateIssued, $("#p1Error5"), $("#date-issued").attr("id"));

        var ackDate = document.getElementById("ack-date").value;
        validDate(ackDate, $("#p4Error4"), $("#ack-date").attr("id"));

        // Time
        var ackTime = document.getElementById("ack-time").value;
        validStartEndTime(true, ackTime, ackTime, $("#p4Error5"), $("#ack-time").attr("id"), $("#ack-time").attr("id"));

        // Dates & Time (Start & End)
        var flagTime;

        var datePArrive = document.getElementById("p-arrival-date").value;
        var datePDepart = document.getElementById("p-departure-date").value;
        var pArriveDepart = validStartEndDate(datePArrive, datePDepart, $("#pick-up-errors"), 
            $("#p-arrival-date").attr("id"), $("#p-departure-date").attr("id"));

        var timePArrive = document.getElementById("p-arrival-time").value;
        var timePDepart = document.getElementById("p-departure-time").value;
        flagTime = validStartEndTime(pArriveDepart, timePArrive, timePDepart, $("#pick-up-errors"), 
            $("#p-arrival-time").attr("id"), $("#p-departure-time").attr("id"));

        if ($("#pick-up-errors").html() == "") {
            var dateDArrive = document.getElementById("d-arrival-date").value;
            var dateDDepart = document.getElementById("d-departure-date").value;
            var dArriveDepart = validStartEndDate(dateDArrive, dateDDepart, $("#destination-errors"), 
                $("#d-arrival-date").attr("id"), $("#d-departure-date").attr("id"));

            var timeDArrive = document.getElementById("d-arrival-time").value;
            var timeDDepart = document.getElementById("d-departure-time").value;
            flagTime = validStartEndTime(dArriveDepart, timeDArrive, timeDDepart, $("#destination-errors"), 
                $("#d-arrival-time").attr("id"), $("#d-departure-time").attr("id"));
            
            if ($("#destination-errors").html() == "") {
                var dateDStartLoad = document.getElementById("start-load-date").value;
                var dateDEndLoad = document.getElementById("finish-load-date").value;
                var dStartEnd = validStartEndDate(dateDStartLoad, dateDEndLoad, $("#destination-errors"), 
                    $("#start-load-date").attr("id"), $("#finish-load-date").attr("id"));

                var timeDStartLoad = document.getElementById("start-load-time").value;
                var timeDEndLoad = document.getElementById("finish-load-time").value;
                flagTime = validStartEndTime(dStartEnd, timeDStartLoad, timeDEndLoad, $("#destination-errors"), 
                    $("#start-load-time").attr("id"), $("#finish-load-time").attr("id"));

                // Dates (Destination dates)
                const dArrive = [$("#d-arrival-date").val(), "#" + $("#destination-errors").attr("id"), $("#d-arrival-date").attr("id")];
                const dDepart = [$("#d-departure-date").val(), "#" +  $("#destination-errors").attr("id"), $("#d-departure-date").attr("id")];
                const dStart = [$("#start-load-date").val(), "#" +  $("#destination-errors").attr("id"), $("#start-load-date").attr("id")];
                const dEnd = [$("#finish-load-date").val(), "#" +  $("#destination-errors").attr("id"), $("#finish-load-date").attr("id")];

                if (!((dArriveDepart == "Invalid") || (dStartEnd == "Invalid") || flagTime == false)) {
                    var flagBetDate1 = validStartEndDate(dArrive[0], dStart[0], $("#destination-errors"), dArrive[2], dStart[2]);
                    var flagBetTime1 = validStartEndTime(flagBetDate1, timeDArrive, timeDStartLoad, 
                        $("#destination-errors"), $("#d-arrival-time").attr("id"), $("#start-load-time").attr("id"));

                    if ($("#destination-errors").html() == "") {
                        var flagBetDate2 = validStartEndDate(dEnd[0], dDepart[0], $("#destination-errors"), dEnd[2], dDepart[2]);
                        var flagBetTime2 = validStartEndTime(flagBetDate2, timeDEndLoad, timeDDepart,
                        $("#destination-errors"), $("#finish-load-date").attr("id"), $("#d-departure-date").attr("id"));
                    }
                }
                
                if (((flagBetDate1 != "Invalid") && (flagBetDate2 != "Invalid")) && flagBetTime1 && flagBetTime2) {
                    var flagPDDate1 =  validStartEndDate(datePDepart, dateDArrive, $("#pick-up-errors"), $("#p-departure-date").attr("id"), 
                        $("#d-arrival-date").attr("id"));
                    var flagPDTime1 = validStartEndTime(flagPDDate1, timePDepart, timeDArrive, $("#pick-up-errors"), $("#p-departure-time").attr("id"), 
                        $("#d-arrival-time").attr("id"));

                    var flagPDDate2 = validStartEndDate(datePDepart, dateDArrive, $("#destination-errors"), $("#p-departure-date").attr("id"), 
                        $("#d-arrival-date").attr("id"));
                    var flagPDTime2 = validStartEndTime(flagPDDate2, timePDepart, timeDArrive, $("#destination-errors"), $("#p-departure-time").attr("id"), 
                        $("#d-arrival-time").attr("id"));
                }
            }
        }
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

    function validDateFilled (dateInput) {
        if (dateInput == "")
            return false;
        return true;
    }

    /**
     * Checks date fields if they are not set at most today (YYYY-MM-DD)
     * 
     * @param {String} input        The user input for a specific field in the form
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
     * @param {String} id           The ID of the field in the form with discrepancies
    */
    function validDate (input, errorfield, id) {
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        var dateToday = getDateTime(yyyy + "-" + ("0" + mm) + "-" + dd);
        var dateInput = getDateTime(input);

        if (input == "") {
            setInvalid(id, "Date must not be empty.", errorfield);
            return true;
        }
        else if ((dateInput - dateToday > 0) || isNaN(dateInput)) {
            setInvalid(id, "Date must be at most today.", errorfield);
            return true;
        }
        else {
            setValid(id, errorfield);
            return false;
        }
    }

    /**
     * Checks start and end date fields if end date does not precede start date
     * 
     * @param {String}  startInput  The user's starting date input
     * @param {String}  endInput    The user's ending date input
     * @param {String}  errorfield1 The ID of the starting date's errorfield in the form to display the errormsg in
     * @param {String}  errorfield2 The ID of the starting date's errorfield in the form to display the errormsg in
     * @param {String}  startId     The ID of the starting date field in the form with discrepancies 
     * @param {String}  startId     The ID of the sending date field in the form with discrepancies 
    */
    function validStartEndDate (startInput, endInput, errorfield, startId, endId) {
        var dateStart = getDateTime(startInput);
        var dateEnd = getDateTime(endInput);
        var errorMsg;

        if ((startId == "p-departure-date") && (endId == "d-arrival-date"))
            errorMsg = "Invalid Input. Pick-up point date/time must be before Destination point date/time.";
        
        else if (((startId == "d-arrival-date") && (endId == "start-load-date")) || 
            ((startId == "finish-load-date") && (endId == "d-departure-date")))
            errorMsg = "Invalid Input. Loading/Unloading date/time should be between arrival and departure date/time.";
        else
            errorMsg = "Invalid Input. Start date must be before end date.";

        if (!(validDate(startInput, errorfield, startId) || validDate(endInput, errorfield, endId))) {
            // Special case
            if (startInput == "2021-09-01" && endInput == "2021-08-31") {
                setInvalid(startId, errorMsg, errorfield);
                setInvalid(endId, errorMsg, errorfield);
                return "Invalid";
            }

            if (!(dateEnd == dateStart) || (startInput == "2021-08-31" && endInput == "2021-09-01")) {
                if (dateEnd - dateStart < 0) {
                    setInvalid(startId, errorMsg, errorfield);
                    setInvalid(endId, errorMsg, errorfield);
                    return "Invalid";
                }
                else {
                    setValid(startId, errorfield);
                    setValid(endId, errorfield);
                }
                return false;
            }
            return true;
        }
        return "Invalid";
    }

    function validTime(timeInput) {
        if (timeInput == "")
            return false;
        return true;
    }

    /**
     * Checks start and end time fields if end time does not precede start time
     * 
     * @param {boolean/String}  dateFlag    Contains a boolean value if the dates associated with the time are valid
     *                                      True if date is valid and dates are the same.
     *                                      False if date is valid but are NOT the same.
     *                                      Otherwise, it is a String containing "Invalid"
     * @param {String}          startInput  The user's starting time input
     * @param {String}          endInput    The user's ending time input
     * @param {String}          errorfield1 The ID of the starting time's errorfield in the form to display the errormsg in
     * @param {String}          errorfield2 The ID of the starting time's errorfield in the form to display the errormsg in
     * @param {String}          startId     The ID of the starting time field in the form with discrepancies 
     * @param {String}          startId     The ID of the sending time field in the form with discrepancies 
    */
    function validStartEndTime (dateFlag, startInput, endInput, errorfield, startId, endId) {
        var startHH = parseInt(startInput.slice(0, 2));
        var startMM = parseInt(startInput.slice(3, 5));

        var endHH = parseInt(endInput.slice(0, 2));
        var endMM = parseInt(endInput.slice(3, 5));

        var errorMsg;
        var errorEmptyMsg;

        if ((startId == "ack-time") || (endId == "ack-time"))
            errorEmptyMsg = "Invalid input. Time must not be empty.";
        else
            errorEmptyMsg = "Invalid Input. Start and end time must not be empty.";

        if ((startId == "p-departure-time") && (endId == "d-arrival-time"))
            errorMsg = "Invalid Input. Pick-up point date/time must be before Destination point date/time.";
        else if (((startId == "d-arrival-time") && (endId == "start-load-time")) || 
            ((startId == "finish-load-time") && (endId == "d-departure-time")))
            errorMsg = "Invalid Input. Loading/Unloading date/time should be between arrival and departure date/time.";
        else
            errorMsg = "Invalid Input. Start and end time must be different if dates are the same.";
        
        if (dateFlag != "Invalid") {
            if (dateFlag) {
                if (!(validTime(startInput) || validTime(endInput))) {
                    setInvalid(startId, errorEmptyMsg, errorfield);
                    setInvalid(endId, errorEmptyMsg, errorfield);
                    return false;
                }
                if ((endInput.localeCompare(startInput) == 0) && startId != "ack-time") {
                    setInvalid(startId, errorMsg, errorfield);
                    setInvalid(endId, errorMsg, errorfield);
                    return false;
                }
                else if (endHH == startHH) {
                    if (endMM < startMM) {
                        setInvalid(startId, errorMsg, errorfield);
                        setInvalid(endId, errorMsg, errorfield);
                        return false;
                    }
                    else {
                        setValid(startId, errorfield);
                        setValid(endId, errorfield);
                        return true;
                    }
                }
                else if (endHH < startHH) {
                    setInvalid(startId, errorMsg, errorfield);
                    setInvalid(endId, errorMsg, errorfield);
                    return false;
                }
                else {
                    setValid(startId, errorfield);
                    setValid(endId, errorfield);
                    return true;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * Checks if quantity stays in the range 0 - 100
     * 
     * @param {String} input        The user input for a specific field in the form
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
     * @param {String} id           The ID of the field in the form with discrepancies
    */
    function validAmount (input, id) {
        if (input == "" || input < 0)
            setDefAmt(id, 1);
        else if (input > 100)
            setDefAmt(id, 100);
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
     * Checks the length of a plate number input if it is within the given min-max range
     * 
     * @param {String} input        The user input for a specific field in the form
     * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
     * @param {String} id           The ID of the field in the form with discrepancies
    */
    function validPlateNo (input, errorfield, id, length) {
        if (!validator.isLength(input, {min: 6, max: length}))
            setInvalid(id, 'Invalid input. Minimum of 6 characters and maximum of ' + length + ' characters.', errorfield);
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
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of ' + length + ' characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Gets and returns the time (millisecond) equivalent of a date
     * 
     * @param {String}  input   The date in String format to be converted
    */
    function getDateTime (input) {
        var day = parseInt(input.slice(8, 10));
        var month = parseInt(input.slice(5, 7));
        var year = parseInt(input.slice(0, 4));

        return new Date (year, month, day).getTime();
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
     * Setting the DEFAULT & MAX DATE to today (for all date fields)
     * 
     * @param {String}  dateId  The ID of the date field in the form with discrepancies
     */
    function setDefDate (dateId) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd < 10)
            dd='0'+dd;
        if(mm < 10)
            mm='0'+mm; 
        today = yyyy+'-'+mm+'-'+dd;

        var fieldId = "#" + dateId;
        $(fieldId).val(today);
    }

    /**
     * Sets the time field to its default values
     * 
     * @param {String} timeId The ID of the time field in the form with discrepancies
     */
    function setDefTime (timeId) {
        var fieldId = "#" + timeId;
        $(fieldId).val("00:00");
    }

    /**
     * Sets the amount field to its default values
     * 
     * @param {String} amtId    The ID of the amount field in the form with discrepancies
     * @param {Number} amt      The amount to set the value of the field to
     */
    function setDefAmt (amtId, amt) {
        var fieldId = "#" + amtId;
        $(fieldId).val("" + amt);
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
        
        //Part 1
        $("#upper1-left-p1").html(strFieldUpper1P1);
        $("#upper2-left-p1").html(fieldsP1[2]); 
        $("#lower1-left-p1").html(fieldsP1[3]);
        $("#lower2-left-p1").html(fieldsP1[4]);
        $("#upper1-right-p1").html(strDataUpper1P1);
        $("#upper2-right-p1").html(dataP1[2]);
        $("#lower1-right-p1").html(dataP1[3]);
        $("#lower2-right-p1").html(dataP1[4]);
        
        //Part 2
        $("#upper-left-p2").html(strFieldUpperP2);
        $("#upper-right-p2").html(strDataUpperP2);
        $("#middle-left-p2").html(fieldsP2[2]);
        $("#middle-right-p2").html(dataP2[2]);
        $("#lower-left-p2").html(strFieldLowerP2);
        $("#lower-right-p2").html(strDataLowerP2);

        //Part 3. Pick Up Point
            //Label
        $("#a-date-label-ppoint-p3").html(fieldsP3[0]);
        $("#a-time-label-ppoint-p3").html(fieldsP3[4]);
        $("#d-date-label-ppoint-p3").html(fieldsP3[3]);
        $("#d-time-label-ppoint-p3").html(fieldsP3[4]);        
            //Input
        $("#a-date-input-ppoint-p3").html(dataP3[0]);
        $("#a-time-input-ppoint-p3").html(dataP3[1]);
        $("#d-date-input-ppoint-p3").html(dataP3[2]);
        $("#d-time-input-ppoint-p3").html(dataP3[3]);               
        //Part 3. Destination Point
            //Label
        $("#a-date-label-dpoint-p3").html(fieldsP3[0]);
        $("#a-time-label-dpoint-p3").html(fieldsP3[4]);
        $("#sl-date-label-dpoint-p3").html(fieldsP3[1]);
        $("#sl-time-label-dpoint-p3").html(fieldsP3[4]);
        $("#fl-date-label-dpoint-p3").html(fieldsP3[2]);
        $("#fl-time-label-dpoint-p3").html(fieldsP3[4]);
        $("#d-date-label-dpoint-p3").html(fieldsP3[3]);
        $("#d-time-label-dpoint-p3").html(fieldsP3[4]);
            //Input
        $("#a-date-input-dpoint-p3").html(dataP3[4]);
        $("#a-time-input-dpoint-p3").html(dataP3[5]);
        $("#sl-date-input-dpoint-p3").html(dataP3[6]);
        $("#sl-time-input-dpoint-p3").html(dataP3[7]);
        $("#fl-date-input-dpoint-p3").html(dataP3[8]);
        $("#fl-time-input-dpoint-p3").html(dataP3[9]);
        $("#d-date-input-dpoint-p3").html(dataP3[10]);
        $("#d-time-input-dpoint-p3").html(dataP3[11]);
        
        //Part 4
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

    document.getElementById("date-issued").setAttribute("max", today);  
    document.getElementById("p-arrival-date").setAttribute("max", today);   
    document.getElementById("p-departure-date").setAttribute("max", today);
    document.getElementById("d-arrival-date").setAttribute("max", today);   
    document.getElementById("d-departure-date").setAttribute("max", today); 
    document.getElementById("start-load-date").setAttribute("max", today);  
    document.getElementById("finish-load-date").setAttribute("max", today); 
    document.getElementById("ack-date").setAttribute("max", today);                                         

    /**
     * Displaying number of characters left in Description of Commodity
     */
     var div1 = document.createElement("div");
     var commodityDesc = document.getElementById("description");
     var div2 = document.createElement("div");
     var counterComomdityDesc = document.createElement("span");
 
     div1.style.position = "relative";
     div2.style.position = "absolute";
     div2.style.bottom = "3px";
     div2.style.color = "#ccc";
     div2.style.left = "47%";
     commodityDesc.parentNode.appendChild(div1);
     div1.appendChild(commodityDesc);
     div2.appendChild(counterComomdityDesc);
     div1.appendChild(div2);
 
     function charLeftCommodityDesc() {
         counterComomdityDesc.innerHTML = (150 - this.value.length);
     }
 
     commodityDesc.addEventListener("input", charLeftCommodityDesc);
     charLeftCommodityDesc.call(commodityDesc);   
 
     /**
      * Displaying number of characters left in Pick-up Site
      */
     var div3 = document.createElement("div");
     var pickUpSite = document.getElementById("pickup-site");
     var div4 = document.createElement("div");
     var counterPickUp = document.createElement("span");
 
     div3.style.position = "relative";
     div4.style.position = "absolute";
     div4.style.bottom = "9px";
     div4.style.color = "#ccc";
     div4.style.left = "47%";
     pickUpSite.parentNode.appendChild(div3);
     div3.appendChild(pickUpSite);
     div4.appendChild(counterPickUp);
     div3.appendChild(div4);
 
     function charLeftPickUpSite() {
         counterPickUp.innerHTML = (150 - this.value.length);
     }
 
     pickUpSite.addEventListener("input", charLeftPickUpSite);
     charLeftPickUpSite.call(pickUpSite);  
          
     /**
      * Displaying number of characters left in Delivery Site
      */
      var div5 = document.createElement("div");
      var deliverySite = document.getElementById("delivery-site");
      var div6 = document.createElement("div");
      var counterDeliverySite = document.createElement("span");
  
      div5.style.position = "relative";
      div6.style.position = "absolute";
      div6.style.bottom = "9px";
      div6.style.color = "#ccc";
      div6.style.left = "47%";
      deliverySite.parentNode.appendChild(div5);
      div5.appendChild(deliverySite);
      div6.appendChild(counterDeliverySite);
      div5.appendChild(div6);
  
      function charLeftDeliverySite() {
         counterDeliverySite.innerHTML = (150 - this.value.length);
      }
  
      deliverySite.addEventListener("input", charLeftDeliverySite);
      charLeftDeliverySite.call(deliverySite);   
    /**
     * Adding a default value for the radio buttons
     */
    let ackBtn = $('#acknowledgement1');
    if(ackBtn.attr('data-id') == ackBtn.val())
        ackBtn.prop("checked", true);
    else
        $('#acknowledgement2').prop("checked", true);
    

    $('.ship-mode').each(function(){
        if($(this).val() == $('#mode-shipment').attr('data-id'))
            $(this).prop("checked", true);
    });

    $('.doc-info').each(function(){
        let doc_info = $(this).attr('data-id');
        console.log(doc_info);
        switch(doc_info) {
            case "KN DR": $('#document1').prop("checked", true); break;
            case "AIR WAYBILL (AIR FREIGHT)": $('#document2').prop("checked", true); break;
            case "BILL OF LADING (SEA FREIGHT)": $('#document3').prop("checked", true); break;
            case "IMPORT": $('#document4').prop("checked", true); break;
            case "INVOICE": $('#document5').prop("checked", true); break;
            case "PACKING LIST": $('#document6').prop("checked", true); break;
            case "B.O REPORT": $('#document7').prop("checked", true); break;
            case "OTHERS": $('#document8').prop("checked", true); break;
        }
    });

    let id = $('#dr-form').attr('data-id');
        let oldCompanyName = $('#company-name').attr('data-id');

        console.log(id);
        console.log(oldCompanyName);

    $("#submit").prop("disabled", true);

    $('input').change(function() {
        $("#submit").prop("disabled", false);
    });

    $('input').keyup(function() {
        $("#submit").prop("disabled", false);
    });

    $('textarea').keyup(function() {
        $("#submit").prop("disabled", false);
    });
});