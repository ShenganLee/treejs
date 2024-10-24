// import { TreeNode } from './tree-node'

export class Tree {
    child = void 0;
    getChildrenFunction = void 0;
    
    constructor(
        getChildrenFunction = (data) => Reflect.get(data, 'children')
    ) {
        this.getChildrenFunction = getChildrenFunction;
    }

    /**
     *  迭代器方法
     */
    *[Symbol.iterator]() {
        let child = this.child
        while(child) {
            for (let item of child) {
                yield item
            }
            child = child.next
        }
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
     * 所有子级节点
     */
    get childTreeNodes() {
        return Array.from(this)
    }

    getChildren(deep) {
        if (typeof deep === 'number') {
            return this.childTreeNodes.filter(node => node.deep <= deep)
        }
        return this.childTreeNodes 
    }

    hasChild(treeNode) {
        return treeNode.root === this
    }

    appendChild(treeNode) {
        treeNode.remove()

        if (!this.child) {
            treeNode.treeNodes.forEach(node => {
                node.root = this
            })
            this.child = treeNode
            return
        }

        const lastChild = this.children.pop()
        lastChild.insertNext(treeNode)
    }

    clone() {
        const newTree = new Tree(this.getChildrenFunction)
        if (!this.child) {
            return newTree
        }

        const weakMap = new WeakMap()

        this.childTreeNodes.forEach(node => {
            weakMap.set(node, node.clone())
        })

        this.childTreeNodes.forEach(node => {
            const newNode = weakMap.get(node)
            if (node.parent) {
                const newParent = weakMap.get(node.parent)
                newNode.parent = newParent
            }

            if (node.previous) {
                const newPrevious = weakMap.get(node.previous)
                newNode.previous = newPrevious
            }

            if (node.next) {
                const newNext = weakMap.get(node.next)
                newNode.next = newNext
            }

            if (node.child) {
                const newChild = weakMap.get(node.child)
                newNode.child = newChild
            }
        })

        const newChild = weakMap.get(this.child)
        
        newTree.child = newChild

        return newTree
    }

}