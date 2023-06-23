
var api = {
    baseURL: "https://kally-url-shortner.onrender.com",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    },
    withCredentials: true
};


api.interceptors = {
    response: {
        use: function (responseHandler, errorHandler) {
            this.then(responseHandler).catch(function (jqXHR) {
                const error = {
                    response: {
                        status: jqXHR.status,
                        data: jqXHR.responseJSON,
                    },
                };
                errorHandler(error);
            });
        },
    },
};

api.get = function (url, params, token) {
    const headers = { ...api.headers };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return $.ajax({
        url: `${api.baseURL}${url}`,
        method: 'GET',
        dataType: 'json',
        data: params,
        headers: headers,
        xhrFields: {
            withCredentials: api.withCredentials,
        },
    });
};

api.post = function (url, data, token) {
    const headers = { ...api.headers };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return $.ajax({
        url: `${api.baseURL}${url}`,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: headers,
        xhrFields: {
            withCredentials: api.withCredentials,
        },
    });
};

api.delete = function (url, token) {
    const headers = { ...api.headers };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return $.ajax({
        url: `${api.baseURL}${url}`,
        method: 'DELETE',
        headers: headers,
        xhrFields: {
            withCredentials: api.withCredentials,
        },
    });
};


// user auth 
const login = ({ name, password }, token) => {
    console.log(name, password);

    // api.post('user/login', data, token);
}




// GET request
const getCourses = (token) => api.get('/courses', null, token);

// POST request
const createCourse = (courseData, token) =>
    api.post('/courses', courseData, token);

// DELETE request
const deleteCourse = (id, token) => api.delete(`/courses/${id}`, token);

// Usage
const token = 'your_token_here';

getCourses(token)
    .done((response) => {
        // Handle the successful response
        console.log(response);
    })
    .fail((error) => {
        // Handle the error
        console.error(error);
    });

const courseData = { title: 'JavaScript Course', duration: '3 months' };
createCourse(courseData, token)
    .done((response) => {
        // Handle the successful response
        console.log(response);
    })
    .fail((error) => {
        // Handle the error
        console.error(error);
    });

const courseId = 'course_id_here';
deleteCourse(courseId, token)
    .done((response) => {
        // Handle the successful response
        console.log(response);
    })
    .fail((error) => {
        // Handle the error
        console.error(error);
    });
