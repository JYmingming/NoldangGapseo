

			let a;

			const b = document.querySelectorAll(".destination_type_id")



			fetch("/destination/users/list").then(function(response) {
				return response.json();
			}).then(function(result) {
				console.log(result);
				
		        for (var i = 0; i < 8; i++) {
		        	b[i].innerHTML =result[i].destinationTypeName;
		          }


			})
		
				let c;

			const d = document.querySelectorAll(".destination_name")



			fetch("/destination/users/list").then(function(response) {
				return response.json();
			}).then(function(result) {
				console.log(result);
				
		        for (var i = 0; i < 8; i++) {
		        	d[i].innerHTML =result[i].destinationName;
		          }


			})
			
				let e;

			const f = document.querySelectorAll(".address")



			fetch("/destination/users/list").then(function(response) {
				return response.json();
			}).then(function(result) {
				console.log(result);
				
		        for (var i = 0; i < 8; i++) {
		        	f[i].innerHTML =result[i].address;
		          }


			})
			
							let r;

			const s = document.querySelectorAll(".phone")



			fetch("/destination/users/list").then(function(response) {
				return response.json();
			}).then(function(result) {
				console.log(result);
				
		        for (var i = 0; i < 8; i++) {
		        	s[i].innerHTML =result[i].phone;
		          }


			})
			
			
			
									let k;

			const l = document.querySelectorAll(".destination_id")



			fetch("/destination/users/list").then(function(response) {
				return response.json();
			}).then(function(result) {
				console.log(result);
				
		        for (var i = 0; i < 8; i++) {
		        	l[i].innerHTML =result[i].destinationId;
		          }


			})
			
						let g;

			const h = document.querySelectorAll(".contents")



			fetch("/destination/users/list").then(function(response) {
				return response.json();
			}).then(function(result) {
				console.log(result);
				
		        for (var i = 0; i < 8; i++) {
		        h[i].innerHTML =result[i].contents;
		          }


			})
			
			
		