// export type TreeNodeDataType = Record<string | number | symbol, any>

export type getChildrenFunctionType = (<T>(data: T) => T[])

export type TreeNodeDataType<V, K extends string = 'children'> = V & {
    [key in K]?: TreeNodeDataType<V, K>[];
}


export type pidType = string | number | symbol

export interface TreeFormatter {
    // format<V, K extends string = 'children', K1 extends string = 'children'>(
    //     array: unknown[],
    // )

    formatFromFlatArray<V, K extends string = 'children'> (
        flatArray: unknown[],
        pid: pidType | ((item: unknown) => pidType),
        format: (item: unknown, childrenKey: K) => V,
    ): TreeNodeDataType<V, K>[];

    
}

export interface Tree<T> {
    children: TreeNodeType<T>;

    new(): Tree<T>;


}

export interface TreeNodeType<T> {
    // 节点属性
    data: T;
    // 根节点
    root?: TreeNodeType<T>;
    // 父节点
    parent?: TreeNodeType<T>;
    // 同级前一个节点
    previous?: TreeNodeType<T>;
    // 同级下一个节点
    next?: TreeNodeType<T>;
    // 子节点(第一个)
    child?: TreeNodeType<T>;

    new (data: T): TreeNodeType<T>;

    [Symbol.iterator](): IterableIterator<TreeNodeType<T>>;

    readonly size: number;

    readonly depth: number;

    readonly index: number;

    getParents(deep?: number): TreeNodeType<T>[];
    getParentsWithCurrent(deep?: number): TreeNodeType<T>[];

    getChildren(depth?: number): TreeNodeType<T>[];
    getChildrenWithCurrent(depth?: number): TreeNodeType<T>[];

    hasChild(treeNode: TreeNodeType<T>): boolean;
    
    appendChild(treeNode: TreeNodeType<T>): TreeNodeType<T>;
    removeChild(treeNode: TreeNodeType<T>): TreeNodeType<T>;

    insertPrevious(newTreeNode: TreeNodeType<T>): TreeNodeType<T>;
	insertNext(newTreeNode: TreeNodeType<T>): TreeNodeType<T>;

    replaceChild(treeNode: TreeNodeType<T>, referenceTreeNode: TreeNodeType<T>): void;
    insertBefore(newTreeNode: TreeNodeType<T>, referenceTreeNode?: TreeNodeType<T>): TreeNodeType<T>;
	insertAfter(newTreeNode: TreeNodeType<T>, referenceTreeNode?: TreeNodeType<T>): TreeNodeType<T>;

    clone(): TreeNodeType<T>
    remove(): TreeNodeType<T>
}

