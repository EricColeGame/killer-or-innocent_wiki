import type { LucideIcon } from "lucide-react";

// 导航条目契约：消费者（SiteHeader / WikiSidebar 等）读取 key、path 两个字段，
// icon 为列表图标，isContentType 决定该路径是否纳入 CONTENT_TYPES。
type NavigationItem = {
  key: string;
  path: string;
  icon: LucideIcon;
  isContentType: boolean;
};

// 内容型导航已清空，待后续阶段按新主题重建。
export const NAVIGATION_CONFIG: readonly NavigationItem[] = [];

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
