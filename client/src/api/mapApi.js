export const mapApi = apiClient => {
    return {
        fetchPath: async markers => await apiClient.post({points: markers}).execute('/path')
    }
}
