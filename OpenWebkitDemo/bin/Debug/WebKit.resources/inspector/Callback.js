/*
 * Copyright (C) 2009 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

WebInspector.Callback = function()
{
    this._lastCallbackId = 1;
    this._callbacks = {};
}

WebInspector.Callback.prototype = {
    wrap: function(callback)
    {
        var callbackId = this._lastCallbackId++;
        this._callbacks[callbackId] = callback || function() {};
        return callbackId;
    },

    processResponse: function(callbackId, args)
    {
        var callback = this._callbacks[callbackId];
        callback.apply(null, args);
        delete this._callbacks[callbackId];
    },

    removeResponseCallbackEntry: function(callbackId)
    {
        delete this._callbacks[callbackId];
    }
}

WebInspector.Callback._INSTANCE = new WebInspector.Callback();
WebInspector.Callback.wrap = WebInspector.Callback._INSTANCE.wrap.bind(WebInspector.Callback._INSTANCE);
WebInspector.Callback.processResponse = WebInspector.Callback._INSTANCE.processResponse.bind(WebInspector.Callback._INSTANCE);
WebInspector.Callback.removeResponseCallbackEntry = WebInspector.Callback._INSTANCE.removeResponseCallbackEntry.bind(WebInspector.Callback._INSTANCE);
