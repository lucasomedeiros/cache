
const express = require('express')
const redis = require('redis')
const cache = redis.createClient()
const app = express()
const port = 3000




cache.on('connect', () => {
console.log('Redis is ready');
});
cache.on('error', (e) => {
console.log('Redis error', e);
});



app.get('/fat/:x1', (req, res) => {
    
    var STR = "fat" + req.params.x1;
	
	
	cache.get(STR, function(err,reply){
		 
		 if (reply){
		 	 console.log("cache")
			 res.send("numero ja cohecido: " + reply)
			
      	}	 

		else{
			console.log("novo")
			// para valores negativos
            
            if(req.params.x1<0) {

              res.send('ERRO! Valor deve ser maior ou igual a zero');
      
            // para valor = 0  ou igual a 1
            } 
            else if ( (req.params.x1 == 0) || (req.params.x1 == 1) ) {

              cache.set(STR, '1', function (err, reply){
                   if (err){
						res.send('ERROR')
					}
					else{
						res.send('OK')
		     	 	}
		     	})
            } 
            else {

                var acumula = 1;
                for(x=req.params.x1;x>1;x--) {
                 	acumula = acumula * x;
                 	}

                cache.set(STR, acumula, function (err, reply){
                	if (err){
						res.send('ERROR')
					}
					else{
						res.send('resultado calculado: ' + acumula)
		     	    }
			     })
        	}
            
        }
			
			
	})
		
		
	
})

app.listen(3000)