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

    let animationPagehtml =
        `<h2> Welcome all from <br>
        <textarea rows="40" cols="100" id="animationTextArea"></textarea><br>

        <button type="button" id="refreshBtn"> Refresh Animation </button> 
        <button type="button" id="logoutBtn"> Logout </button> 

        `

    document.querySelector("#outlet").innerHTML = firstPagehtml

    function animationPage() {
        document.querySelector("#outlet").innerHTML = animationPagehtml
    }


    navigator.geolocation.getCurrentPosition(success, fail);

    function success(position) {
        console.log('Longitude:' + position.coords.longitude);
        console.log('Latitude:' + position.coords.latitude);
    }

    function fail(msg) {
        console.log(msg.code + msg.message); // Log the error
    }


    document.getElementById("loginBtn").addEventListener("click", animationPage)

    fetch("http://open.mapquestapi.com/geocoding/v1/reverse")
        .then(response => response.json())
        .then(myJson => console.log(myJson));

    fetch('http://mumstudents.org/api/login', {
            method: 'POST', // GET, POST, PUT, DELETE, etc.
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": "mwp", "password": 123})
        })
            
        
         .then(response => response.json());
    //     .catch (error => console.error(error));

    

}