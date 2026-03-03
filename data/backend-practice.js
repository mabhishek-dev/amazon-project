// To communicate between frontend and backend, we use HTTP (HTTP = HyperText Transfer Protocol)

// To send HTTP requests in JavaScript, we use the built-inXMLHttpRequest class.

// Create a new HTTP request object
const xhr = new XMLHttpRequest();

// Runs when the response is successfully received
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
/*
Configure the request
First parameter: HTTP method (GET, POST, etc.)
Second parameter: URL (Uniform Resource Locator)
A URL is the internet address of a resource/server
*/
xhr.open("GET", "https://supersimplebackend.dev");

// This overrides the previous request (shown for demonstration)
xhr.open("GET", "https://supersimplebackend.dev/hello");

/*
Example error endpoint
xhr.open("GET", "https://supersimplebackend.dev/error");

Status codes:
4xx -> Client error
5xx -> Server error

Common HTTP methods:
GET -> Retrieve data
POST -> Send data
PUT -> Update data
DELETE -> Remove data
*/

// Send the request to the backend
xhr.send();

/*
Note:
xhr.response is undefined immediately after send() because the request is asynchronous.
We use an event listener ("load") to handle the response.

When we send a request, the backend sends back a response.
This is called the Request–Response Cycle: 1 request -> 1 response

The backend exposes endpoints like:
GET /
GET /hello
These endpoints together form an API
(API = Application Programming Interface)

The backend can respond with different formats:
text, JSON, images, etc.
*/
