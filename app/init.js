var constructor = new Constructor({
    holder : document.body.querySelector('.constructor-holder'),
    layout : document.body.querySelector('script.layout-tpl').innerHTML,
    dragElements : document.body.querySelectorAll('[interactive-element]')
});


constructor
    .on('drop-area:drop', (e, data) => {
        var type = data.dist.getAttribute('role');
        constructor.appendHTML(data.dist, TEMPLATES[type], { id : 2, name : 'Artem' })
    });

constructor.on('block:dragstart', (e, data) => {
    data.src.style.opacity = '0.5'
});

constructor.on('block:dragend', (e, data) => {
    data.src.style.opacity = ''
});

constructor.on('constructor:load', (e, data) => {
constructor.activateMode('drag')
});
constructor.on('drop-area:drag-enter', (e, data) => {});
constructor.on('drop-area:drag-leave', (e, data) => {});
constructor.on('content:edited', (e, data) => {});


document.body.querySelector('.add-items').onclick = () => {


    document.body.querySelector('.list-group').innerHTML += `
        <li class="list-group-item" interactive-element draggable="true">
            <div>${Date.now()}</div>
        </li>
     `;

    constructor.addDraggableItems(document.body.querySelectorAll('[interactive-element]'))
};


const TEMPLATES = {
    sidebar : `
        <p class="lead">Shop Name</p>
        <div class="list-group">
            {% for item in menu%}
                <a href="#" class="list-group-item active">{{ item.name }}</a>
            {% endfor %}
            <!--<a href="#" class="list-group-item active">Category 1</a>-->
            <!--<a href="#" class="list-group-item">Category 2</a>-->
            <!--<a href="#" class="list-group-item">Category 3</a>-->
        </div>
    `,
    content : `
        <div class="thumbnail">
            <img class="img-responsive" src="http://placehold.it/800x300" alt="">
            <div class="caption-full">
                <h4 class="pull-right">$24.99</h4>
                <h4><a href="#">Product Name</a>
                </h4>
                <p>See more snippets like these online store reviews at <a target="_blank" href="http://bootsnipp.com">Bootsnipp - http://bootsnipp.com</a>.</p>
                <p>Want to make these reviews work? Check out
                    <strong><a href="http://maxoffsky.com/code-blog/laravel-shop-tutorial-1-building-a-review-system/">this building a review system tutorial</a>
                    </strong>over at maxoffsky.com!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
            <div class="ratings">
                <p class="pull-right">3 reviews</p>
                <p>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star-empty"></span>
                    4.0 stars
                </p>
            </div>
        </div>

        <div class="well">

            <div class="text-right">
                <a class="btn btn-success">Leave a Review</a>
            </div>

            <hr>

            <div class="row">
                <div class="col-md-12">
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star-empty"></span>
                    Anonymous
                    <span class="pull-right">10 days ago</span>
                    <p>This product was great in terms of quality. I would definitely buy another!</p>
                </div>
            </div>

            <hr>

            <div class="row">
                <div class="col-md-12">
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star-empty"></span>
                    Anonymous
                    <span class="pull-right">12 days ago</span>
                    <p>I've alredy ordered another one!</p>
                </div>
            </div>

            <hr>

            <div class="row">
                <div class="col-md-12">
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star-empty"></span>
                    Anonymous
                    <span class="pull-right">15 days ago</span>
                    <p>I've seen some better than this, but not at this price. I definitely recommend this item.</p>
                </div>
            </div>

        </div>

    `,
    footer : `
        <div class="row">
    <div class="col-lg-12">
        <p>Copyright © Your Website 2014</p>
    </div>
</div>
    `
}