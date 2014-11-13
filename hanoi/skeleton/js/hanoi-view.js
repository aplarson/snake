(function (){
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }
  
  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.render();
    this.selectedTower = null;
    
  };
  
  View.prototype.render = function () {
    $("towers").empty();
    var htmlString = "";
    var stacks = this.game.towers;
    stacks.forEach(function (tower, idx){
      htmlString += renderTower(tower, idx);
    });
    this.$el.append(htmlString);
    this.bindEvents();
  };
  
  var renderTower = function (tower, idx) {
    var htmlString = "<div class=\"tower\" id=" + idx + ">"
    var rtower = tower.slice().reverse()
    rtower.forEach(function (el) {
      if (el === 1){
        el = "one";
      } else if (el === 2) {
        el = "two";
      } else {
        el = "three";
      }
      htmlString += "<div class=\"disc\" id=" + el + "></div>"
    })
    return htmlString + "</div>"
  };
  
  View.prototype.bindEvents = function () {
    var fn = this;
    $(".tower").on("click", function(event){
      var currentTarget = event.currentTarget;
      var $currentTarget = $(currentTarget);
      console.log($currentTarget.attr("id"))
      fn.clickTower($currentTarget);
    });
  };
  
  View.prototype.clickTower = function ($tower) {
    if (this.selectedTower) {
      var fromTowerIdx = this.selectedTower.attr("id")
      var toTowerIdx = $tower.attr("id")
      this.game.move(fromTowerIdx, toTowerIdx);
      this.render();
      this.selectedTower = null;
      this.wincheck();
    } else {
      this.selectedTower = $tower;
    }
  };
  
  View.prototype.wincheck = function() {
    if (this.game.isWon()) {
      alert("you win!");
    }
  }
})();