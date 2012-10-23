var COOKIE_LOGIN_ID    = 'login_id';
var COOKIE_STATUS_CODE = 'login_status';

function loadTemplate(templateName, callback) {
    loadTemplateImpl({
        url: 'views/' + templateName + '.html',
        isLocal: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        success: function(template) {
            Ember.TEMPLATES[templateName] = template;
            if (_.isFunction(callback)) callback();
        }
    })
}

function loadTemplateImpl( options ) {
    var args = $.extend( {}, options, {
        success : function( data ) {
            options.success(
                Ember.Handlebars.compile( data )
            );
        }
    });
    Ember.$.ajax( args );
}

function decorateTemplate(templateName, componentName, templateParams) {
    loadTemplate(templateName, function() {
        var view = Ember.View.create(_.extend({templateName: templateName}, templateParams));
        if (!_.isNull(view)) view.appendTo(componentName);
    });
}

function decoratePage(templateParams) {
    decorateTemplate('function-header', 'div.function-header', templateParams);
    decorateTemplate('function-navbar', 'div.function-navbar', templateParams);
}

function signOff() {
    $.cookie(COOKIE_LOGIN_ID, null);
    var status = parseInt($.cookie(COOKIE_STATUS_CODE));
    if (status < 2) {
        $.cookie(COOKIE_STATUS_CODE, null);
    }
    window.location.href='index.html';
}

