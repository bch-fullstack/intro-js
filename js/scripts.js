(function () {
    var itemClassName = 'slider__photo';
        items = document.getElementsByClassName(itemClassName),
        totalItems = items.length,
        slide = 0;

    // Set event listeners
    function setEventListeners() {
        var next = document.getElementsByClassName('slider__button--next')[0],
            prev = document.getElementsByClassName('slider__button--prev')[0];

        next.addEventListener('click', getNext);
        prev.addEventListener('click', getPrev);
    }

    function getNext() {
        // TODO
    }

    function getPrev(){
        // TODO      
    }

    function initSlider() {
        // setInitialClasses();
        setEventListeners();
        
        // Set moving to false so that the slider becomes interactive
        moving = false;
    }

    initSlider();
})();