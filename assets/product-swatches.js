jQuery(function() {
    $('#pc').text($('#firstswatch').text());

    jQuery('.swatch :radio').change(function() {
        var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
        var optionValue = jQuery(this).val();
        var optionValues = jQuery(this).attr('data-value');

        jQuery(this)
        .closest('form')
        .find('.single-option-selector')
        .eq(optionIndex)
        .val(optionValue)
        .trigger('change');
        if(optionValues == 'Color') {
            $('#pc').text(optionValue);
        }
    });
});
