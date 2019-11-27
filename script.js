// your code here

/*URL: http://mumstudents.org/api/login
HTTP verb: POST
Request body: JSON format
{“username”: “mwp”, “password”: “123”
The server will send a JSON response with the following format:
{token: string, status: true}
*/

window.onload = () => {

    let firstPagehtml =
        `<h1> Please Login </h1><br>
        Username: <input type="text" value="mwp"></input> <br> 
        Password: <input type="text" value="123"></input> <br>
        <button type="button" id="loginBtn"> Login </button>`

    // let animationPagehtml =
    //     `<h2 id=welcomeId> Welcome<h2><br>
    //     <textarea rows="40" cols="100" id="animationTextArea"></textarea><br>
    //     <button type="button" id="refreshBtn"> Refresh Animation </button> 
    //     <button type="button" id="logoutBtn"> Logout </button> 
    //     `

    document.querySelector("#outlet").innerHTML = firstPagehtml

    document.getElementById("loginBtn").addEventListener("click", login)


    let isLogin;
    let myObj;

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


                if (myObj.status) {
                    document.querySelector("#outlet").innerHTML = `<h2 id=welcomeId> Welcome ${city} ${state} ${country} <h2><br>
                    <textarea rows="40" cols="100" id="animationTextArea"></textarea><br>
                    <button type="button" id="refreshBtn"> Refresh Animation </button> 
                    <button type="button" id="logoutBtn"> Logout </button> 
                    `;
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

                console.log(longitude)
                console.log(latitude)
                console.log(locationObj)

                console.log(locationObj.results[0].locations[0].adminArea1)
                city = locationObj.results[0].locations[0].adminArea5
                state = locationObj.results[0].locations[0].adminArea3
                country = locationObj.results[0].locations[0].adminArea1

                console.log(city)
                console.log(state)
                console.log(country)

            })
    }

}


//latitude 41.0127308
//longitude -91.959689

function fail(msg) {
    console.log(msg.code + msg.message); // Log the error
}


    // fetch("http://open.mapquestapi.com/geocoding/v1/reverse?")
    //     .then(response => response.json())
    //     .then(myJson => console.log(myJson));



    // fetch('http://mumstudents.org/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ "username": "mwp", "password": 123 })
    // }).then(response => response.json())
    //     .then(data => {
    //         myObj = data
    //     })



    // fetch('http://mumstudents.org/api/login')
    //         .then(response => response.json())
    //         .then(myJson = console.log(myJson));
    //         let tokenObj = response.json();

    //         console.log(tokenObj.token)

    //     .then(response => response.json());
    //     .catch (error => console.error(error));



