/*

    Index
    Verify Code Integrity
    Suggestions for stopping bots...
*/
/*
    Publisher: SkidLlama
    Check DOM origin of a script via stracktrace.
*/

const { version } = require("os");

var extern = function(){
	(()=>{
		try{throw new Error('');}catch(s){
			while(+!(s.stack.toString().match('script.js'))){
				console.log('You fell for the trap :)');
				break;
			}
		}
	})();
}();

/*
    Publisher: SkidLlama
    Check whether some common hack hook are present.
*/

(function(){
    const isNat=(f)=>{
        return !!f && (typeof f).toLowerCase() == 'function' 
        && (f === Function.prototype 
        || /^\s*function\s*(\b[a-z$_][a-z0-9$_]*\b)*\s*\((|([a-z$_][a-z0-9$_]*)(\s*,[a-z$_][a-z0-9$_]*)*)\)\s*{\s*\[native code\]\s*}\s*$/i.test(String(f)));
    };
    if(isNat(Array.prototype.push) 
    && isNat(WebSocket.prototype.send) 
    && isNat(WebSocket)
    ){}else{console.log('Caught ya :)')}
})()

/*
    Publisher: SkidLlama
    Check whether they have tried inject a big script
*/

(function(){
    let observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (let node of mutation.addedNodes) {
                if(node.tagName==='SCRIPT'){
                    if(node.innerHTML.toString().length > 7300000){
                        console.log('Found ya :)');
                    }
                }
            }
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    })
})();

/*
    Publisher: SkidLlama
    Instead of loading a script through a JS tag
*/

(function(){
    const request = url => fetch(url).then(res => res.text());
    const injectInline = (data) => {
        let s = document.createElement('script');
        s.type = 'text/javascript';
        s.innerText = data;
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    (async function() {
        let script = await request(`https://shellshock.io/src/shellshock.min.js`);
        injectInline(attemptPatch(script))
    })();
})();

/*
    Publisher: SkidLlama
    Anti Beautify Script
*/

// beautified version (will trigger a crash)

var ﾟΘﾟ = function() {
    var ﾟωﾟ = !![];
    return function(ﾟДﾟﾉ, ﾟΘﾟﾉ) {
        var ﾟωﾟﾉ = ﾟωﾟ ? function() {
            if (ﾟΘﾟﾉ) {
                var ﾟДﾟ = ﾟΘﾟﾉ[atob('YXBwbHk=')](ﾟДﾟﾉ, arguments);
                ﾟΘﾟﾉ = null;
                return ﾟДﾟ;
            }
        } : function() {};
        ﾟωﾟ = ![];
        return ﾟωﾟﾉ;
    };
}();
var ﾟｰﾟﾉ = ﾟΘﾟ(this, function() {
    var ﾟｰﾟ = function() {
        var ﾟεﾟ = ﾟｰﾟ[atob('Y29uc3RydWN0b3I=')](atob('cmV0dXJuIC8iICsgdGhpcyArICIv'))()[atob('Y29uc3RydWN0b3I=')](atob('XihbXiBdKyggK1teIF0rKSspK1teIF19'));
        return !ﾟεﾟ[atob('dGVzdA==')](ﾟｰﾟﾉ);
    };
    return ﾟｰﾟ();
});
ﾟｰﾟﾉ();

//minfied version (works)

var ﾟΘﾟ=function(){var ﾟωﾟ=!![];return function(ﾟДﾟﾉ,ﾟΘﾟﾉ){var ﾟωﾟﾉ=ﾟωﾟ?function(){if(ﾟΘﾟﾉ){var ﾟДﾟ=ﾟΘﾟﾉ[atob('YXBwbHk=')](ﾟДﾟﾉ,arguments);ﾟΘﾟﾉ=null;return ﾟДﾟ;}}:function(){};ﾟωﾟ=![];return ﾟωﾟﾉ;};}();var ﾟｰﾟﾉ=ﾟΘﾟ(this,function(){var ﾟｰﾟ=function(){var ﾟεﾟ=ﾟｰﾟ[atob('Y29uc3RydWN0b3I=')](atob('cmV0dXJuIC8iICsgdGhpcyArICIv'))()[atob('Y29uc3RydWN0b3I=')](atob('XihbXiBdKyggK1teIF0rKSspK1teIF19'));return!ﾟεﾟ[atob('dGVzdA==')](ﾟｰﾟﾉ);};return ﾟｰﾟ();});ﾟｰﾟﾉ();

/*
    ANTI BOT SCRIPTS
    CODE TO STOP BOTS
*/

//CLIENT SIDE

(function(){
    let encode=(str, key)=>{
        key = 255 & key;
        return str.split('').reduce((arr, element) => {
            let tmp = (element.charCodeAt(0) ^ key).toString('36');
            arr.push(tmp.length === 1 ? '00'+tmp : tmp.length === 2 ? '0'+tmp : tmp.length > 3 ? new Error('Too big') : tmp)
            return arr;
        }, []).join('');
    }
    version = 52;
    let length = 5;
    let AUTH_TOKEN = encode((version)+(Math.random().toString(36).substring(2, 2+length)), version);
})

//SERVER SIDE

(function(){
    let decode=(str, key)=>{
        let data = '';
        for(var i = 0; i < str.length; i+=3){
            data += String.fromCharCode(parseInt(str[i] + str[i+1] + str[i+2], 36)^key);
        };
        console.log(data);
        return data;
    }

    let isVALID=(str, length, version)=>{
        if(Number(str.substr(0,+version.toString().length))!=version){return false};
        console.log('passed 1')
        if(str.length !== length + version.toString().length){return false};
        console.log('passed 2')
        if(str.match(/[A-Z]/)){return false};
        console.log('passed 3')
        if(!str.match(version)){return false};
        console.log('passed 3')
        if(!str.match(/^[a-z0-9]+$/i)){return false}
        console.log('passed 4')
        return true;
    }

    version = 52;
    let length = 5;
    let AUTH_TOKEN = decode("00100602g00c02j02f024", version);
    if(isVALID(AUTH_TOKEN, length, version)){
        console.log('You are good')
    }
    
})
