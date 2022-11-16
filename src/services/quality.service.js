import httpService from './http.service'

const qualityEndPoint = 'quality/'

const qualityService = {
    get: async (id) => {
        const { data } = await httpService.get(qualityEndPoint + id)
        return data
    },
    fetchAll: async () => {
        const { data } = await httpService.get(qualityEndPoint)
        return data
    }
}

export default qualityService
