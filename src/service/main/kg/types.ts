import type {
  SYSTEM_NODE_ID,
  SYSTEM_RELATION_COMMENT,
} from "@/constants/kg.constant";

export interface IQueryPayload {
  labels: string;
  attr: string;
  value: string;
}

export interface IEditRelationPayload {
  [SYSTEM_NODE_ID]: any;
  from: any;
  to: any;
  [SYSTEM_RELATION_COMMENT]: any;
  label: string;
}

export interface IAddNodeItem {
  label: string;
  value: any[];
  immutableAttr: boolean;
  isLabel: boolean;
}

export interface ICreateRelationPayload {
  from: any;
  target: any;
  relation: any;
  comment: any;
}
