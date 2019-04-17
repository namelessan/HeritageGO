$(document).ready(function () {
   $('#lock-icon').click(function () {
      if($('#password').prop("type") == "password"){
        $('#password').prop("type", "text");
        $('#lock-icon').prop("class", "fas fa-unlock");
      }else{
        $('#password').prop("type", "password");
        $('#lock-icon').prop("class", "fas fa-lock");
      }
    })
});
