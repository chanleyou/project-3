var ready;
ready = function() {
    var engine = new Bloodhound({
        datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.title);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
				// local: gon.events
				remote: {
					url: '../events/autocomplete?q=%QUERY',
					wildcard: '%QUERY'
			}
    });

    var promise = engine.initialize();

    promise
        .done(function() { console.log('Typeahead Bloodhound initialized.'); })
		.fail(function() { console.log('Error initializing Typeahead Bloodhound.'); });


    $('.typeahead').typeahead(null, {
        name: 'engine',
        displayKey: 'title',
        source: engine.ttAdapter()
    });
}

$(document).ready(ready);
$(document).on('page:load', ready);