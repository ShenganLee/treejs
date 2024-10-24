```typescript
Tree<T>:
		protected child?: TreeNode<T>
		protected readonly getChildrenFunction: getChildrenFunctionType
    
    new (getChildrenFunction: getChildrenFunctionType)

		get size(): number
    
    get children(): TreeNode<T>[]
		// get treeNodes(): TreeNode<T>[]
		get childTreeNodes: TreeNode<T>[]

    getChildren(deep?: number): TreeNode<T>

		hasChild(treeNode: TreeNode<T>): boolean
    replaceChild(treeNode: TreeNode<T>): void
		appendChild(treeNode: TreeNode<T>): TreeNode<T>
    // removeChild(treeNode: TreeNode<T>): TreeNode<T>
      
    // insertBefore(newTreeNode: TreeNode<T>, referenceTreeNode?: TreeNode<T>): TreeNode<T>
		// insertAfter(newTreeNode: TreeNode<T>, referenceTreeNode?: TreeNode<T>): TreeNode<T>

    clone(): Tree<T>
		pruning(fn: (data: T, node: TreeNode<T>) => boolean): Tree<T>
      
    shuttleToLeaf(fn: (data: T, node: TreeNode<T>) => void): void
    
```

```typescript
TreeNode<T>:
    data: T
    root: Tree<T>
    parent: TreeNode<T>
    previous: TreeNode<T>
    next: TreeNode<T>
    child: TreeNode<T>
    
    new (data: T);

		get deep(): number
    get index(): number
    get size(): number
    
    get children(): TreeNode<T>[]
    get treeNodes(): TreeNode<T>[]
		get childTreeNodes: TreeNode<T>[]

		getParents(deep?: number): TreeNode<T>
    getChildren(deep?: number): TreeNode<T>

		hasChild(treeNode: TreeNode<T>): boolean
    // replaceChild(treeNode: TreeNode<T>): void
    appendChild(treeNode: TreeNode<T>): TreeNode<T>
    // removeChild(treeNode: TreeNode<T>): TreeNode<T>

    insertPrevious(newTreeNode: TreeNode<T>): TreeNode<T>
		insertNext(newTreeNode: TreeNode<T>): TreeNode<T>

    // insertBefore(newTreeNode: TreeNode<T>, referenceTreeNode?: TreeNode<T>): TreeNode<T>
		// insertAfter(newTreeNode: TreeNode<T>, referenceTreeNode?: TreeNode<T>): TreeNode<T>

		clone(): TreeNode<T>
    remove(): TreeNode<T>
      
    shuttleToRoot(fn: (data: T, node: TreeNode<T>) => void): void
    shuttleToLeaf(fn: (data: T, node: TreeNode<T>) => void): void
    

```

