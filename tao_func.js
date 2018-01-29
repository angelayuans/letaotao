var app = angular
.module("myModule",[])
.controller("myController",function($scope,$filter){
	$scope.init = function(query){
		$scope.groupToPages(query);
	};
	$scope.sort = {       
		sortingOrder : 'id',
		reverse : false
	};
	$scope.gap = 10;

	$scope.filteredItems = [];
	$scope.groupedItems = [];
	$scope.itemsPerPage = 28;
	$scope.pagedItems = [];
	$scope.currentPage = 0;
	$scope.employees = employees;
	var searchMatch = function (haystack, needle) {
		if (!needle) {
			return true;
		}
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

// init the filtered items
$scope.search = function () {
	$scope.filteredItems = $filter('filter')($scope.employees, function (item) {
		for(var attr in item) {
			if (searchMatch(item[attr], $scope.query))
				return true;
		}
		return false;
	});


// take care of the sorting order
if ($scope.sort.sortingOrder !== '') {
	$scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
}
$scope.currentPage = 0;
// now group by pages
// var query;

};
$scope.searchFunc = function (foo) {
	alert(foo);
	$scope.groupToPages(foo);
	$scope.$apply(function(foo) {
		$scope.groupToPages(foo);
	});
};


// calculate page in place
$scope.groupToPages = function (keywords) {
	var queryList=[]
	if(keywords)
		queryList=keywords.split(',');
	$scope.pagedItems = [];
	var total=0;
	for (var i = 0, index=0; i < $scope.filteredItems.length; i++) {
		if(queryList.length!=0){
			for (var j =0;j<queryList.length;j++){
				if($scope.filteredItems[i].cat.includes(queryList[j])){
					if (index % $scope.itemsPerPage === 0) {
						$scope.pagedItems[Math.floor(index / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
						index++;
						total++;
					} else {
						$scope.pagedItems[Math.floor(index / $scope.itemsPerPage)].push($scope.filteredItems[i]);
						index++;
						total++;
					}
				}
			}
		}
		else{
			if (i % $scope.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}
	}
	console.log("taotal item "+$scope.filteredItems.length);
	console.log("page size "+$scope.pagedItems.length);
	console.log("size each page"+$scope.pagedItems[0].length);
	console.log("filter item "+total);
	
};

$scope.range = function (size,start, end) {
	var ret = [];        
	console.log(size,start, end);

	if (size < end) {
		end = size;
		start = size-$scope.gap;
	}
	for (var i = start; i < end; i++) {
		ret.push(i);
	}        
	console.log(ret);        
	return ret;
};

$scope.prevPage = function () {
	if ($scope.currentPage > 0) {
		$scope.currentPage--;
	}
};

$scope.nextPage = function () {
	if ($scope.currentPage < $scope.pagedItems.length - 1) {
		$scope.currentPage++;
	}
};

$scope.setPage = function () {
	$scope.currentPage = this.n;
};




// functions have been describe process the data for display
$scope.search();

});
app.$inject = ['$scope', '$filter'];
