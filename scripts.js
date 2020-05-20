// TO DO:
// stop animation when hidden
// add reset button
// soothing message when bubble pops

$(document).ready(function() {
    setContainerSize('#background-wrap');
    if (!("autofocus" in document.createElement("textarea"))) {
      document.getElementById("element").focus();
    }
});

function encapsulate(){
  var fear = $('textarea');
  var val = fear.val() ? fear.val() : "Your Anxieties & Fears";
  $('.fear').text(val);
  fear.val('');
  hideContent();
  $('.bubble').removeClass('hidden');
  animateDiv();
}

function explode(e){
  $('.bubble').hide();
  displayQuote();
}

function displayQuote(){
  var container = $('#quote'),
      quotes = ["this too shall pass", "you're a champion", "be kind to yourself", "you are in control", "be free!"];
  var rand = Math.floor(Math.random()*(quotes.length-0)+0)
  container.text(quotes[rand]);
  container.show();
  console.log(quotes[rand]);
}
function hideContent () {
  $('.content > p, button, textarea').hide()
}

function setContainerSize(container) {
  var w = window.innerWidth,
      h = window.innerHeight;
  $(container).width(w).height(h);
}

function makeNewPosition($container) {

    // Get viewport dimensions (remove the dimension of the div)
    $container = ($container || $(window))
    var h = $container.height() - 50;
    var w = $container.width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateDiv() {
    var $target = $('.bubble');
    var newq = makeNewPosition($target.parent()),
        oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $('.bubble').animate({
        top: newq[0],
        left: newq[1]
    }, speed, function() {
        animateDiv();
    });

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.1;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;

}
