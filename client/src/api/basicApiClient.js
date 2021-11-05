export const BasicApiClient = function (prefix) {
    this.prefix = prefix || '';
    this.options = {
        method: 'GET',
        headers: { },
    };

    this.post = function (body) {
        const options = {
            method: "POST",
            headers: { 
                ...this.options.headers, 
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        }

        return { ...this, options };
    }

    this.execute = async function (url) {
        const response = await fetch(this.prefix + url, this.options);
        
        return await response.json();
    } 
}