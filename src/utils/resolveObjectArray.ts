interface ComboListOptions {
    id: number,
    value: string
}

export function resolveList(response: any): Array<ComboListOptions> {
    const list: Array<ComboListOptions> = [];

    Object.fromEntries(
        Object.entries(response).map(([key, value]) => {
            const obj = { id: Number(key), value: String(value) }
            list.push(obj)
            return [key, value]
        })
    );

    return list;
}
