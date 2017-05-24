(function(){
	angular
		.module("myApp",[])
		.controller("blog", blog);
	function blog($scope, $http){
		$scope.hello = "chat robot test platform";
		// $question_answer = [];
		$http.get("/query/j")
			.then(setInfor);
		$scope.transfer = function(content){
			var query = {title:content};
			var infor = query.title;
			$http.post("/query/j", query)
				.then(setInfor);
		};
		$scope.remove = function(index){
			console.log(index);
			console.log("remove!!!");
			$http.delete("/query/j/"+index)
				.then(setInfor);
		}
		function setInfor(response){
			$scope.answer = response.data;
		}
	}
})();