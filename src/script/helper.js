export async function makeRequest(url,params = {}){
    const paramsToQueryString = Object.entries(params).map(param => `${param[0]}=${param[1]}`).join("&");
    return fetch(`${url}?${paramsToQueryString}`);
}