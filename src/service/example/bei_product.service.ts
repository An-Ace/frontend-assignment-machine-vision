import {useQuery} from '@tanstack/react-query'
import {type PropsTable} from '@/components/Table/Table.type'
import {PREFIX_KEY} from '@/constant/common'
import client from '@/client/index'

type Sto = {
    name: string
    date_created: string
}

type User = {
    id: string
    email: string
    sto?: Sto
}

type GetListUsersResponse = {
    data: User[]
}

export const GetListBeiProduct: PropsTable['dataFetchService'] = params => {
    const queryParams = {
        ...params,
        fields: ["id", "status", "date_created", "date_updated", "user_deleted", "date_deleted", "kode_saham", "nama", "tanggal_listing", "sektor_id"]
    }
    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'BEI_PRODUCT', queryParams],
        async queryFn() {
            const response = await client.api.get<GetListUsersResponse>('/items/perusahaan_bei', {
                params: queryParams
            })

            return response.data
        }
    })
}
