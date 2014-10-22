    $(function() {
      var conn = null;

      var message_default = "<li>\
                            <a href=\"#\">\
                              <img src=\"http://"+ window.location.host +"/static/folder_static/img/face_default.jpg\" alt=\"\">\
                            </a>\
                            <div class=\"text\">\
                              <strong>Usuário logado:</strong>\
                              <span>--:-- minutos atrás</span>\
                              <br>";


      function log(msg) {
        var control = $('#log');
        control.html(control.html() + message_default + msg + '</div>\n </li>');
        $('.box').scrollTop($('.box').scrollTop() + 1000);
      }

      function connect() {
        disconnect();

       /* var transports = $('#protocols input:checked').map(function(){
            return $(this).attr('id');
        }).get();*/

      var transports = ['websocket', 'xdr-streaming', 'xhr-streaming', 'iframe-eventsource',
                       'iframe-htmlfile', 'xdr-polling', 'xhr-polling', 'iframe-xhr-polling', 'jsonp-polling']

        conn = new SockJS('http://192.168.0.100:8089/__sockjs__', transports, {debug: true});

        //log('Connecting...');
        status('Conectando...');
        conn.onopen = function() {
          //log('Connected.');
          update_ui();
        };

        conn.onmessage = function(e) {
          //log('Received: ' + e.data);
          log(e.data);
        };

        conn.onclose = function() {
          //log('Disconnected.');
          status('Disconectado');
          conn = null;
          update_ui();
        };
      }

      function disconnect() {
        if (conn != null) {
          //log('Disconnecting...');
          status('Disconectando');

          conn.close();
          conn = null;

          update_ui();
        }
      }

      function update_ui() {
        var msg = '';

        if (conn == null || conn.readyState != SockJS.OPEN) {
          $('#status').text('Disconectado').removeClass("btn-success").addClass("btn-inverse");;
          $('#connect').text('Ficar Online');
        } else {
          //$('#status').text('Conectado (' + conn.protocol + ')').removeClass("btn-inverse").addClass("btn btn-success");
          $('#status').text('Conectado').removeClass("btn-inverse").addClass("btn btn-success");
          $('#connect').text('Ficar Offline');
        }
      }

      function status(StatusMessage){
        $("#status").text(StatusMessage);
      }

      $('#connect').click(function() {
        if (conn == null) {
          connect();
        } else {
          disconnect();
        }

        update_ui();
        return false;
      });

      $('#enviar').click(function() {
        var text = $('#text').val();
        if(text != ""){
          //log('Sending: ' + text);
          conn.send(text);
          $('#text').val('').focus();
        }
        $('#text').val('').focus();
        return false;
      });


});// fim da function



/*
    $('#text').keyup(function(event) {
      if (event.keyCode == '13') {
         event.preventDefault();
         //alert("blablalb");
         var text = $('#text').val();
          if(text != ""){
            log('Sending: ' + text);
            conn.send(text);
            $('#text').val('').focus();
          }
          $('#text').val('').focus();
          return false;
        }
    });

    $('#text').keydown(function(event) {
      if (event.keyCode == '13') {
         event.preventDefault();
         //return false;
         //alert("blablalb");
        }
    });
*/
