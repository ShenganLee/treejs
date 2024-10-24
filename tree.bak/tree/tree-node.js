
export class TreeNode {
    data = void 0
    root = void 0
    parent = void 0
    previous = void 0
    next = void 0
    child = void 0

    constructor(data) {
        this.data = data
    }

    /**
     *  迭代器方法
     */
    *[Symbol.iterator]() {
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
     * 当前节点层级
     */
    get deep() {
        let index = 0
        let current = this.parent

        while(current) {
            index ++
            current = current.parent
        }

        return index
    }

    /**
     * 当前节点及子节点数量
     */
    get size() {
        return Array.from(this).length
    }

    /**
     * 当前节点同级下标
     */
    get index() {
        let index = 0
        let current = this.previous

        while(current) {
            index ++
            current = current.previous
        }

        return index
    }

    /**
     * 直接子节点
     */
    get children() {
        const treeNodes = []
        let current = this.child
        while(current) {
            treeNodes.push(current)
            current = current.next 
        }

        return treeNodes
    }

    /**
     * 当前节点和子级节点
     */
    get treeNodes() {
        return Array.from(this)
    }

    /**
     * 所有子级节点
     */
    get childTreeNodes() {
        const treeNodeSet = new Set(this.treeNodes)
        treeNodeSet.delete(this)
        return Array.from(treeNodeSet)
    }

    /**
     * 获取当前节点的父级节点列表
     * @param deep: undefined | number 向上获取父级结点的层级
     * @returns TreeNode<T>[]
     */
    getParents(deep) {
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
    getChildren(deep) {
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
     * node是否为当前节点的子级节点
     * @param treeNode TreeNode<T>
     * @returns boolean
     */
    hasChild(treeNode) {
        if (treeNode.root !== this.root) return false
        let current = treeNode.parent

        while(current) {
            if (this === current) return true

            current = current.parent
        }

        return false
    }

    /**
     * 插入子节点
     * @param node TreeNode<T>
     * @returns boolean
     */
    appendChild(treeNode) {
        treeNode.remove()

        treeNode.treeNodes.forEach(node => {
            node.root = this.root
        })

        treeNode.parent = this
        
        if (!this.child) {
            this.child = treeNode
        } else {
            let lastChild = this.child
            while(lastChild.next) {
                lastChild = lastChild.next
            }

            lastChild.next = treeNode
            treeNode.previous = lastChild
        }
    }

    insertPrevious(treeNode) {
        treeNode.remove()

        treeNode.treeNodes.forEach(node => {
            node.root = this.root
        })

        treeNode.parent = this.parent
        
        if (this.previous) this.previous.next = treeNode
        else if (this.parent) this.parent.child = treeNode
        else this.root.child = treeNode

        treeNode.previous = this.previous
        treeNode.next = this

        this.previous = treeNode
    }

    insertNext(treeNode) {
        treeNode.remove()

        treeNode.treeNodes.forEach(node => {
            node.root = this.root
        })

        treeNode.parent = this.parent
        treeNode.next = this.next
        treeNode.previous = this

        this.next = treeNode
    }

    /**
     * 删除当前节点
     */
    remove() {
        if (this.previous) this.previous.next = this.next
        if (this.next) this.next.previous = this.previous
        if (this.parent?.child === this) this.parent.child = this.next
        if (this.root?.child === this) this.root.child = this.next

        this.parent = void 0
        this.previous = void 0
        this.next = void 0

        this.treeNodes.forEach(node => {
            node.root = void 0
        })
    }

    clone() {
        return new TreeNode(this.data)
    }
}