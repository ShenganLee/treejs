
const _defaultGetChildrenFunction = (item: object): void | object[] => {
    return Reflect.get(item, 'children')
}

const _defaultFormat = (item: object, children: void | object[], index: number, deep: number) => {
    return !!children ? { ...item, children } : item
}

const _formatter = (
    item: object,
    getChildrenFunction: (item: object) => void | object[],
    format: (item: object, children: void | object[], index: number, deep: number) => object,
    index = 0,
    deep = 0
): object => {

    const children = getChildrenFunction(item)?.map((childItem, index) => {
        return _formatter(childItem, getChildrenFunction, format, index, deep + 1)
    })

    return format(item, children, index, deep)
}

export const formatter = (
    list: object[],
    getChildrenFunction = _defaultGetChildrenFunction,
    format = _defaultFormat
): object[] => {
    return list.map((item, index) => {
        return _formatter(item, getChildrenFunction, format, index)
    })
}
