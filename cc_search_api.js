// Class based approach

const baseUrl = 'https://api.creativecommons.engineering';

class ContentSearch {

    // to be completed after implementing OAuth wrapper
    constructor(apiKey) {
        this.apiKey = apiKey
    }

    image_search(q = '', li = '', lt = '', provider = '', page = 1, page_size = 20, creator = '', tags = '', title = '', filter_dead = true) {
        
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

            this._sendRequest("/image/search", parameters)
        }
    }

    image_detail(identifier = '') {

        if(!identifier) { return }
        else {
            this._sendRequest(`/image/${identifier}`)
        }
    }

    // uses fetch Web API
    _sendRequest(type = '', parameters = {}) {
        let params = parameters;

        const url = new URL(`${baseUrl}/${type}`);
        url.search = new URLSearchParams(params);

        fetch(url)
        .then(data => { return data.json() })
    }
}

export default ContentSearch;

