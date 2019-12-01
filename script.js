window.onload = () => {

    let firstPagehtml =
        `<h1> Please Login </h1><br>
        Username: <input type="text" value="mwp"></input> <br> 
        Password: <input type="text" value="123"></input> <br>
        <button type="button" id="loginBtn"> Login </button>`

    let animationPagehtml;

    let isLogin;
    let myObj;
    let animString;
    // let myToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA"

    document.querySelector("#outlet").innerHTML = firstPagehtml
    document.getElementById("loginBtn").addEventListener("click", login)



    function login() {
        const inputs = document.querySelectorAll('input') // [input, input]


        fetch('http://mumstudents.org/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": inputs[0].value, "password": inputs[1].value })
        })
            .then(response => response.json())
            .then(data => {
                myObj = data;
                console.log(myObj.token)

                if (myObj.status) {
                    animationFunc();
                    isLogin = true;

                } else {
                    alert("Incorrect login credentials")
                }
            })
    }

    function logOut() {
        if (isLogin) {
            document.querySelector("#outlet").innerHTML = firstPagehtml
        }
        isLogin = false
    }
    // document.getElementById("logoutBtn").addEventListener("click", logOut)

    let longitude;
    let latitude;
    let locationObj;
    let navigatorKey = "ReZTsHlODWnYHr2pVQjftQiOcMKwSZWb"
    let city;
    let state;
    let country;

    navigator.geolocation.getCurrentPosition(success, fail);

    function success(position) {
        latitude = position.coords.latitude //latitude 41.0127308
        longitude = position.coords.longitude  //longitude -91.959689

        fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${navigatorKey}&location=${latitude},${longitude}`, {
            header: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                locationObj = data;
                city = locationObj.results[0].locations[0].adminArea5
                state = locationObj.results[0].locations[0].adminArea3
                country = locationObj.results[0].locations[0].adminArea1
            })
    }



    function fail(msg) {
        console.log(msg.code + msg.message); // Log the error
    }


    function animationFunc() {

        console.log(myObj.token + "");
        let myToken = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`

        // URL: http://mumstudents.org/api/animation
        // HTTP verb: GET
        // Request header must include the following:
        // Authorization: Bearer token
        // Replace the token from the response received after you log in.
        // The server will send back a string response contains the full ASCII animation frames
        fetch("http://mumstudents.org/api/animation", {
            headers: {

                // Authorization: `Bearer ${myToken}`
                'Authorization': `Bearer ${myObj.token}`

            }
        })
            .then(response => response.text())
            .then(data => {
                animString = data;
                animString = animString.split("=====");
                console.log(animString);

                animationPagehtml = `<h2 id=welcomeId> Welcome ${city} ${state} ${country} <h2><br>
                <textarea rows="40" cols="100" id="animationTextArea"></textarea><br>
                <button type="button" id="refreshBtn"> Refresh Animation </button> 
                <button type="button" id="logoutBtn"> Logout </button> `

                document.querySelector("#outlet").innerHTML = animationPagehtml;

                // document.getElementById("animationTextArea").innerHTML = animString


                // let i = 0;
                // setInterval((animString) => {
                //     console.log(animString[i])
                //     i++
                //     if (i === animString.length - 1) {
                //         i = 0
                //     }
                // }, 200);




                let i = 0
                setInterval(playAnim, 200);

                function playAnim() {
                    //console.log(animString[i])
                    document.getElementById("animationTextArea").innerHTML = animString[i];
                    ++i
                    if (i === animString.length - 1) {
                        i = 0;
                    }
                }
            })
    }
}

