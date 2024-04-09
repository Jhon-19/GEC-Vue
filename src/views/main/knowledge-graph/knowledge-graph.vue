<template>
  <div class="graph-home">
    <div class="home-opera">
      <search-btn class="opera-item" @click="showSearch = !showSearch" />
      <tool-box class="opera-item" @click="showOperaModal" />
      <theme-switch class="opera-item" />
      <git-link class="opera-item" />
    </div>
    <draw-board
      ref="graphIns"
      class="graph-instance"
      :class="{ 'is-blur': showSearch }"
      :graph-nodes="nodes"
      :graph-edges="edges"
      :nodes-map="nodesMap"
      :edges-map="edgesMap"
      @edit-info="editInfo"
      @edit-relation="editRelation"
      @query-network="queryNetwork"
      @delete-node="reload"
      @delete-edge="reload"
      @edit-edge="reload"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    />
    <search-input
      v-model:labels="searchLabels"
      v-model:attr="searchAttr"
      v-model:value="searchValue"
      :visible="showSearch"
      @search="searchGraph"
    />
    <opera-modal v-model:visible="showOpera" @reload="reload" :mode="mode" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide } from "vue";
import { ElMessage } from "element-plus";
import SearchBtn from "./components/tools/SearchBtn.vue";
import ThemeSwitch from "./components/tools/ThemeSwitch.vue";
import GitLink from "./components/tools/GitLink.vue";
import ToolBox from "./components/tools/ToolBox.vue";
import SearchInput from "./components/feature/SearchInput.vue";
import OperaModal from "./components/feature/OperaModal.vue";
import DrawBoard from "./components/graph/DrawBoard.vue";
import { useKgStore } from "@/stores/main/kg/kg";
import { transNodes, transRelations } from "@/utils/kg";
import { SYSTEM_NODE_ID } from "@/constants/kg.constant";

import "@/styles/kg.style.less"; // import styles for kg

const kgStore = useKgStore();

/**
 * 查询图谱的全部标签，属性以及关系
 * @param {Array} dict 需要查询的图谱内容，包含标签，属性，关系
 * @returns cypher query result
 */
async function getGraphDict(dict = ["label", "prop", "relation"]) {
  if (dict.includes("label")) {
    await kgStore.queryLabels();
  }
  if (dict.includes("prop")) {
    await kgStore.queryProperties();
  }
  if (dict.includes("relation")) {
    await kgStore.queryRelations();
  }
}

provide("getGraphDict", getGraphDict);

/** @功能 全局搜索 */
const nodes = ref([]);
const nodesMap = ref({});
const edges = ref([]);
const edgesMap = ref({});
const searchLabels = ref([]);
const searchAttr = ref();
const searchValue = ref("");
const showSearch = ref(false);
// 搜索
async function searchGraph() {
  let params = {
    labels: searchLabels.value,
    attr: searchAttr.value,
    value: searchValue.value,
  };
  const { nodes, edges } = await kgStore.queryGraph(params);
  if (nodes.length > 0) {
    handleNodes(nodes, true);
    handleEdges(edges, true);
  } else {
    ElMessage("未查询到符合条件的节点");
  }
}

/* 挂载时查询 初始化 */
onMounted(async () => {
  await getGraphDict();
  await searchGraph();
});
/* 刷新 */
async function reload() {
  await searchGraph();
}
// 转换节点
function handleNodes(records) {
  nodes.value = transNodes(records);
  nodesMap.value = {};
  nodes.value.forEach((i) => {
    nodesMap.value[i[SYSTEM_NODE_ID]] = i;
  });
}
// 转换关系
function handleEdges(records) {
  edges.value = transRelations(records);
  edgesMap.value = {};
  edges.value.forEach((i) => {
    edgesMap.value[i[SYSTEM_NODE_ID]] = i;
  });
}

/* 空格快捷键 */
function toggleSearch(event) {
  if (event.key === " " || event.code === "Space" || event.keyCode === 32) {
    showSearch.value = !showSearch.value;
  }
}
onMounted(() => {
  document.addEventListener("keydown", toggleSearch);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", toggleSearch);
});

/* 监听鼠标按下放开事件 */
const downTime = ref();
function handleMouseDown() {
  downTime.value = Date.now();
}
function handleMouseUp() {
  if (Date.now() - downTime.value < 500) {
    showSearch.value = false;
  }
}

/** @功能 全局操作 */
const mode = ref(1);
const focusNode = ref();
const showOpera = ref(false);

/* 打开model */
function showOperaModal() {
  mode.value = 1;
  focusNode.value = null;
  showOpera.value = true;
}

/** @功能 编辑节点信息 */
function editInfo(id) {
  mode.value = 2;
  showOpera.value = true;
  focusNode.value = nodesMap.value[id];
}

/** @功能 编辑/创建关系 */
function editRelation(id) {
  mode.value = 3;
  showOpera.value = true;
  focusNode.value = nodesMap.value[id];
}

/** @功能 查询与目标节点直接关联的节点及关系 */
const graphIns = ref();
async function queryNetwork(id) {
  const { nodes: nodeList, edges: edgeList } =
    await kgStore.queryRelatedNodeById(id);
  const tNodes = transNodes(nodeList);
  const tEdges = transRelations(edgeList);
  // 存储节点 关系信息
  const resNodes = [];
  tNodes.forEach((i) => {
    if (!nodesMap.value[i[SYSTEM_NODE_ID]]) {
      resNodes.push(i);
      nodesMap.value[i[SYSTEM_NODE_ID]] = i;
    }
  });
  const resEdges = [];
  tEdges.forEach((i) => {
    if (!edgesMap.value[i[SYSTEM_NODE_ID]]) {
      resEdges.push(i);
      edgesMap.value[i[SYSTEM_NODE_ID]] = i;
    }
  });
  if (resNodes.length > 0) {
    nodes.value.push(...resNodes);
    edges.value.push(...resEdges);

    // 子组件更新节点 关系
    graphIns.value.addNodesAndEdges(resNodes);
    graphIns.value.addNodesAndEdges(resEdges, "edge");
  } else {
    ElMessage("暂无关联节点");
  }
}

/* 注入当前操作node */
provide("focusNode", focusNode);
</script>

<style lang="less" scoped>
.graph-home {
  height: 100%;
  position: relative;
}
.home-opera {
  position: absolute;
  right: 0;
  padding: 0.5rem;
  width: 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .opera-item {
    width: var(--opera-tool-width);
    height: var(--opera-tool-height);
    margin: calc(var(--opera-tool-width) / 3) 0;
    font-size: var(--opera-tool-font-size);
    cursor: pointer;
  }
}
.graph-instance {
  width: 100%;
  height: 100%;
  // transition: transform var(--starry-sky-transition-time), filter var(--starry-sky-transition-time);
  // &.is-blur {
  //   transform: scale(1.1);
  //   filter: blur(1rem);
  // }
}
</style>
