window.onload = () => {

    let loginTemplate =
        `<h1> Please Login </h1><br>
        Username: <input type="text" value="mwp"></input> <br> 
        Password: <input type="text" value="123"></input> <br>
        <button type="button" id="loginBtn"> Login </button>`

    let animationTemplate =
        `<br>
        <textarea rows="40" cols="100" id="animationTextArea"></textarea><br>
        <button type="button" id="refreshBtn"> Refresh Animation </button> 
        <button type="button" id="logoutBtn"> Logout </button> `

    let isLogin;
    let myObj;
    let animString;

    // let loginBtn = document.getElementById("loginBtn")

    let refresh;

    document.querySelector("#outlet").innerHTML = loginTemplate
    document.getElementById("loginBtn").addEventListener("click", login)



    function login() {

        loginBtn.addEventListener("click", _ => window.history.pushState({ page: 1 }, "title 1", "?page=1"))

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
            document.querySelector("#outlet").innerHTML = loginTemplate
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

                animationTemplate = `<h2 id=welcomeId> Welcome ${city} ${state} ${country} <h2><br>
                <textarea rows="40" cols="100" id="animationTextArea"></textarea><br>
                <button type="button" id="refreshBtn"> Refresh Animation </button> 
                <button type="button" id="logoutBtn"> Logout </button> `
            })
    }

    function fail(msg) {
        console.log(msg.code + msg.message); // Log the error
    }




    function animationFunc() {


        document.querySelector("#outlet").innerHTML = animationTemplate;

        // refresh = document.getElementById("refreshBtn").addEventListener("click", animationFetch)

        animationFetch();

    }

    let i = 0;
    function playAnim() {

        document.getElementById("animationTextArea").innerHTML = animString[i];
        ++i
        if (i === animString.length) {
            i = 0;
        }

    }

    function animationFetch() {
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

                setInterval(playAnim, 200);
            })
    }


}

//document.getElementById("refreshBtn").addEventListener("click", animationFetch)