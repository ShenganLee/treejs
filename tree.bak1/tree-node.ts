
import { Tree } from './tree'
// import { TreeNodeType } from '../types'

export class TreeNode<T extends object> {
    data: T
    root?: Tree<T>
    parent?: TreeNode<T>
    previous?: TreeNode<T>
    next?: TreeNode<T>
    child?: TreeNode<T>

    constructor(data: T) {
        this.data = data
    }

    /**
     * 迭代器
     */
    *[Symbol.iterator](): IterableIterator<TreeNode<T>> {
        yield this

        let child = this.child
        while(child) {
            for (let item of child) {
                yield item
            }
            child = child.next
        }
    }

    /**
     * 当前节点及子节点数量
     */
    get size(): number {
        return Array.from(this).length
    }

    /**
     * 当前节点同级下标
     */
    get index(): number {
        let index = 0
        let current = this.previous

        while(current) {
            index ++
            current = current.previous
        }

        return index
    }

    /**
     * 当前节点层级
     */
    get depth(): number {
        let index = 0
        let current = this.parent

        while(current) {
            index ++
            current = current.parent
        }

        return index
    }

     /**
     * 获取当前节点的子级节点列表
     * @param deep: undefined | number 向下获取子级结点的层级
     * @returns TreeNode<T>[]
     */
     getChildren(depth?: number): TreeNode<T>[] {
        if(typeof depth === 'number' && depth < 1) {
            return []
        }
        
        const children = []

        let child = this.child

        while(child) {
            if (typeof depth === 'number') {
                children.push(child)
                const _children = child.getChildren(depth - 1)
                children.push(..._children)
            } else {
                children.push(...Array.from(child))
            }
            
            child = child.next
        }

        return children
    }

    // hasChild(): 
} 