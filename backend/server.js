//SETTING UP EXPRESS APP REQUIRES CREATING AN INSTANCE OF EXPRESS
const express = require('express') /// FIRST IMPORT EXPRESS USINF COMMONJS
const path = require('path');
const cors = require('cors');
const app = express();
const port = 1996;

//SETUP FIRST ENDPOINT 
/*
    AN ENDPOINT IS THE COMBINATION OF PATH, HTTP METHOD AND THE ROUTE METHOD( A CALLBACK FUNCTION THAT IS INVOKED WHEN A REQUEST URL MATCHES THE ROUTE PATH AND HTTP METHOD)

    EXAMPLE: APP.[http-method]('route-path', (req, res)=> callback-func)

    you can use multiple callback funcs on one route but remember to pass 'next' as argument of each callback (except for the last callback) and invoke it 'next()' to hand over control to the next callback
    
    you can pass callbacks in for of an array 
    example: app.get('/', [func1, func2])

    or pass them directly in
    example: app.get('/', (req, res, next)=>{
        //do something
        next();
    }, (req, res) =>{
        //do something
    })

    NOTE: next('route') only works in middlewares to pass control to the route callback and bypass the remaining middleware functions
    
    RESPONSE METHODS
    res.end(); end the response process
    res.json({data goes here}); send a JSON
    res.redirect([status,] path); to redirect request
    res.render(view [, locals] [, callback]); Render a view template.
    res.send([body]); sends response of various types
    res.download(path [, filename] [, options] [, fn (incase of error)]) prompt a file to be download 
    res.sendFile(path [, options] [, fn]) send file as an octet stream (binary (like images , videos and audios) data with no specific format)
    res.redirect([status,] path) Set the response status code and send its string representation as the response body.
    res.cookie('cook-name', 'value', {options})
    res.status(code) //sends response code
    res.append(field [, value]) appends information to response header

    res.route('/path') // lest you chain various methods of the path
    example: res.route('/').get((req,res)=> {
            //do something
        }).post((req, res)=>{
            //do something
        })
*/

const contacts = []
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS), allowing the server to accept requests from different domains. 
// By default, browsers block cross-origin requests for security reasons, but CORS headers let the server specify which origins are allowed.


const verifyEmail = (req, res, next)=>{
    const {email} = req.body;

    /// always add return to response to kill  process
    if(!emailRegex.test(email)) return res.status(400).json({success : false, message : `enter valid email `});
    if(contacts.includes(email)) return res.status(409).json({success : false, message : 'email already exist'});
    next()

}


const addToDataBase = (req, res) => {
    const {email} = req.body;

    contacts.push(email);
    return res.status(201).download( path.join(__dirname,'/public/NFT.png'),err => {

        if(err){
            console.log(err.message);
            res.status(404).json({success : false, message : 'something went wrong'})
        }
    })

}

// app.route('/contacts/:email').get((req,res)=>{
//     const {email} = req.params;

//     if(!emailRegex.test(email)) return res.status(404).json({success : false, message : 'enter valid email'});
//     if(contacts.includes(email)) return res.status(200).json({success : true, message : 'email exist'});
//     return res.status(404).json({success : false, message : 'email not found'});
// })

app.post('/contacts', express.json(), [verifyEmail, addToDataBase]);


//serves static files
console.log(path.join(__dirname, '../frontend'));

app.use(express.static(path.join(__dirname, '../frontend')))
app.get('/', (req, res)=>{
    return res.sendFile(path.join(__dirname, '../frontend','index,html')); // this serves frontend when user hits http://localhost:1996

})

app.listen(port, ()=> console.log(`listening to ${port}...`))

///response status codes 
/*
    ## 2XX: success
    200 Ok (fetching data )
    201 created (creating or storing a user)
    204 No content ( for delete method)

    ## 3XX: Redirection
    301 Moved Permanently (The resource has been permanently moved to a new URL)
    302 Found (or Temporary Redirect) The resource has temporarily moved to a new URL, but the original URL should still be used for future requests.
    304 Not Modified ( The resource has not changed since the last request (used for caching purposes).)

    ## 4XX: Client errors
    400 Bad Request (The server could not understand the request due to invalid syntax or parameters.)
    401 Unauthorized (The client is not authenticated. Authorization credentials (like a token) are required.)
    403 Forbidden (The client is authenticated but does not have permission to access the requested resource.)
    404 Not Found (The requested resource could not be found on the server.)
    429 Too Many Requests (The client has sent too many requests in a short time (rate-limiting).)
    409 Conflict


    ## 5XX: Server errors
    500 Internal Server Error
    A generic error message for unexpected server issues.

    502 Bad Gateway
    The server received an invalid response from an upstream server.

    503 Service Unavailable
    The server is temporarily unable to handle the request (e.g., maintenance or overload).

    504 Gateway Timeout
    The server did not receive a timely response from an upstream server


*/