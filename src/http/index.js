import axios from "axios";

export async function getSourceProvinces() {
    var provinces = [];
    let result = axios.get('http://localhost:3000/api/getsrcprovinces')
        .then(res => {
            let srcProvs = res.data;
            srcProvs.forEach(srcProv => {
                let item = { title: srcProv.label, value: srcProv.value };
                provinces.push(item);
            });
            return provinces;
        })
        .catch(error => {
            console.error('error: ', error);
        });
    return result;
}

export async function getSourceCities(provinceId) {
    console.log('http-api GetSourceProvinces');
    var cities = [];
    let result = axios.get(`http://localhost:3000/api/getsrccities?provinceId=${provinceId}`)
        .then(res => {
            let srcCities = res.data;
            srcCities.forEach(srcCity => {
                let item = { title: srcCity.label, value: srcCity.value };
                cities.push(item);
            });
            return cities;
        })
        .catch(error => {
            console.error('error: ', error);
        });
    return result;
}

export async function getDestinationProvinces(cityId) {
    console.log('http-api GetSourceProvinces');
    var provs = [];
    let result = axios.get(`http://localhost:3000/api/getdestprovinces?cityId=${cityId}`)
        .then(res => {
            let destProvs = res.data;
            destProvs.forEach(destProv => {
                let item = { title: destProv.label, value: destProv.value };
                provs.push(item);
            });
            return provs;
        })
        .catch(error => {
            console.error('error: ', error);
        });

    console.log('api result getDestinationProvincesByCityId: ', result);
    return result;
}

export async function getDestinationCities(destProvinceId, srcCityId) {
    var cities = [];
    let result = axios.get(`http://localhost:3000/api/getdestcities?destProvId=${destProvinceId}&srcCityId=${srcCityId}`)
        .then(res => {
            let destCities = res.data;
            destCities.forEach(destCity => {
                let item = { title: destCity.label, value: destCity.value };
                cities.push(item);
            });
            return cities;
        })
        .catch(error => {
            console.error('error: ', error);
        });
    return result;
}

export async function getTickets(srcCity, destCity, date) {
    let result = axios.post(`http://localhost:3000/get-result`, {
        // srcCity: srcCity,
        // destCity: destCity,
        // ticketDate: date.replace('/', '').replace('/', '')
    })
        .then(res => {
            console.log('res: ', res.data);
            return res.data;
        })
        .catch(error => {
            console.log('error: ', error);
        });
    return result;
}

// export async function registerRequest()