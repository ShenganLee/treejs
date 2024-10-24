import { TreeNode } from "./tree-node"

export class Tree<T extends object> {
    protected children: TreeNode<T>[] | void []

    constructor(data?: T[]) {
        this.children = data?.map(d => {
            // const 
        }) || []
    }

    // get size(): number {
    //     return this.children.reduce((p, n) => p + n.size, 0)
    // }
}