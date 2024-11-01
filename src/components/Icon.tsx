import { type MouseEventHandler } from "react";
import clsx from "clsx";
import Back from "./SVG/ArrowBack"
import Copy from "./SVG/Copy"
import Delete from "./SVG/Delete";
import CheckCircle from "./SVG/CheckCircle";
import NextJS from "./SVG/NextJS";
import LogoReact from "./SVG/React";
import Javascript from "./SVG/Javascript";
import Typescript from "./SVG/Typescript";
import Wordpress from "./SVG/Wordpress";
import IconShare from "./SVG/Share";
import User from "./SVG/User";
import Edit from "./SVG/Edit";

interface IconProps {
  id: IconId;
  size?: number;
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
  title?: string;
}
export type IconId = keyof typeof ICONS_MAP

export const ICONS_MAP = {
  arrowBack: Back ,
  copy: Copy,
  delete: Delete,
  checkCircle: CheckCircle,
  next: NextJS,
  react: LogoReact,
  javascript: Javascript,
  typescript: Typescript,
  wordpress: Wordpress,
  share: IconShare,
  user: User,
  edit: Edit
} as const satisfies Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;

export default function Icon({ id, size, className, onClick, title }: IconProps): JSX.Element {
  const IconSVG = ICONS_MAP[id];
  return (
    <IconSVG className={clsx(className, "hover:fill-gray-500 transition-colors", {"cursor-pointer": !!onClick})} width={size} height={size} onClick={onClick}>
      {title && <title>{title}</title>}
    </IconSVG>
  );
}
