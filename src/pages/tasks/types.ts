export interface ITask {
    name: string,
    description?: string,
    startDate?: string,
    endDate?: string,
    employeeId: number,
    id: number
}

export interface ISearch {
    name_like?: string,
    description_like?: string,
    startDate?: string,
    endDate?: string,
}