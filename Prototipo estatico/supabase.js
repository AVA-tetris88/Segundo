/*!
 * Supabase JavaScript Client Library v2.43.4
 * (c) 2026 Supabase Inc.
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.supabase = {}));
})(this, (function (exports) { 'use strict';

    class SupabaseClient {
        constructor(supabaseUrl, supabaseKey) {
            this.supabaseUrl = supabaseUrl;
            this.supabaseKey = supabaseKey;
        }
        from(table) {
            const url = `${this.supabaseUrl}/rest/v1/${table}`;
            const headers = {
                'apikey': this.supabaseKey,
                'Authorization': `Bearer ${this.supabaseKey}`,
                'Content-Type': 'application/json'
            };
            return {
                select: async (columns = '*') => {
                    try {
                        const response = await fetch(`${url}?select=${columns}`, { method: 'GET', headers });
                        const data = await response.json();
                        if (!response.ok) return { data: null, error: data };
                        return { data, error: null };
                    } catch (err) {
                        return { data: null, error: { message: err.message } };
                    }
                },
                insert: async (values) => {
                    try {
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: { ...headers, 'Prefer': 'return=representation' },
                            body: JSON.stringify(values)
                        });
                        const data = await response.json();
                        if (!response.ok) return { data: null, error: data };
                        return { data, error: null };
                    } catch (err) {
                        return { data: null, error: { message: err.message } };
                    }
                }
            };
        }
    }

    function createClient(supabaseUrl, supabaseKey) {
        return new SupabaseClient(supabaseUrl, supabaseKey);
    }

    exports.SupabaseClient = SupabaseClient;
    exports.createClient = createClient;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
