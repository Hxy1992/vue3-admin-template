import { VNode, ComponentPublicInstance, Ref } from "vue";
import { BreakPoint, Responsive } from "@/components/Grid/interface";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ProTableProps } from "@/components/ProTable/index.vue";
import ProTable from "@/components/ProTable/index.vue";

export interface EnumProps {
  label?: string; // 选项框显示的文字
  value?: string | number | boolean | any[]; // 选项框值
  disabled?: boolean; // 是否禁用此选项
  tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any;
}

/**
 * 表格列类型
 */
export type TypeProps = "index" | "selection" | "radio" | "expand" | "sort";

/**
 * 搜索框的类型
 */
export type SearchType =
  | "input"
  | "input-number"
  | "select"
  | "select-v2"
  | "tree-select"
  | "cascader"
  | "date-picker"
  | "time-picker"
  | "time-select"
  | "switch"
  | "slider";

/**
 * 自定义搜索内容渲染
 */
export type SearchRenderScope = {
  searchParam: { [key: string]: any };
  placeholder: string;
  clearable: boolean;
  options: EnumProps[];
  data: EnumProps[];
};

/**
 * 搜索项配置
 */
export type SearchProps = {
  /**
   * 当前项搜索框的类型
   */
  el?: SearchType;
  /**
   * 当前项搜索框的 label
   */
  label?: string;
  /**
   * 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
   */
  props?: any;
  /**
   * 当搜索项 key 不为 prop 属性时，可通过 key 指定
   */
  key?: string;
  /**
   * 搜索提示
   */
  tooltip?: string;
  /**
   * 搜索项排序（从大到小）
   */
  order?: number;
  /**
   * 搜索项所占用的列数，默认为 1 列
   */
  span?: number;
  /**
   * 搜索字段左侧偏移列数
   */
  offset?: number;
  /**
   * 搜索项默认值
   */
  defaultValue?: string | number | boolean | any[] | Ref<any>;
  /**
   * 自定义搜索内容渲染（tsx语法）
   */
  render?: (scope: SearchRenderScope) => VNode;
} & Partial<Record<BreakPoint, Responsive>>;

export type FieldNamesProps = {
  label: string;
  value: string;
  children?: string;
};

/**
 * 单元格自定义渲染
 */
export type RenderScope<T> = {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

/**
 * 表头自定义渲染
 */
export type HeaderRenderScope<T> = {
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

/**
 * 表格列配置
 */
export interface ColumnProps<T = any>
  extends Partial<Omit<TableColumnCtx<T>, "type" | "children" | "renderCell" | "renderHeader">> {
  /**
   * 列类型
   */
  type?: TypeProps;
  /**
   * 是否是标签展示
   */
  tag?: boolean | Ref<boolean>;
  /**
   * 是否显示在表格当中
   */
  isShow?: boolean | Ref<boolean>;
  /**
   * 是否在 ColSetting 中可配置
   */
  isSetting?: boolean | Ref<boolean>;
  /**
   * 搜索项配置
   */
  search?: SearchProps | undefined;
  /**
   * 枚举字典
   */
  enum?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>);
  /**
   * 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
   */
  isFilterEnum?: boolean | Ref<boolean>;
  /**
   * 指定 label && value && children 的 key 值
   */
  fieldNames?: FieldNamesProps;
  /**
   * 自定义表头内容渲染（tsx语法）
   */
  headerRender?: (scope: HeaderRenderScope<T>) => VNode;
  /**
   * 自定义单元格内容渲染（tsx语法）
   */
  render?: (scope: RenderScope<T>) => VNode | string;
  /**
   * 多级表头
   */
  _children?: ColumnProps<T>[];
}

export type ProTableInstance = Omit<InstanceType<typeof ProTable>, keyof ComponentPublicInstance | keyof ProTableProps>;
