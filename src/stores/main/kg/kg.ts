import { defineStore } from "pinia";
import type { IKgState } from "./types";
import { reactive, toRefs } from "vue";
import {
  parseNodesAndEdges,
  parseRecord,
  transLabels,
  transProperties,
  transRelationsType,
} from "@/utils/kg";
import {
  addNodeRequest,
  createRelationRequest,
  deleteEdgeRequest,
  deleteNodeRequest,
  editNodeRequest,
  editRelationRequest,
  queryGraphRequest,
  queryLabelsRequest,
  queryNodeByIdNameRequest,
  queryPropertiesRequest,
  queryRelatedNodeByIdRequest,
} from "@/service/main/kg/kg";
import type {
  IAddNodeItem,
  ICreateRelationPayload,
  IEditRelationPayload,
  IQueryPayload,
} from "@/service/main/kg/types";

export const useKgStore = defineStore("knowledge-graph", () => {
  const kgState = reactive<IKgState>({
    dictLabels: [],
    dictAttrs: [],
    dictRelations: [],
    needReDraw: false,
  });
  function setDictLabels(val: Object[]) {
    kgState.dictLabels = val;
  }
  function setDictAttrs(val: Object[]) {
    kgState.dictAttrs = val;
  }
  function setAictRelations(val: Object[]) {
    kgState.dictRelations = val;
  }
  function setNeedReDraw(val: boolean) {
    kgState.needReDraw = val;
  }

  async function queryLabels() {
    const records = await parseRecord(queryLabelsRequest);
    const tmpLabels = transLabels(records);
    setDictLabels(tmpLabels);
  }

  async function queryProperties() {
    const records = await parseRecord(queryPropertiesRequest);
    const tmpProps = transProperties(records);
    setDictAttrs(tmpProps);
  }

  async function queryRelations() {
    const records = await parseRecord(queryPropertiesRequest);
    const tmpRelations = transRelationsType(records);
    setAictRelations(tmpRelations);
  }

  async function queryGraph(params: IQueryPayload) {
    const records = await parseRecord(queryGraphRequest, params);

    return parseNodesAndEdges(records);
  }

  async function queryRelatedNodeById(id: string) {
    const records = await parseRecord(queryRelatedNodeByIdRequest, id);

    return parseNodesAndEdges(records);
  }

  async function deleteNode(id: string) {
    const deleteResult = await deleteNodeRequest(id);

    return deleteResult.code === "200";
  }

  async function editRelation(params: IEditRelationPayload) {
    const editResult = await editRelationRequest(params);

    return editResult.code === "200";
  }

  async function deleteEdge(edge: string) {
    const deleteResult = await deleteEdgeRequest(edge);

    return deleteResult.code === "200";
  }

  async function addNode(nodes: IAddNodeItem[]) {
    const addResult = await addNodeRequest(nodes);

    return addResult.code === "200";
  }

  async function editNode(params: any) {
    const editResult = await editNodeRequest(params);

    return editResult.code === "200";
  }

  async function queryNodeByIdName(query: string) {
    const records = parseRecord(queryNodeByIdNameRequest, query);

    return records;
  }

  async function createRelation(info: ICreateRelationPayload) {
    const createResult = await createRelationRequest(info);

    return createResult.code === "200";
  }

  return {
    ...toRefs(kgState),
    setDictLabels,
    setDictAttrs,
    setAictRelations,
    setNeedReDraw,
    queryLabels,
    queryProperties,
    queryRelations,
    queryGraph,
    queryRelatedNodeById,
    deleteNode,
    editRelation,
    deleteEdge,
    addNode,
    editNode,
    queryNodeByIdName,
    createRelation,
  };
});
