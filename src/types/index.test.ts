import type { TreeNodeDataType } from './index'

type TreeNodeData = {
    a: number;
    b?: number;
}

// const TreeData: TreeNodeDataType<TreeNodeData>[] = [
//     {
//         a: 1,
//         children: [
//             { a: 12, b: 12, children: void 0},
//             { a: 12, b: '12', children: void 0}
//         ]
//     }
// ]
// const TreeData: TreeNodeDataType<Record<string | number | symbol, any>>[] = [
//     {
//         a: 1,
//         children: [
//             { a: 12, b: 12, children: void 0},
//             { a: 12, b: '12', children: void 0}
//         ]
//     }
// ]