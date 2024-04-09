export interface IKgState {
  dictLabels: Object[]; // 标签列表
  dictAttrs: Object[]; // 属性列表
  dictRelations: Object[]; // 关系列表
  needReDraw: boolean; // 是否需要重新请求渲染视图
}
