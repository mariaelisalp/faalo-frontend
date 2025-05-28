import { TopicResponse } from "./topic-response.interface";

export class TopicTreeNode {
    id: number;
    name: string;
    parent?: number;

    tree: TopicTreeNode[] = [];

    constructor(id: number, name: string, parent?: number) {
        this.id = id;
        this.name = name;
        this.parent = parent;
    }

    static buildTree(topics: TopicResponse[]): TopicTreeNode[] {
        const nodeMap = new Map<number, TopicTreeNode>();
        const roots: TopicTreeNode[] = [];

        for (const topic of topics) {
            const node = new TopicTreeNode(topic.id, topic.name, topic.parent);
            nodeMap.set(topic.id, node);
        }

        for (const topic of topics) {
            const node = nodeMap.get(topic.id);
            const parentId = topic.parent;

            if (node && parentId !== null && parentId !== undefined) {
                const parentNode = nodeMap.get(parentId);
                if (parentNode) {
                    parentNode.tree.push(node);
                }
            } else if (node) {
                roots.push(node);
            }
        }

        return roots;
    }
}