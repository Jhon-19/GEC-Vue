import { KgAPI } from "@/constants/kg.constant";
import gecRequest from "@/service";
import type { IDataType } from "@/service/types";
import type {
  IAddNodeItem,
  IEditRelationPayload,
  IQueryPayload,
} from "./types";

export function queryLabelsRequest() {
  return gecRequest.get<IDataType>({
    url: KgAPI.QueryLabels,
  });
}

export function queryPropertiesRequest() {
  return gecRequest.get<IDataType>({
    url: KgAPI.QueryProperties,
  });
}

export function queryRelationsRequest() {
  return gecRequest.get<IDataType>({
    url: KgAPI.QueryRelations,
  });
}

export function queryGraphRequest(params: IQueryPayload) {
  return gecRequest.post<IDataType>({
    url: KgAPI.QueryGraph,
    data: params,
  });
}

export function queryRelatedNodeByIdRequest(id: string) {
  return gecRequest.post<IDataType>({
    url: KgAPI.QueryRelatedNodeById,
    data: { id },
  });
}

export function deleteNodeRequest(id: string) {
  return gecRequest.post<IDataType>({
    url: KgAPI.DeleteNode,
    data: { id },
  });
}

export function editRelationRequest(params: IEditRelationPayload) {
  return gecRequest.post<IDataType>({
    url: KgAPI.EditRelation,
    data: params,
  });
}

export function deleteEdgeRequest(edge: string) {
  return gecRequest.post<IDataType>({
    url: KgAPI.DeleteEdge,
    data: { edge },
  });
}

export function addNodeRequest(nodes: IAddNodeItem[]) {
  return gecRequest.post<IDataType>({
    url: KgAPI.AddNode,
    data: { nodes },
  });
}

export function editNodeRequest(params: any) {
  return gecRequest.post<IDataType>({
    url: KgAPI.EditNode,
    data: params,
  });
}

export function queryNodeByIdNameRequest(query: string) {
  return gecRequest.post<IDataType>({
    url: KgAPI.QueryNodeByIdName,
    data: { query },
  });
}

export function createRelationRequest(info: any) {
  return gecRequest.post<IDataType>({
    url: KgAPI.CreateRelation,
    data: info,
  });
}
