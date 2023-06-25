//*  helper functions
const Toast = Swal.mixin({
	toast: true,
	position: "top-right",
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	animation: true,
	iconColor: "rgba(255, 255, 255, 0.9)",
	color: "#fff",
});

function showToast(title, type, cb) {
	Toast.fire({
		icon: type,
		title: title,
		timerProgressBar: false,
		background: type == "success" ? "rgb(105 165 105)" : "rgb(195 51 65)",
	}).then((result) => cb(result));
}

// sweat alert
function showAlert(msg, title, type, callBack) {
	Swal.fire({
		text: msg,
		title: title,
		icon: type,
		confirmButtonText: "OK",
		confirmButtonColor: "#723a92",
	}).then((result) => callBack(result));
}

// Function to store data in cookies
function setCookie(name, value, days) {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${encodeURIComponent(
		value
	)};expires=${expires.toUTCString()};path=/`;
}

// Function to retrieve data from cookies
function getCookie(name) {
	const cookieName = `${name}=`;
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		while (cookie.charAt(0) === " ") {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(cookieName) === 0) {
			return decodeURIComponent(
				cookie.substring(cookieName.length, cookie.length)
			);
		}
	}
	return null;
}

// function to delete cookie
const deleteCookie = (name) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Function to store data in local storage
const setToStorage = (key, value) => {
	let storedValue = JSON.stringify(value);
	localStorage.setItem(key, storedValue);
};

// Function to retrieve data from local storage
const getFromStorage = (key) => {
	let value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

// Function to show the preloader
const showLoader = () => {
	$(".preloader").show();
};

// Function to hide the preloader
const hideLoader = () => {
	$(".preloader").hide();
};

//* end helper functions

//* ApI  helper function
var api = {
	baseURL: "https://kally-url-shortner.onrender.com",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Credentials": true,
	},
	withCredentials: true,
};

const makeApiCall = (ajaxOptions) => {
	const { method, url, data, token, success, error } = ajaxOptions;

	// Check system connectivity
	if (!navigator.onLine) {
		const errorResponse = {
			response: {
				status: "error",
				data: { message: "No internet connection" },
			},
		};
		error(errorResponse.response);
		return;
	}

	// Wrap success callback to intercept responses
	const successInterceptor = (res) => {
		// Check for error status codes and handle them
		if (res.status === "error") {
			const errorResponse = {
				response: {
					status: res.statusCode,
					data: res,
				},
			};
			error(errorResponse.response);
		} else {
			success(res);
		}
	};

	// Wrap error callback to intercept errors
	const errorInterceptor = (jqXHR) => {
		const errorResponse = {
			response: {
				status: jqXHR.status,
				data: jqXHR.responseJSON,
			},
		};

		// Handle specific error codes
		if (jqXHR.status === 401) {
			showToast("expired or invalid token", "error", () => {
				deleteCookie("shortlyToken");
				location.href= "/shorten-url/login.html";
			});
		} else {
			error(errorResponse.response);
		}
	};

	// Make the API call and attach the interceptors
	$.ajax({
		url: `${api.baseURL}${url}`,
		method: method,
		dataType: "json",
		data: JSON.stringify(data),
		headers: token
			? { ...api.headers, Authorization: `Bearer ${token}` }
			: api.headers,
		xhrFields: {
			withCredentials: api.withCredentials,
		},
		success: successInterceptor,
		error: errorInterceptor,
	});
};

// HTTP GET request
const get = (url, token, success, error) => {
	makeApiCall({
		method: "GET",
		url: url,
		token: token,
		success: success,
		error: error,
	});
};

// HTTP POST request
const post = (url, data, token, success, error) => {
	makeApiCall({
		method: "POST",
		url: url,
		data: data,
		token: token,
		success: success,
		error: error,
	});
};

// HTTP DELETE request
const del = (url, token, success, error) => {
	makeApiCall({
		method: "DELETE",
		url: url,
		token: token,
		success: success,
		error: error,
	});
};

// HTTP PATCH request
const patch = (url, data, token, success, error) => {
	makeApiCall({
		method: "PATCH",
		url: url,
		data: data,
		token: token,
		success: success,
		error: error,
	});
};

// HTTP PUT request
const put = (url, data, token, success, error) => {
	makeApiCall({
		method: "PUT",
		url: url,
		data: data,
		token: token,
		success: success,
		error: error,
	});
};

//* end ApI  helper function
