const makeApiCall = (ajaxOptions) => {
  const { method, url, data, token, success, error } = ajaxOptions;

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
      // Handle expired token here (e.g., redirect to login page or refresh token)
      console.log("Token expired. Redirecting to login page...");
      // Redirect to login page
      window.location.href = "/login";
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
    headers: token ? { ...api.headers, Authorization: `Bearer ${token}` } : api.headers,
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


