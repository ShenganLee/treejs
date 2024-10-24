import { TreeNode } from './tree-node.bak'

import { getRecursionChildren } from '../utils'
import { TreeNodeDataType, RecursionKeyOrFunctionType } from '../types'

// const FilterSymbol = Symbol('filter')
// const ChildrenSymbol = Symbol('children')

export class Tree<T extends TreeNodeDataType> {
    protected treeNodes: TreeNode<T>[] = [];
    protected readonly recursionKeyOrFunction: RecursionKeyOrFunctionType;
    
    constructor(
        recursionKeyOrFunction: RecursionKeyOrFunctionType = 'children'
    ) {
        this.recursionKeyOrFunction = recursionKeyOrFunction;
    }

    *[Symbol.iterator](): IterableIterator<TreeNode<T>> {
        for (let node of this.treeNodes) {
            for (let item of node) {
                yield item
            }
        }
    }

    get size(): number {
        return Array.from(this).length
    }

    get nodes(): TreeNode<T>[] {
        return Array.from(this)
    }

    protected generaterTreeNode(
        data: T,
        parent?: TreeNode<T>,
        previous?: TreeNode<T>,
    ): TreeNode<T> {

        const current = TreeNode.generaterTreeNode<T>(data, this, parent, previous)

        const children = getRecursionChildren<T>(data, this.recursionKeyOrFunction)
        
        children?.length && this.generaterTreeNodes(children, current)

        return current
    }

    protected generaterTreeNodes(
        array: T[],
        parent?: TreeNode<T>,
    ): TreeNode<T>[] {
        let previous: TreeNode<T>

        return array.map(data => {
            const current = this.generaterTreeNode(data, parent, previous)
            previous = current
            return current
        })
    }

    delete(node: TreeNode<T>): void {
        this.treeNodes = this.treeNodes.filter(treeNode => treeNode !== node)
    }

    has(node: TreeNode<T>): boolean {
        return node.root === this
    }

    from(iterable: Iterable<T> | ArrayLike<T>): this {
        const array = Array.from(iterable)
        this.treeNodes = this.generaterTreeNodes(array)

        return this;
    }

    toArray(fn: (data: T, children: T[], node: TreeNode<T>) => T): T[] {
        return this.treeNodes.map(node => node.format(fn))
    }

    clone(): Tree<T> {
        const newTree = new Tree(this.recursionKeyOrFunction)
        let previousNode: TreeNode<T> | undefined = void 0 
        newTree.treeNodes = this.treeNodes.map(node => {
            const newNode = node.clone(newTree, void 0, previousNode)
            previousNode = newNode
            return newNode
        })

        return newTree
    }

    map(fn: (data: T, node: TreeNode<T>) => T): Tree<T> {
        const newTree = this.clone()

        newTree.nodes.forEach(node => {
            node.data = Reflect.apply(fn, null, [node.data, node])
        })

        return newTree
    }

    pruning(fn: (data: T, node: TreeNode<T>) => boolean): Tree<T> {
        const newTree = this.clone()

        const reservedTreeNodeSet = newTree.nodes.reduce(
            (set, node) => {
                const flag = Reflect.apply(fn, null, [node.data, node])
                if (flag) {
                    node.shuttleToRoot((_, node) => {
                        set.add(node)
                    })
                }

                return set
            },
            new Set()
        )
        
        newTree.nodes.filter(
            (node) => !reservedTreeNodeSet.has(node)
        ).sort(
            (a, b) => a.deep - b.deep
        ).forEach(node => {
            if (this.has(node)) node.remove()
        })

        return newTree
    }
}