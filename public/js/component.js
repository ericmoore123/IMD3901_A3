AFRAME.registerComponent('colorchange', {
    schema: {
        //Logs and def values
    },

    init: function () {
        let box = document.querySelector('#block');
        box.addEventListener('click', () => {
            console.log('Click')
            box.setAttribute('material', 'color', 'blue')
        })
    },

});
