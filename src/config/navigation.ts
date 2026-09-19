import {
  BookOpen,
  Code2,
  Compass,
  Gamepad2,
  Keyboard,
  MessagesSquare,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

// 导航条目契约：消费者（SiteHeader / WikiSidebar 等）读取 key、path 两个字段，
// key 是 next-intl 翻译键（对应 en.json 的 nav 命名空间），path 是 URL。
// 二者不能混为一个字段：key 允许 camelCase，path 必须是真实的 URL slug。
// path 收窄为 `/${string}` 字面量类型，漏写或写错前缀会在 TS 层直接报错。
type NavigationItem = {
  key: string;
  path: `/${string}`;
  icon: LucideIcon;
  isContentType: boolean;
};

// 分类真相源：0_meta 的 关键词.json → categories[].category，
// 必须与 articles/<locale>/ 下的文章子目录名一一对应。
export const NAVIGATION_CONFIG = [
  { key: "guide", path: "/guide", icon: BookOpen, isContentType: true },
  { key: "mechanics", path: "/mechanics", icon: Compass, isContentType: true },
  { key: "roles", path: "/roles", icon: Users, isContentType: true },
  { key: "modes", path: "/modes", icon: Gamepad2, isContentType: true },
  { key: "controls", path: "/controls", icon: Keyboard, isContentType: true },
  { key: "progression", path: "/progression", icon: TrendingUp, isContentType: true },
  { key: "codes", path: "/codes", icon: Code2, isContentType: true },
  { key: "community", path: "/community", icon: MessagesSquare, isContentType: true },
] satisfies readonly NavigationItem[];

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
