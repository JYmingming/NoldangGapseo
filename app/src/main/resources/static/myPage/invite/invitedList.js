import { } from '../../common/api/apiList.js';

    
    fetch("/travel/travelList")
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result);
      })
