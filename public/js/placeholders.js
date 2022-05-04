'use strict';
ready(() => {
    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    ajaxGET("/nav", function (data) {
        let navbar = document.querySelector("#navbarPlaceholder");
        navbar.innerHTML = data;
        document.querySelector("#profile").addEventListener("click", () => {
            getProfile();
        })
    });

    ajaxGET("/footer", function(data) {
        // console.log(data);
        let footer = document.querySelector("#footerPlaceholder");
        footer.innerHTML = data;
        console.log("accessed");
    });
    async function getProfile() {
        try {
            let response = await fetch("/profile", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/profile");
            }
        } catch (err) {

        }
    }
    

})

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}