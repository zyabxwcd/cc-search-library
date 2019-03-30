// Class based approach

const request = require('request');
const baseUri = "https://api.creativecommons.engineering";

class ContentSearch {

    constructor(apiKey) {
        this.apiKey = apiKey
    }

    image_search(keywords = '', licenses = '', l_type = '', provider = '', page = 1, page_size = 20, creator = '', tags = '', title = '', filter_dead = true) {
        
        // Parameter Validation
        if (!keywords || !licenses || !l_type || !provider) { return }
        else if(creator.length > 200 || creator.length < 1 || tags.length > 200 || tags.length < 1 || title.length > 200 || title.length < 1) {
            return
        }
        else if (!licenses) {
            let valid_types = ['PDM', 'BY-SA', 'BY-ND', 'CC0', 'BY-NC-ND', 'BY-NC', 'BY-NC-SA', 'BY'];
            if (!valid_types.includes(licenses.split(','))) { return }
        }
        else if (!l_type) {
            let valid_types = ['all', 'all-cc', 'commercial', 'modification'];
            if (!valid_types.includes(l_type.split(','))) { return }
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
                keywords,
                licenses,
                l_type,
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

    _sendRequest(type, parameters={}) {
        const url = `${baseUri}/${type}`

        request(url, function (error, response, body) {
            if (!error & response.statusCode === 200) {
                callback(JSON.parse(body).results)
            }
        })
    }
}

export default ContentSearch;

