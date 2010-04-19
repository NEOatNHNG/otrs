// --
// OTRS.UI.Resizable.js - Resizable
// Copyright (C) 2001-2010 OTRS AG, http://otrs.org/\n";
// --
// $Id: OTRS.UI.Resizable.js,v 1.5 2010-04-19 16:36:29 mg Exp $
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
 * @exports TargetNS as OTRS.UI.Resizable
 * @description
 *      Contains the code for resizable elements.
 */
OTRS.UI.Resizable = (function (TargetNS) {
    /**
     * @function
     * @description
     *      This function initializes the resizability of the given element
     * @param {String} Selector jQuery selector of the element, which should be resizable
     * @return nothing
     */
    TargetNS.Init = function (Selector) {
        var $Selector = $(Selector),
            ScrollerHeight = 140;

        if ($Selector.length) {
            if ($Selector.find("table").height() < ScrollerHeight) {
                $Selector.find('.Scroller').height($Selector.find("table").height());
            }

            $Selector.resizable({
                handles: {
                    s: $Selector.find('.Handle a')
                },
                minHeight: 50,
                maxHeight: $Selector.find("table").height() + 10,
                resize: function    (event, ui) {
                    $Selector.find("div.Scroller").height((ui.size.height - 10) + 'px').width(ui.size.width + 'px');
                }
            });
        }
    };

    return TargetNS;
}(OTRS.UI.Resizable || {}));