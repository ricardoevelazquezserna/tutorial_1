import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Link from "next/link";

const getPathFormatted = (path: string): string => {
  let response = ''
  const splitPath = path.split('-');

  splitPath.forEach((item) => {
    const firstLetter = item.charAt(0)
    const remainingLetters = item.substring(1);
    response += ` ${firstLetter.toUpperCase()}${remainingLetters}`;
  });

  return response.trim();
}
export const getBreadcrumbItems = (fullPath: string): ItemType[] => {
  const items: ItemType[] = [];

  const splitPath = fullPath.split('/');
  splitPath.shift();

  splitPath.forEach((path, index) => {
    const formattedPath = getPathFormatted(path);
    if (!index) {
      items.push({ title: <Link href={`/${path}`}>{formattedPath}</Link> });
    } else {
      const currentPath = splitPath.slice(0, index + 1).join('/');
      items.push({ title: <Link href={`/${currentPath}`}>{formattedPath}</Link> });
    }      
  });

  return items;
}