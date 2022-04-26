    const searchParam = {
    startDate: '',
    endDate: '',
    startLocation: '',
    };


document.querySelector("#search-submit-btn").onclick = function() {
        searchParam.startDate= document.querySelector("#start-date").innerHTML;
        searchParam.endDate= document.querySelector("#end-date").innerHTML;
        searchParam.startLocation= document.querySelector("#start-location").value;
        console.log(searchParam);
        fetch("/reserve/getAir",{
            method: "POST",
            body: searchParam
        }).then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result)
    })
};
