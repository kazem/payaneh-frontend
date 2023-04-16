import { makeObservable, observable, makeAutoObservable } from "mobx";
import { getSourceProvinces, getSourceCities, getDestinationProvinces, getDestinationCities, getTickets } from "@/http";


class PayanehStore {
    sourceProvinces = [];
    sourceCities = [];
    destProvs = [];
    destCities = [];
    tickets = [];
    constructor() {
        makeObservable(this, {
            //tickets: observable,
            sourceProvinces: observable,
            sourceCities: observable,
            destProvs: observable,
            destCities: observable
        });
    }

    GetSrcProvinces = async () => {
        let result = await getSourceProvinces();
        this.sourceProvinces = result.slice(1);
    }

    getSrcCities = async (provinceId) => {
        let result = await getSourceCities(provinceId);
        this.sourceCities = result.slice(1).filter(c => c.title);
    }

    getDestProvs = async (cityId) => {
        let result = await getDestinationProvinces(cityId);
        this.destProvs = result.slice(1).filter(c => c.title);
    }

    getDestCities = async (destProvinceId, srcCityId) => {
        let result = await getDestinationCities(destProvinceId, srcCityId);
        console.log('store after getDestCities: ', result);
        this.destCities = result.filter(c => c.title);
    }

    getTickets = async (srcCity, destCity, date) => {
        let result = await getTickets(srcCity, destCity, date)
        console.log('store after getTickets: ', result);
        return result;
        this.tickets = result;
        console.log('this.tickets: ', this.tickets);
    }
}

export const payanehStore = new PayanehStore();
