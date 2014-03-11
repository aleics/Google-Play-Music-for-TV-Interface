$.ajax({ 
    url:"https://www.google.com/accounts/ClientLogin",
    type:"POST", 
    data:{
        'accountType': 'HOSTED_OR_GOOGLE',
        'Email': 'al.casanovas.m@gmail.com', 
        'Passwd': 'byvmc4fr_27109261', 
        'service': 'sj', 
        'source': 'FHKoeln-tvboxmusicfhkoln-0.0.1'
    },     
    success:function(data) { 
        // handle response
    }, 
    error:function(e) { 
        // handle error 
    }
});


























/* function ClientLogin(){

var auth_url = "https://www.google.com/accounts/ClientLogin";

var email;
var password;
var service;

function ClientLogin(_email, _password, _service){
   this.email = _email;
   this.password = _password;
   this.service = _service;
}
 */











}





















































/* const errors = {
	captchaMissing: 'User entered captcha is missing',
	tokenMissing: 'Login token is missing',
	loginFailed: 'Login failed'
};

const loginURL ='/accounts/ClientLogin';
const host = 'www.google.com';
const captchaRequiredError = 'CaptchaRequired';
service = 'js';

// error messages
const errors = {
	captchaMissing: 'User entered captcha is missing',
	tokenMissing: 'Login token is missing',
	loginFailed: 'Login failed'
};


var GoogleClientLogin = function (conf) {
  this.conf = conf || {};
  this.auths = {};
  this.loginProcessing = false;
};

GoogleClientLogin.prototype.getAuthId = function (){
  return this.auths.Auth;	
};

GoogleClientLogin.prototype.getSID = function () {
  return this.auths.SID;
};

GoogleClientLogin.prototype.getLSID = function () {
  return this.auths.LSID;
};

GoogleClientLogin.prototype.getError = function () {
  return this.auths.Error;
};

GoogleClientLogin.prototype.isCaptchaRequired = function () {
  return this.getError() === captchaRequiredError;
};

GoogleClientLogin.prototype.getCaptchaUrl = function () {
  return this.auths.CaptchaUrl;
};

GoogleClientLogin.prototype.getCaptchaToken = function () {
  return this.auths.CaptchaToken;
};










/* 
const loginURL ='/accounts/ClientLogin';
const host = 'www.google.com';
const captchaRequiredError = 'CaptchaRequired';
service = 'js';

// error messages
const errors = {
	captchaMissing: 'User entered captcha is missing',
	tokenMissing: 'Login token is missing',
	loginFailed: 'Login failed'
}; */


/* function conf(name,password){
	this.name = name;
	this.password = password;
}

function GoogleClientLogin(){
	this.loginProcessing = false;
	

} */



/*var GoogleClientLogin = function (conf) {
  this.conf = conf || {};
  // stores the authentication data
  this.auths = {};
  this.loginProcessing = false;
};*/ */