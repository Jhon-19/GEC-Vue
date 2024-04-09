import {
  SYSTEM_NODE_LABELS,
  SYSTEM_NODE_LABEL_NAME,
  SYSTEM_NODE_ID,
  SYSTEM_NODE_NAME,
  SYSTEM_NODE_PROPERTIES,
  SYSTEM_NODE_RELATIONS,
} from "./../constants/kg.constant";
import type { IDataType } from "@/service/types";
import { ElMessage } from "element-plus";

export interface IKgObject {
  [key: string]: any;
}

/**
 * 转换节点属性值
 * @param {any} val 属性值
 * @returns 转换后的值
 */
export function transFiled(val: Object) {
  if (val && val.hasOwnProperty("low") && val.hasOwnProperty("high")) {
    return val["low" as keyof Object];
  } else {
    return val;
  }
}

/**
 * 处理查询节点结果
 * @param {Array} records 查询记录
 * @param {Boolean} isNode records项是否为node
 * @returns 节点数组
 */
export function transNodes(records: any[]) {
  const res: Object[] = [];
  records.forEach((i) => {
    let node = i;
    if (node.hasOwnProperty("n")) {
      node = i.n;
    }
    let item: IKgObject = {
      [SYSTEM_NODE_ID]: transFiled(node.identity),
      [SYSTEM_NODE_LABEL_NAME]: node.labels,
    };
    let nodeProps = node.properties;
    for (let p in nodeProps) {
      item[p] = transFiled(nodeProps[p]);
    }
    res.push(item);
  });

  return res;
}

/**
 * 处理查询关系结果
 * @param {Array<Record>} records 查询记录
 * @param {Boolean} isEdge records项是否为edge
 * @returns 节点数组
 */
export function transRelations(records: any[]) {
  const res: Object[] = [];
  records.forEach((i) => {
    let segments = i.segments;
    segments.forEach((j: any) => {
      let edge = j.relationship;
      let props: IKgObject = {};
      for (let p in edge.properties) {
        props[p] = transFiled(edge.properties[p]);
      }
      res.push({
        [SYSTEM_NODE_ID]: transFiled(edge.identity),
        from: transFiled(edge.start),
        fromName: j.start.properties[SYSTEM_NODE_NAME],
        to: transFiled(edge.end),
        toName: j.end.properties[SYSTEM_NODE_NAME],
        label: edge.type,
        props: props,
      });
    });
  });

  return res;
}

/**
 * 处理查询标签结果
 * @param {Array<Record>} records 查询记录
 * @returns 标签字典数组
 */
export function transLabels(records: Object[]) {
  const res: Object[] = [];
  records.forEach((i) => {
    const labels = Object.values(i);
    labels.forEach((label) => {
      if (!SYSTEM_NODE_LABELS.includes(label)) {
        res.push({ label: label, value: label });
      }
    });
  });
  return res;
}

/**
 * 处理查询属性结果
 * @param {Array<Record>} records 查询记录
 * @returns 属性字典数组
 */
export function transProperties(records: Object[]) {
  const res: Object[] = [];
  records.forEach((i) => {
    const attrs = Object.values(i);
    attrs.forEach((attr) => {
      if (!SYSTEM_NODE_PROPERTIES.includes(attr)) {
        res.push({ label: attr, value: attr });
      }
    });
  });
  return res;
}

/**
 * 处理查询关系类型结果
 * @param {Array<Record>} records 查询记录
 * @returns 关系类型字典数组
 */
export function transRelationsType(records: Object[]) {
  const res: Object[] = [];
  records.forEach((i) => {
    const relations = Object.values(i);
    relations.forEach((relation) => {
      if (!SYSTEM_NODE_RELATIONS.includes(relation)) {
        res.push({ label: relation, value: relation });
      }
    });
  });
  return res;
}

/**
 * 检查目标数组是否包含系统内置标签名
 * @param { Array } labels
 * @returns
 */
export function checkExistSysLabel(labels: string[]) {
  for (let k of labels) {
    if (SYSTEM_NODE_LABELS.includes(k)) {
      return k;
    }
  }
  return false;
}

/**
 * 检查目标数组是否包含系统内置属性
 * @param { Array } labels
 * @returns
 */
export function checkExistSysProp(attrs: string[]) {
  for (let k of attrs) {
    if (SYSTEM_NODE_PROPERTIES.includes(k)) {
      return k;
    }
  }
  return false;
}

export async function parseRecord(fun: Function, params: any = undefined) {
  let queryResult: IDataType;
  if (params) {
    queryResult = await fun(params);
  } else {
    queryResult = await fun();
  }

  let records;
  if (queryResult.code === "200") {
    records = queryResult.data;
  } else {
    ElMessage.error("数据访问失败");
  }

  return records;
}

export function parseNodesAndEdges(records: any) {
  const nodes = records[0]["nodes"] || [];
  const edges = records[0]["edges"] || [];
  return { nodes, edges };
}
