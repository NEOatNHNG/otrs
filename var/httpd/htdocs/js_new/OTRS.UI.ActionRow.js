// --
// OTRS.UI.ActionRow.js - provides all functions for the Action row
// Copyright (C) 2001-2010 OTRS AG, http://otrs.org/\n";
// --
// $Id: OTRS.UI.ActionRow.js,v 1.4 2010-04-19 16:36:29 mg Exp $
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
 * @exports TargetNS as OTRS.UI.ActionRow
 * @description
 *      Action row functionality
 * @requires
 *      OTRS.JSON
 *      OTRS.Data
 */
OTRS.UI.ActionRow = (function (TargetNS) {

    if (!OTRS.Debug.CheckDependency('OTRS.UI.ActionRow', 'OTRS.JSON', 'OTRS JSON API')) {
        return;
    }
    if (!OTRS.Debug.CheckDependency('OTRS.UI.ActionRow', 'OTRS.Data', 'OTRS Data API')) {
        return;
    }

    /**
     * @function
     * @description
     *      This functions adds information about the valid action of an element to the element.
     *      These information are used to generate the action row individually for this element.
     * @param {String} ID
     *      The ID of the element
     * @param {String} JSONString
     *      The JSON string which contains the information about the valid actions of the element (generated by Perl module)
     *      Could also be an javascript object directly
     * @return nothing
     *
     */
    TargetNS.AddActions = function (ID, JSONString) {
        var $ID = $('#' + ID),
            Actions;
        // The element of the given ID must exist, JSONString must not be empty
        if ($ID.length) {
            if (typeof JSONString === 'String') {
                Actions = OTRS.JSON.Parse(JSONString);
            }
            else {
                Actions = JSONString;
            }

            // save action data to the given element
            OTRS.Data.Set($ID, 'Actions', Actions);
        }
        else {
            OTRS.Debug.Log('Element does not exist or no valid data structure passed.');
        }
    };

    TargetNS.UpdateActionRow = function ($ClickedElement, CheckboxSelector, $ActionRow) {
        var $Checkboxes,
            TicketActionData,
            ActionRowElement;

        // Check, if one or more items are selected
        $Checkboxes = $(CheckboxSelector + ':checked');
        // No checkbox is selected
        if (!$Checkboxes.length) {
            // Remove actions and deactivate bulk action
            $ActionRow
                .find('li').filter(':not(.Bulk)').remove()
                .end().end()
                .find('#BulkAction').addClass('Inactive')
                .end()
                .find('li.Last').removeClass('Last')
                .end()
                .find('li:last').addClass('Last');
        }
        // Exactly one checkbox is selected
        else if ($Checkboxes.length === 1) {
            // Update actions and deactivate bulk action
            $ActionRow.find('#BulkAction').addClass('Inactive');

            // Find the element which is active (it must not be the clicked element!)
            // and get the data
            TicketActionData = OTRS.Data.Get($Checkboxes.closest('li'), 'Actions');
            if (typeof TicketActionData !== 'undefined') {
                $.each(TicketActionData, function (Index, Value) {
                    if (Value.HTML) {
                        $ActionRow.append(Value.HTML).attr('id', Value.ID);
                        ActionRowElement = $ActionRow.find('#' + Value.ID).find('a');
                        if (typeof Value.Target === 'undefined' || Value.Target === "") {
                            ActionRowElement.attr('href', Value.Link);
                        }
                        else if (Value.Target === "PopUp") {
                            ActionRowElement.bind('click.Popup', function () {
                                OTRS.UI.Popup.OpenPopup(Value.Link, 'Action');
                                return false;
                            });
                        }
                    }
                });
            }

            // Apply the Last class to the right element
            $ActionRow
                .find('li.Last').removeClass('Last')
                .end()
                .find('li:last').addClass('Last');
        }
        // Two ore more checkboxes selected
        else {
            // Remove actions and activate bulk action
            $ActionRow
                .find('li').filter(':not(.Bulk)').remove()
                .end().end()
                .find('#BulkAction').removeClass('Inactive')
                .end()
                .find('li.Last').removeClass('Last')
                .end()
                .find('li:last').addClass('Last');
        }
    };

    return TargetNS;
}(OTRS.UI.ActionRow || {}));