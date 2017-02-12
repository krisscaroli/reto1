
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCT37RWc5W58Dy673xRdej9QrGXwk0fVbM",
    authDomain: "fir-869c4.firebaseapp.com",
    databaseURL: "https://fir-869c4.firebaseio.com",
    storageBucket: "fir-869c4.appspot.com",
    messagingSenderId: "904323929227"
  };
  firebase.initializeApp(config);


var led = document.getElementById('led'),
      els = led.childNodes,
    uid=0, size=15, w=0, h=0, row=0, col=0,
    arr_lights=[];

var hh = document.getElementById('time-hh'),
      hx = document.getElementById('time-h'),
      mm = document.getElementById('time-mm'),
      mx = document.getElementById('time-m'),
      ss = document.getElementById('time-ss'),
      sx = document.getElementById('time-s');


for(var k=0, len=els.length; k<len; k++){
  if(els[k].nodeType!=1)
    continue;
    w = parseInt(els[k].clientWidth);
  h = parseInt(els[k].clientHeight);
  row   = parseInt(h/size);
    col = parseInt(w/size);

  var t, l, sum=0;
  for(var i=0; i<row; i++){
    for(var j=0; j<col; j++){
      uid++;
      t = size*i;
      l = size*j;
      arr_lights.push( '<div uid="'+uid+'" id="l-'+uid+'" class="light row-'+i+' col-'+j+'" style="top:'+t+'px;left:'+l+'px"></div>');
    }
  }
  els[k].innerHTML = arr_lights.join("");
  arr_lights=[];
}
   var now = new Date(),
        time_hh = parseInt(now.getHours()),
          time_mm = parseInt(now.getMinutes()),
            time_ss = parseInt(now.getSeconds());

setInterval(function(){
 
    hh.className = "block-digital num-"+parseInt(time_hh/10);
    hx.className = "block-digital num-"+parseInt(time_hh%10);
    mm.className = "block-digital num-"+parseInt(time_mm/10);
    mx.className = "block-digital num-"+parseInt(time_mm%10);
    ss.className = "block-digital num-"+parseInt(time_ss/10);
    sx.className = "block-digital num-"+parseInt(time_ss%10);

}, 1000);

function getHoram(){
  return $("#hl").val();
}
function getMinutom(){
  return $("#ml").val();
}

function getUsuario(){
  return $('#usuario').val();
}



function getHour(){
  return hh.className.slice(-1)+hx.className.slice(-1);
}
function getMinute(){
  return mm.className.slice(-1)+mx.className.slice(-1);
}
function getSecond(){
  return ss.className.slice(-1)+sx.className.slice(-1);
}
function getMessage(){

  var mensaje;
  if ( getHour()== getHoram()&& (getMinute()<=15 && getMinute()>=0)) {
mensaje="Llegaste a la hora";
  }else{
    if ((getHour()== getHoram()) && getMinute() >15){



    }else{

      if (getHour()< getHoram()) {
mensaje="Has madrugado, te mereces un premio"
      }else{
mensaje="Has llegado tarde";
}
    }
  }
  return mensaje;
}


function storeMessage(message){
  /*IMPRIMIR CONSOLA
  console.log(origin+"-"+destiny+"-"+message);
  console.log(getHour()+"-"+getMinute()+"-"+getSecond());
*/
firebase.database().ref(
  'asistencia/'+getUsuario()).set({
  entrada:{
    hora:getHoram(),
    minuto:getMinutom()

  },
    llegada:{
hora:getHour(),
    minuto:getMinute()
    },
    mensaje:message
  });


}
 function loadAutoComplete (data) {
    $('#lista').autocomplete(
    {
      source: data,
    });
  }
  function getAutoCompleteElements(substring){
    var val=substring;
    var i=0;
    var names =[];
    firebase.database().ref('asistencia/').on('value',function(snapshot) {
      for(key in snapshot.val()){
        if (key.indexOf(val)>-1) {
          if (i<5) {
            names.push(key);
            i++;
          }
        }
      }
      loadAutoComplete(names);
    });
  }
function setDataIntoHTML (data) {
    

    $("#mensaje").val(data.mensaje);
    $("#horl").val(data.llegada.hora);
    $('#minl').val(data.llegada.minuto);
  }
function loadForm (data) {
    firebase.database().ref('asistencia/'+data).on('value',function (snapshot) {
      var data=snapshot.val();
      setDataIntoHTML(data);

    });
  }
$(document).ready( function(){


  $('#marcar').click(function(){
    if($('#usuario').val()!=""){
    
      storeMessage(getMessage());
      alert("Registro exitoso");
}else{
   alert("Llene el campo usuario");
}
  });


  $('#lista').on('keyup',function(e){
    
      if (e.which==13) {
        loadForm($(this).val());
      } else {
        getAutoCompleteElements($(this).val());
      }

    
    });

});