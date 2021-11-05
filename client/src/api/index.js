import { BasicApiClient } from './basicApiClient';
import { mapApi } from './mapApi';

const basicApiClient = new BasicApiClient();
export const apiClient = {
    mapApi: mapApi(basicApiClient)
};