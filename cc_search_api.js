// Structure to facilitate use in browsers/frontend JavaScript

const baseUrl = 'https://api.creativecommons.engineering';

const CCSearch = (function() {
    return {

        // to be completed after implementing OAuth wrapper
        constructor: function(apiKey) {
            this.apiKey = apiKey
        },

        image_search: function(q = '', li = '', lt = '', provider = '', page = 1, page_size = 20, creator = '', tags = '', title = '', filter_dead = true) {
            // Parameter Validation
            if (!q || !li || !lt || !provider) { return }
            else if(creator.length > 200 || creator.length < 1 || tags.length > 200 || tags.length < 1 || title.length > 200 || title.length < 1) {
                return
            }
            else if (!li) {
                let valid_types = ['PDM', 'BY-SA', 'BY-ND', 'CC0', 'BY-NC-ND', 'BY-NC', 'BY-NC-SA', 'BY'];
                if (!valid_types.includes(li.split(','))) { return }
            }
            else if (!lt) {
                let valid_types = ['all', 'all-cc', 'commercial', 'modification'];
                if (!valid_types.includes(lt.split(','))) { return }
            }
            else if (!provider) {
                let valid_types = ['thingiverse', 'sciencemuseum', 'rijksmuseum', 'nypl', 'nhl', 
                'museumsvictoria', 'met', 'mccordmuseum', 'iha', 'geographorguk', 'floraon', 
                'flickr', 'eol', 'digitaltmuseum', 'deviantart', 'clevelandmuseum', 'brooklynmuseum', 
                'behance', 'animaldiversity', 'WoRMS', '500px'];

                if (!valid_types.includes(provider.split(','))) { return }
            }

            // Make request if everything is fine
            else {
                let parameters = {
                    q,
                    li,
                    lt,
                    provider,
                    page,
                    page_size,
                    creator,
                    tags,
                    title,
                    filter_dead
                }

                return this._sendRequest("/image/search", parameters)
            }
        },

        image_detail: function(identifier = '') {

            if(!identifier) { return }
            else {
                return this._sendRequest(`/image/${identifier}`)
            }
        },

        link_resolve: function(path = '') {
            if(!path) { return }
            else {
                return this._sendRequest(`/link/${path}`)
            }
        },
    
        watermark_read: function(identifier = '') {
            if(!identifier) { return }
            else {
                return this._sendRequest(`/watermark/${identifier}`)
            }
        },

        image_stats: function() {
            return this._sendRequest('/statistics/image/')
        }

        // uses fetch Web API
        _sendRequest: function(type = '', parameters = {}) {
            let params = parameters;
    
            const url = new URL(`${baseUrl}/${type}`);
    
            // attach query parameters
            url.search = new URLSearchParams(params);
    
            fetch(url)
            .then(data => { return data.json() })
        }
    }
})