import { makeObservable, observable } from "mobx";
import { getSourceProvinces, getSourceCities, getDestinationProvinces, getDestinationCities, getTickets } from "@/http";


class PayanehStore {
    sourceProvinces = [];
    sourceCities = [];
    destProvs = [];
    destCities = [];
    constructor() {
        makeObservable(this, {
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
        this.destCities = result.filter(c => c.title);
    }
}

export const payanehStore = new PayanehStore();
