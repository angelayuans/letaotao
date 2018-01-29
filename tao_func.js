var app = angular
.module("myModule",[])
.controller("myController",function($scope,$filter){
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


//create multiple queryList

// for cloth   queryList="男装','女装"
// for babay  queryList="baby"
$scope.queryList='男装,女装';
$scope.groupToPages($scope.queryList);
};


// calculate page in place
$scope.groupToPages = function (queryList) {
	var queryList=queryList.split(',');
	$scope.pagedItems = [];
	for (var i = 0, index=0; i < $scope.filteredItems.length; i++) {
		for (var j =0;j<queryList.length;j++){
			if($scope.filteredItems[i].cat.includes(queryList[j])){
				if (index % $scope.itemsPerPage === 0) {
					$scope.pagedItems[Math.floor(index / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
					index++;
				} else {
					$scope.pagedItems[Math.floor(index / $scope.itemsPerPage)].push($scope.filteredItems[i]);
					index++;
				}
			}
		}
	}
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
