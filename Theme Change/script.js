document.getElementById('colorSelector').addEventListener('change', function () {
    
    var selectedColor = this.value;

    
    var buttons = document.getElementsByTagName('button');

    
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = selectedColor;
    }
  });