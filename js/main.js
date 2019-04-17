function fetchData(options) {
    return mHeritageGoService.getPhotos(options);
}

function renderPhotos(options, photos){
    for (let i in photos) {
        let photoId = photos[i];

        let idSection = "section-" + (options.offset + parseInt(i));
        $("#sample_section").clone().prop({
            "hidden": false,
            "id": idSection
        }).appendTo(["#main-content", "#main-content-blurred"]);
        mHeritageGoService.getPhoto(photoId).then(res => {
            let titlePart = "#" + idSection + " > .post > .post__title";
            let imagePart = "#" + idSection + " > .post > .post__image";

            $(titlePart + " > .post__title__avatar").prop("src", "http:" + res.account.picture_url);
            $(titlePart + " > .post__title__information > .post__title__information__caption > span").text(res.title[0].content);
            $(titlePart + " > .post__title__information > .post__title__information__location > #location").text(res.area_name);
            $(titlePart + " > .post__title__information > .post__title__information__location > #date").text(parseInt(res.creation_time));

            $(imagePart + " > img").prop("src", "http:" + res.image_url + "?size=large");

            $(titlePart + " > .post__title__information > .post__title__information__caption > div > #triggerDropdown").click(function(){
              if($(titlePart + " > .post__title__information > .post__title__information__caption > div > #myDropdown").css("display") == "none"){
                $(titlePart + " > .post__title__information > .post__title__information__caption > div > #myDropdown").css("display", "block");

                // Stop shaking when language icon is clicked
                $(titlePart + " > .post__title__information > .post__title__information__caption > div > #triggerDropdown").css("animation", "none");

              }else{
                $(titlePart + " > .post__title__information > .post__title__information__caption > div > #myDropdown").css("display", "none");

                $(titlePart + " > .post__title__information > .post__title__information__caption > div > #triggerDropdown").css("animation", "shake 1s linear 0s infinite forwards");
              }
            })

        }).catch(error => {
            console.log(error);
        });
    }
}

function canLoadMore(options){
    let one = document.getElementById("section-" + (options.offset));
    let two = document.getElementById("section-" + (options.offset + 1));
    if(one && two){
        return true;
    }else{
        return false;
    }
}

$(document).ready(function () {
    // Fetch list of photos here and use Jquery to render it dynamically.
    let loadFinish = true;
    let options = {offset: 0, limit: 2};
    let api = fetchData(options);
    api.then(res => {
        renderPhotos(options, res);
    });
    $(window).scroll(function () {
        if($(window).scrollTop() == $(document).height() - $(window).height() && $(window).scrollTop() != 0 && canLoadMore(options)){
            options.offset += options.limit;
            api = fetchData(options);
            api.then(res => {
                renderPhotos(options, res);
            })
        }
    });
    $(document).scroll(function(){
      var scroll = $(this).scrollTop();
      $('.blurred').css({
        '-webkit-transform' : 'translateY(-'+scroll+'px)',
        'transform' : 'translateY(-'+scroll+'px)'
      });
    });
});

// Hide the dropdown menu when clinking outside the menu
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
}
