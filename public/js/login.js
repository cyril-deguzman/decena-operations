$(document).ready(function () {

	$("#login-button").click(function () {
        let credentials = $("#ucode").val();

        $.post("/login", 
        {
            pass: credentials, 
        }, function(result) {
            let url;

            switch(result) {
                case 'enc': 
                    url = `/search`; 
                    window.location = url;
                    break;
                case 'acc':
                    url = `/accounting`; 
                    window.location = url;
                    break;
                default:
                    // TODO: VISUALS
                    alert('invalid credentials');
            }
            

        });
	})

})