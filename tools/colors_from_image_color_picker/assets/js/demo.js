// Auto update layout
(function() {
    window.layoutHelpers.setAutoUpdate(true);
    // window.attachMaterialRippleOnLoad();
})();

// Collapse menu
(function() {
    if ($('#layout-sidenav').hasClass('sidenav-horizontal') || window.layoutHelpers.isSmallScreen()) {
        return;
    }

    try {
        window.layoutHelpers.setCollapsed(
            localStorage.getItem('layoutCollapsed') === 'true',
            false
        );
    } catch (e) {}
})();

$(function() {
    // Initialize sidenav
    $('#layout-sidenav').each(function() {
        new SideNav(this, {
            orientation: $(this).hasClass('sidenav-horizontal') ? 'horizontal' : 'vertical'
        });
    });

    // Initialize sidenav togglers
    $('body').on('click', '.layout-sidenav-toggle', function(e) {
        e.preventDefault();
        window.layoutHelpers.toggleCollapsed();
        if (!window.layoutHelpers.isSmallScreen()) {
            try {
                localStorage.setItem('layoutCollapsed', String(window.layoutHelpers.isCollapsed()));
            } catch (e) {}
        }
    });

    if ($('html').attr('dir') === 'rtl') {
        $('#layout-navbar .dropdown-menu').toggleClass('dropdown-menu-right');
    }
});

$(function() {
    $('body').append('' +
        '<div id="ui-builder" class="ui-builder">' +
        '<div class="style-toggler">' +
        '<a href="javascript:"></a>' +
        '</div>' +
        '<div class="ui-block">' +
        '<div class="style-head">' +
        '<h5 class="m-0">Empire Admin Live UI Personalize</h5>' +
        '</div>' +
        '<div class="style-body">' +
        '<div class="scroll-div mst-scroll">' +
        '<label class="switcher switcher-dark mb-3 w-100 text-right">' +
        '<input type="checkbox" class="switcher-input" id="nav-dark">' +
        '<span class="switcher-indicator">' +
        '<span class="switcher-yes">' +
        '<span class="ion ion-md-checkmark"></span>' +
        '</span>' +
        '<span class="switcher-no">' +
        '<span class="ion ion-md-close"></span>' +
        '</span>' +
        '</span>' +
        '<span class="switcher-label"><b>Dark Sidebar background</b></span>' +
        '</label><br>' +
        '<label class="switcher switcher-dark mb-3 w-100 text-right">' +
        '<input type="checkbox" class="switcher-input" id="brand-dark" checked>' +
        '<span class="switcher-indicator">' +
        '<span class="switcher-yes">' +
        '<span class="ion ion-md-checkmark"></span>' +
        '</span>' +
        '<span class="switcher-no">' +
        '<span class="ion ion-md-close"></span>' +
        '</span>' +
        '</span>' +
        '<span class="switcher-label"><b>Dark Brand background</b></span>' +
        '</label><br>' +
        '<label class="switcher switcher-dark mb-4 w-100 text-right">' +
        '<input type="checkbox" class="switcher-input" id="head-dark" checked>' +
        '<span class="switcher-indicator">' +
        '<span class="switcher-yes">' +
        '<span class="ion ion-md-checkmark"></span>' +
        '</span>' +
        '<span class="switcher-no">' +
        '<span class="ion ion-md-close"></span>' +
        '</span>' +
        '</span>' +
        '<span class="switcher-label"><b>Dark Header background</b></span>' +
        '</label><br>' +
        '<h6 class="mb-2">header background</h6>' +
        '<div class="layout header-color mb-4">' +
        '<a href="#!" class=" active" data-val="bg-white"><span></span><span></span></a>' +
        '<a href="#!" class="" data-val="bg-dark"><span></span><span></span></a>' +
        '<a href="#!" class="bg-primary" data-val="bg-primary"><span></span><span></span></a>' +
        '<a href="#!" class="" data-val="bg-danger"><span></span><span></span></a>' +
        '<a href="#!" class="" data-val="bg-success"><span></span><span></span></a>' +
        '<a href="#!" class="" data-val="bg-warning"><span></span><span></span></a>' +
        '<a href="#!" class="" data-val="bg-info"><span></span><span></span></a>' +
        '</div>' +
        '<label class="switcher switcher-dark mb-4 w-100 text-right">' +
        '<input type="checkbox" class="switcher-input" id="navbar-fixed" checked>' +
        '<span class="switcher-indicator">' +
        '<span class="switcher-yes">' +
        '<span class="ion ion-md-checkmark"></span>' +
        '</span>' +
        '<span class="switcher-no">' +
        '<span class="ion ion-md-close"></span>' +
        '</span>' +
        '</span>' +
        '<span class="switcher-label"><b>Navbar Fixed</b></span>' +
        '</label><br>' +
        '<label class="switcher switcher-dark mb-0 w-100 text-right">' +
        '<input type="checkbox" class="switcher-input" id="header-fixed" checked>' +
        '<span class="switcher-indicator">' +
        '<span class="switcher-yes">' +
        '<span class="ion ion-md-checkmark"></span>' +
        '</span>' +
        '<span class="switcher-no">' +
        '<span class="ion ion-md-close"></span>' +
        '</span>' +
        '</span>' +
        '<span class="switcher-label"><b>Header Fixed</b></span>' +
        '</label><br>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    $('#ui-builder > .style-toggler').on('click', function() {
        $('#ui-builder').toggleClass('open');
    });
    $('#nav-dark').change(function() {
        if ($(this).is(":checked")) {
            $('#layout-sidenav').removeClass('bg-white');
            $('#layout-sidenav').addClass('bg-dark');
        } else {
            $('#layout-sidenav').addClass('bg-white');
            $('#layout-sidenav').removeClass('bg-dark');
        }
    });
    $('#brand-dark').change(function() {
        if ($(this).is(":checked")) {
            $('#layout-sidenav').removeClass('logo-white');
            $('#layout-sidenav').addClass('logo-dark');
        } else {
            $('#layout-sidenav').addClass('logo-white');
            $('#layout-sidenav').removeClass('logo-dark');
        }
    });
    $('#head-dark').change(function() {
        if ($(this).is(":checked")) {
            $('#layout-navbar').removeClass('bg-white');
            $('#layout-navbar').addClass('bg-dark');
        } else {
            $('#layout-navbar').addClass('bg-white');
            $('#layout-navbar').removeClass('bg-dark');
        }
    });
    $('#navbar-fixed').change(function() {
        if ($(this).is(":checked")) {
            $('html').addClass('layout-fixed');
        } else {
            $('html').removeClass('layout-fixed');
        }
    });
    $('#header-fixed').change(function() {
        if ($(this).is(":checked")) {
            $('html').addClass('layout-navbar-fixed');
        } else {
            $('html').removeClass('layout-navbar-fixed');
        }
    });
    $('.header-color > a').on('click', function() {
        var temp = $(this).attr('data-val');
        $('#layout-navbar').removeClassPrefix('bg-');
        $('#layout-navbar').addClass(temp);
    });
    $.fn.removeClassPrefix = function(prefix) {
        this.each(function(i, it) {
            var classes = it.className.split(" ").map(function(item) {
                return item.indexOf(prefix) === 0 ? "" : item;
            });
            it.className = classes.join(" ");
        });
        return this;
    };
});
