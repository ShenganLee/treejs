import { Tree } from './tree-root.bak'
import { TreeNodeDataType } from '../types'

export class TreeNode<T extends TreeNodeDataType> {
    // 节点属性
    data: T;
    // 根节点
    root?: Tree<T>;
    // 父节点
    parent?: TreeNode<T>;
    // 同级前一个节点
    previous?: TreeNode<T>;
    // 同级下一个节点
    next?: TreeNode<T>;
    // 子节点(第一个)
    child?: TreeNode<T>;

    constructor(
        data: T,
        root: Tree<T>,
        parent?: TreeNode<T>,
        previous?: TreeNode<T>,
        next?: TreeNode<T>,
        child?: TreeNode<T>,
    ) {
        this.data = data
        this.root = root
        this.parent = parent
        this.previous = previous
        this.next = next
        this.child = child
    }

    /**
     * 创建树节点方法
     * @param data 
     * @param parent 
     * @param previous 
     * @returns TreeNode<T>
     */
    static generaterTreeNode<T extends TreeNodeDataType>(
        data: T,
        root: Tree<T>,
        parent?: TreeNode<T>,
        previous?: TreeNode<T>,
    ): TreeNode<T> {
        const current = new TreeNode<T>(data, root, parent, previous)

        if (parent && !previous) parent.child = current
        if (previous) previous.next = current

        return current
    }

    /**
     *  迭代方法
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
    get deep(): number {
        let index = 0
        let current = this.parent

        while(current) {
            index ++
            current = current.parent
        }

        return index
    }

    /**
     * 当前节点及子节点列表
     */
    get nodes(): TreeNode<T>[] {
        return Array.from(this)
    }

    /**
     * 删除当前节点
     */
    remove(): void {
        if (this.previous) this.previous.next = this.next
        if (this.next) this.next.previous = this.previous
        if (this.parent?.child === this) this.parent.child = this.next
        this.root?.delete(this)

        this.parent = void 0
        this.previous = void 0
        this.next = void 0

        this.nodes.forEach(node => {
            node.root = void 0
        })
    }

    /**
     * 复制当前及子级节点
     * @param parent
     * @param previous
     * @returns 
     */
    clone(root: Tree<T>, parent?: TreeNode<T>, previous?: TreeNode<T>): TreeNode<T> {
        const newNode = TreeNode.generaterTreeNode(this.data, root, parent, previous)

        let childNode = this.child
        let previousNode: TreeNode<T> | undefined = void 0

        while(childNode) {
            previousNode = childNode.clone(root, newNode, previousNode)
            childNode = childNode.next
        }

        return newNode
    }

    /**
     * node是否为当前节点的父级节点
     * @param node: TreeNode<T>
     * @returns boolean
     */
    hasParent(node: TreeNode<T>): boolean {
        if (node.root !== this.root) return false

        let current = this.parent

        while(current) {
            if (node === current) return true

            current = current.parent
        }

        return false
    }

    /**
     * node是否为当前节点的子级节点
     * @param node TreeNode<T>
     * @returns boolean
     */
    hasChild(node: TreeNode<T>): boolean {
        return node.hasParent(this)
    }

    /**
     * 获取当前节点的父级节点列表
     * @param deep: undefined | number 向上获取父级结点的层级
     * @returns TreeNode<T>[]
     */
    getParents(deep?: number): TreeNode<T>[] {
        const parents = []

        let current = this.parent

        while(current) {
            if (
                typeof deep === 'number' &&
                (this.deep - current.deep) > deep
            ) return parents

            parents.unshift(current)

            current = current.parent
        }

        return parents
    }

    /**
     * 获取当前节点的子级节点列表
     * @param deep: undefined | number 向下获取子级结点的层级
     * @returns TreeNode<T>[]
     */
    getChildren(deep?: number): TreeNode<T>[] {
        const children = []

        for (let node of this) {
            if (node === this) continue

            if (
                typeof deep === 'number' &&
                (node.deep - this.deep) > deep
            ) continue

            children.push(node)
        }

        return children
    }

    /**
     * 向上遍历到根节点
     * @param fn 
     */
    shuttleToRoot(fn: (data: T, node: TreeNode<T>) => void) {
        let node: TreeNode<T> | undefined = this
        while(node) {
            Reflect.apply(fn, null, [node.data, node])
            node = node.parent
        }
    }

    /**
     * 向下遍历到所有叶子节点
     * @param fn 
     */
    shuttleToLeaf(fn: (data: T, node: TreeNode<T>) => void) {
        this.nodes.forEach(node => {
            Reflect.apply(fn, null, [node.data, node])
        })
    }

    /**
     * 格式化数据
     * @param fn 
     * @returns 
     */
    format(fn: (data: T, children: T[], node: TreeNode<T>) => T): T {
        
        const children = []

        let node = this.child

        while(node) {
            children.push(node.format(fn))
            node = node.next
        }

        return Reflect.apply(fn, null, [this.data, children, this])
    }

    /**
     * toString方法
     * @returns String
     */
    toString(): string {
        return JSON.stringify(
            this.format((data, children) => ({ ...data, children })),
            null,
            4
        )
    }
}
