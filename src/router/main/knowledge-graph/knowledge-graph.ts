const knowledgeGraph = () =>
  import("@/views/main/knowledge-graph/knowledge-graph.vue");

export default {
  path: "/main/knowledge-graph",
  name: "knowledge-graph",
  component: knowledgeGraph,
};
