(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard(this.$el);
    this.bindEvents();
    
  };

  View.prototype.bindEvents = function () {
    var fn = this;
    $(".cell").on("click", function(event){
      var currentTarget = event.currentTarget;
      var $currentTarget = $(currentTarget);
      fn.makeMove($currentTarget);
    });
  };

  View.prototype.makeMove = function ($square) {
    if (!($square.hasClass('xPlayer')) && !($square.hasClass('yPlayer'))) {
      if (this.game.currentPlayer === 'x'){
        $square.addClass("xPlayer");
      } else {
        $square.addClass("yPlayer");
      }
    }
    var pos = $.parseJSON($square.data("cell").pos)
    
    try {
      this.game.playMove(pos)
    }
    catch (MoveError) {

      alert("can't move there!");
    }
    
    if (this.game.isOver()) {
      if (this.game.winner()) {
        alert("Congratulations " + this.game.winner())
      } else {
        alert("Draw")
      }
    }
  };

  View.prototype.setupBoard = function ($el) {
    var htmlString = "";
    _.times(3, function (i){
      htmlString += rowConstructor(i);
    });
    $el.append(htmlString);
  };
  
  var cellConstructor = function (row, col) {
    return "<div data-cell='{ \"pos\": \"[" + row + ", " + col + "]\"}' class=\"cell\"></div>"
  }
  
  var rowConstructor = function(row) {
    var htmlString = "<div class=\"row clearfix\">";
    _.times(3, function (i){
      htmlString += cellConstructor(row, i)
    });
    return htmlString += "</div>";
  }
})();
