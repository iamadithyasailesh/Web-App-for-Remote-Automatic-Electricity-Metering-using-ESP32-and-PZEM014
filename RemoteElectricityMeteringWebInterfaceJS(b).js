var keepAlive = false;


 var info = document.querySelectorAll(".main-header-card-info");
var val = [];

var remoteserver="192.168.10.40"; //IP of ESP32
port="80";




var socket1=null;


function check(){
    if(!socket1 || socket1.readyState == 3) InitSocket1();
	 
	   
  }
  
function webSockKeepAlive() 
{
    
	
	 if (keepAlive) {
      socket1.send(''); 
	    }
  }
  

function init()
{   
	InitSocket1();
	setInterval(check, 60000);
	setInterval(webSockKeepAlive, 10000);
	
}



function InitSocket1() 
{
	console.log('Init : ');
	
   
	try {
		socket1 = new WebSocket("ws:"+remoteserver+":"+port);
      console.log('WebSocket status: '+socket1.readyState);
       
	    socket1.onopen    = function(msg)
             { 
               keepAlive = true;
                       			 
		       console.log("Connected :"+this.readyState); 
			  
		        
             };

        socket1.onmessage = function(msg)
           { 
                         				
            
	            val = msg.data.split(';');
                   for(var i=0;i<4;i++)
				  {
					info[i].innerHTML = val[i];
					console.log("value"+i+":"+val[i]);
				  }
              
			
			
		   };

	socket1.onclose   = function(msg)
           { 
		     
		    console.log("Disconnected "+this.readyState); 
           
		   };
        
       
 }
	  catch(ex){ 
		       console.log(ex); 
	           }
	
}







function QuitSocket()
	{
	       if (socket1 != null)
        {
		console.log("Close Socket1");
		socket1.close();
		socket1=null;
	    }
       }

