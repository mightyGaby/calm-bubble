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
  
  // Set initial random position for bubble
  var $bubble = $('.bubble');
  var initialPos = makeNewPosition($('#background-wrap'));
  $bubble.css({
    'top': initialPos[0] + 'px',
    'left': initialPos[1] + 'px'
  });
  
  $bubble.removeClass('hidden');
  animateDiv();
}

function explode(e){
  var $bubble = $('.bubble');
  var bubblePos = $bubble.offset();
  var bubbleCenterX = bubblePos.left + $bubble.width() / 2;
  var bubbleCenterY = bubblePos.top + $bubble.height() / 2;
  
  // Create confetti particles
  createConfetti(bubbleCenterX, bubbleCenterY);
  
  // Hide bubble
  $bubble.hide();
  
  // Display quote in center after confetti animation (1.5s delay)
  setTimeout(function() {
    displayQuote();
  }, 1500);
}

function displayQuote(){
  var container = $('#quote'),
      quotes = ["this too shall pass", "you're a champion", "be kind to yourself", "you are in control", "be free!"];
  var rand = Math.floor(Math.random()*(quotes.length-0)+0)
  container.text(quotes[rand]);
  
  // Remove previous animation class if exists
  container.removeClass('quote-visible');
  
  // Center quote on page
  container.css({
    'position': 'fixed',
    'left': '50%',
    'top': '50%',
    'transform': 'translate(-50%, -60%)',
    'z-index': 10000,
    'text-align': 'center',
    'width': 'auto',
    'max-width': '90%',
    'margin': '0'
  });
  
  container.show();
  
  // Trigger fade-in and bounce animation
  setTimeout(function() {
    container.addClass('quote-visible');
  }, 10);
  
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

function createConfetti(x, y) {
  var colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894'];
  var particleCount = 50;
  
  // Remove any existing confetti
  $('.confetti-particle').remove();
  
  for (var i = 0; i < particleCount; i++) {
    var particle = $('<div class="confetti-particle"></div>');
    var color = colors[Math.floor(Math.random() * colors.length)];
    var size = Math.random() * 8 + 4;
    var angle = Math.random() * Math.PI * 2;
    var velocity = Math.random() * 400 + 200;
    var rotation = Math.random() * 720 - 360; // Random rotation between -360 and 360
    var endX = Math.cos(angle) * velocity;
    var endY = Math.sin(angle) * velocity + (Math.random() * 300); // Add gravity effect
    
    particle.css({
      'background-color': color,
      'left': x + 'px',
      'top': y + 'px',
      'width': size + 'px',
      'height': size + 'px',
      'transform': 'translate(0, 0) rotate(0deg)',
      'opacity': 1
    });
    
    $('body').append(particle);
    
    // Force reflow to ensure initial state is rendered
    particle[0].offsetHeight;
    
    // Animate particle using CSS transform for better performance
    particle.css({
      'transform': 'translate(' + endX + 'px, ' + endY + 'px) rotate(' + rotation + 'deg)',
      'opacity': 0
    });
    
    // Remove particle after animation
    setTimeout(function() {
      particle.remove();
    }, 1500);
  }
}
