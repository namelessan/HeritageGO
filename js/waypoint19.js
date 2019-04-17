$(document).ready(function () {
  var langs = window.navigator.languages;
  for (i = 1; i <= langs.length; i+=2) {
    var plang = "<option class='dropdown-language' id='"
                + langs[i]
                + "'"
                + "onclick=''"
                + ">"
                + alpha1_alpha3[langs[i]]
                + "</option>";
    $("#myDropdown").append(plang);
  }
  console.log(langs);
});

window.onclick = function(event) {
  if (!event.target.matches('.fa-language')) {
    let sections = $("#main-content").children();
    for(let i = 0; i < sections.length; i++){
      let idSection = "section-" + parseInt(i);
      let titlePart = "#" + idSection + " > .post > .post__title";
      $(titlePart + " > .post__title__information > .post__title__information__caption > div > #myDropdown").css("display", "none");
      $(titlePart + " > .post__title__information > .post__title__information__caption > div > #triggerDropdown").css("animation", "shake 1s linear 0s infinite forwards");
    }
  }
  var x = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  if (x.matches('.section')) {
    $("#" + x.id + "> .post > .post__title > .post__title__information > .post__title__information__caption > span").replaceWith(
      function () {return $('<input/>', { value: this.innerHTML });}
    );
  }
}
