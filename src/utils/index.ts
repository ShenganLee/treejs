import { TreeNodeDataType, getChildrenFunctionType } from '../types'



// export const format = <T extends TreeNodeDataType>(
//     data: T[],
//     getChildrenFunction: getChildrenFunctionType
// ): T[] => {
    
//     return data.map(d => {
//         const children = Reflect.apply(getChildrenFunction, null, [d])

//     })
// }