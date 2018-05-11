document.addEventListener('DOMContentLoaded', function() {
    var portfolioClassNames = {
        'body': 'body',
        'trigger': '.js-portfolio__link',
        'mainImage': '.portfolio__main-image',
        'projectsContainer': '.portfolio__project',
        'projectItem': '.portfolio__project-item',
        'closeButton': '.js-portfolio__close-button',
        'activeClass': 'is-active',
        'showClass': 'show',
        'noScroll': 'noScroll',
        'bgOverlay': '.bg__overlay'
    };

    var portfolioLink = document.querySelectorAll(portfolioClassNames.trigger),
        portfolioMainImage = document.querySelector(portfolioClassNames.mainImage),
        closeButton = document.querySelector(portfolioClassNames.closeButton),
        overlay = document.querySelector(portfolioClassNames.bgOverlay),
        projectItems = document.querySelectorAll(portfolioClassNames.projectItem),
        body = document.querySelector(portfolioClassNames.body),
        projectContainer = document.querySelector(portfolioClassNames.projectsContainer);

    function portfolio() {
        portfolioLink.forEach(function(link) {
            var dataImg = link.getAttribute('data-image'),
                dataProjectItem = link.getAttribute('data-projectitem'),
                projectItem = document.querySelector('.portfolio__' + dataProjectItem);

            if (dataImg !== null) {
                link.addEventListener('mouseover', function() {
                    portfolioMainImage.setAttribute('src', dataImg);
                });
            }

            link.addEventListener('click', function(e) {
                e.preventDefault();
                projectContainer.classList.add(portfolioClassNames.activeClass);

                if (projectItem !== null) {
                    removeProjectItemsActiveClasses();
                    projectItem.classList.add(portfolioClassNames.activeClass);
                } else {
                    projectContainer.innerHTML = 'data-projectitem in de HTML is incorrect!';
                }

                showOverlay();
                disableBodyScroll();
            });
        });

        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            removeProjectItemsActiveClasses();
            hideProjectItems();
            hideOverlay();
            enableBodyScroll();
        });

        overlay.addEventListener('click', function() {
            hideOverlay();
            hideProjectItems();
            enableBodyScroll();
        });
    }

    function removeProjectItemsActiveClasses() {
        projectItems.forEach(function(projectItem) {
            projectItem.classList.remove(portfolioClassNames.activeClass);
        });
    }

    function showOverlay() {
        overlay.classList.add(portfolioClassNames.showClass);
    }

    function hideOverlay() {
        overlay.classList.remove(portfolioClassNames.showClass);
    }

    function disableBodyScroll() {
        body.classList.add(portfolioClassNames.noScroll);
    }

    function enableBodyScroll() {
        body.classList.remove(portfolioClassNames.noScroll);
    }

    function hideProjectItems() {
        projectContainer.classList.remove(portfolioClassNames.activeClass);
    }

    document.onkeydown = function(e) {
        e = e || window.event;
        var ESCAPE_KEYCODE = 27;

        if (e.keyCode === ESCAPE_KEYCODE) {
            if (projectContainer.classList.contains('is-active')) {
                hideProjectItems();
                hideOverlay();
                enableBodyScroll();
            }
        }
    };

    portfolio();
});