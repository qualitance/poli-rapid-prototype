angular-openfb
==============

OpenFB module for AngularJS Apps

```bash
$ bower install angular-openfb
```

## Setup

```javascript
angular.module('myApp', ['openfb'])
.run(function (OpenFB) {
  
  OpenFB.init('YOUR_FB_APP_ID');

});
```

## Examples


### Getting user information
```javascript
angular.module('myApp')
.controller('ProfileCtrl', function ($scope, OpenFB) {
	OpenFB.get('/me').success(function (user) {
		$scope.user = user;
	});
});
```

### Login

```javascript
angular.module('myApp')
.controller('LoginCtrl', function ($scope, $location, OpenFB) {

	$scope.facebookLogin = function () {

		OpenFB.login('email,read_stream,publish_stream').then(
			function () {
				$location.path('/app/dashboard');
			},
			function () {
				alert('OpenFB login failed');
			});
	};

});
```

## Author
Created by [ccoenraets](https://github.com/ccoenraets)

## License
[MIT License](http://lnmunhoz.mit-license.org) © Lucas N. Munhoz
