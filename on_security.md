Thinking out loud on security

Assume VueJS for frontend, Node.js with express for our serving REST API endpoint, with sqlite as our db and bcrypt as our password hash function.

----
Brute-force log-in attempt on user login. This means the attacker either has access to the form or knows the API endpoint. Either possibilities are very easy to achieve. In this case, our solution is to rate-limit the API endpoint using AWS cloudfront. If we implement our own rate-limiter such as express-limiter, this will limit the exposure that the db has with the login attempt, but I'm not sure if our server is still vulnerable to going down. Rate limit should be done for every [request](https://github.com/nfriedly/express-rate-limit).

----

OS Compromise. For sqlite, we can assume that the attacker has access to all the db content in case of OS compromise. We can employ column-specific encryption, but if the passphrase is also stored in the OS, then none of the encryption is valid. Other things that can leak information besides the db itself are the db logs.

----

SQL Injection. An attacker can make a request so that the sql query returns more information than they are authorized. If userID=1 is only entitled to his own data given by `"SELECT * FROM user WHERE userId = "+userId`. We would hit an API endpoint like `api/user/1`  where `userId=1`. If the attacker knew that's how query is constructed, he can simply hit an endpoint `api/user/1"%20or%20'1'%20=%20'1'"` which would return true for all data in the table, because the resulting query is `SELECT * FROM user WHERE userId = 1 or '1'='1'`. This can be mitigated using [prepared statements](https://en.wikipedia.org/wiki/Prepared_statement). It would be something like this:

```js
let sql = 'SELECT * FROM user WHERE userId = ?'
db.get(sql, [userId], (err, row)=>{
    if (err) {
        //check error
    }
    else{
        //send data contained in row object
    }
})

```

----

Cross-site scripting (XSS). A simple XSS example can be found [here](https://codepen.io/vouill/pen/WjVMjL) For our frontend VueJS, we can be safe as long as we're careful when using v-html, which is a direct injection of html.

----
