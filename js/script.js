function repetoireContact(){
    $(document).ready(function() {
        $('#inputForm').append('<div class="containerInput"></div>').append('<div id="displayContact"></div> <br>');
        $('.containerInput').append('<form id="myForm" method="#" action="#"></form>');
        $( '#myForm' ).append('<input type="text" name="name" id="surName" placeholder="Nom" required /><br>')
                         .append('<input type="text" name="surname" id="name" placeholder="Prénom" required /><br>')
                         .append('<input type="text" name="phone" id="yourPhone" placeholder="Téléphone" required /><br>')
                         .append('<input id="sendInfo" type="submit" value="Envoyer contact"/> <br>')
                         .append('<a href="#" id="clearContact">Vider les contacts</a>');

        $('#displayContact').append(
            "<table class='tableContainer'>" +
                "<tbody class='bodyTable'>"+
                    "<tr class='titleTable'>" +
                        "<th>Nom</th>" +
                        "<th>Prenom</th>" +
                        "<th>Email</th>"+
                    "</tr>"+
                "</tbody>"+
            "</table>"
        );

        // Si il y'a des données dans le localstorage, les affiches au début de la fonction
        if ( localStorage.length > 0 ) {
            let getLocalStoreSurName = JSON.parse(localStorage.getItem("surname"));
            let getLocalStoreName = JSON.parse(localStorage.getItem("name"));
            let getLocalStorePhone = JSON.parse(localStorage.getItem("phone"));

            for(let i in getLocalStoreSurName){
                $('.bodyTable').append(
                    "<tr class='displayContact'>"+
                    "<td>"+ getLocalStoreSurName[i] + "</td>" +
                    "<td>" + getLocalStoreName[i] + "</td>" +
                    "<td>" + getLocalStorePhone[i] + "</td>"+
                    "</tr>"
                );
            }
        }

        $( "#sendInfo" ).on('click', function (event) {
            event.preventDefault();

            let surnameVal = $( "#surName" ).val();
            let nameVal    = $( "#name" ).val();
            let phoneVal   = $( "#yourPhone" ).val();

            if(surnameVal !== "" && nameVal !== "" && phoneVal !== ""){
                $(".alert").remove();

                let retrieveSurName = JSON.parse(localStorage.getItem('surname')) || [];
                let retrieveName    = JSON.parse(localStorage.getItem('name')) || [];
                let retrievePhone   = JSON.parse(localStorage.getItem('phone')) || [];

                retrieveSurName.push(surnameVal);
                retrieveName.push(nameVal);
                retrievePhone.push(phoneVal);

                localStorage.setItem("surname", JSON.stringify(retrieveSurName));
                localStorage.setItem("name", JSON.stringify(retrieveName));
                localStorage.setItem("phone", JSON.stringify(retrievePhone));

                $('.bodyTable').append(
                    "<tr class='displayContact'>"+
                        "<td>"+ surnameVal + "</td>" +
                        "<td>" + nameVal + "</td>" +
                        "<td>" + phoneVal + "</td>"+
                    "</tr>"
                );
            }else{
                if($('.alert').length < 1){
                    $( '.containerInput' ).append("<p class='alert'>Remplir tous les champs</p>");
                }
            }

        });
        $('#clearContact').on('click', function(){
            localStorage.clear();
            $('tr.displayContact').remove();
        })
    });
}
repetoireContact();