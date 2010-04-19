// --
// OTRS.UI.Accessibility.js - accessibility functions
// Copyright (C) 2001-2010 OTRS AG, http://otrs.org/\n";
// --
// $Id: OTRS.UI.Accessibility.js,v 1.4 2010-04-19 16:36:29 mg Exp $
// --
// This software comes with ABSOLUTELY NO WARRANTY. For details, see
// the enclosed file COPYING for license information (AGPL). If you
// did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
// --

"use strict";

var OTRS = OTRS || {};
OTRS.UI = OTRS.UI || {};

/**
 * @namespace
 * @exports TargetNS as OTRS.UI.Accessibility
 * @description
 *      This namespace contains all accessibility related functions
 */
OTRS.UI.Accessibility = (function (TargetNS) {
    /**
     * @function
     * @description
     *      This function initializes the W3C ARIA role attributes for the
     *      different parts of the page. It is not inside the HTML because
     *      these attributes are not part of the XHTML standard.
     * @return nothing
     */
    TargetNS.Init = function () {
        /* set W3C ARIA role attributes for screenreaders */
        $('.ARIARoleBanner')
            .attr('role', 'banner');
        $('.ARIARoleNavigation')
            .attr('role', 'navigation');
        $('.ARIARoleSearch')
            .attr('role', 'search');
        $('.ARIARoleContentinfo')
            .attr('role', 'contentinfo');
        $('.ARIARoleMain')
            .attr('role', 'main');
        $('.ARIAHasPopup')
            .attr('aria-haspopup', 'true');
        $('.OTRS_Validate_Required, .OTRS_Validate_DependingRequired')
            .attr('aria-required', 'true');
    };

    /**
     * @function
     * @description
     *      This function receives a text to be spoken to users
     *      using a screenreader. This is achieved by creating an
     *      element with the aria landmark role "alert" causing it
     *      to be read immediately.
     * @param {String} Text
     *      Text to be spoken to the user, may not contain markup.
     * @return nothing
     */
    TargetNS.AudibleAlert = function (Text) {
        var AlertMessageID = 'OTRS_Accessibility_AlertMessage';

        // remove possibly pre-existing alert message
        $('#' + AlertMessageID).remove();

        // add new alert message
        $('body').append('<div role="alert" id="' + AlertMessageID + '" class="ARIAAlertMessage">' + Text + '</div>');

    };

    return TargetNS;
}(OTRS.UI.Accessibility || {}));