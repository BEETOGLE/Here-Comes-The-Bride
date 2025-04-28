import { IconType } from 'react-icons';
import { SVGAttributes } from 'react';

declare module 'react-icons/fi' {
  export const FiMenu: IconType;
  export const FiX: IconType;
  export const FiTool: IconType;
  export const FiHome: IconType;
  export const FiPackage: IconType;
  export const FiTruck: IconType;
  export const FiShield: IconType;
  export const FiStar: IconType;
  export const FiClock: IconType;
  export const FiMap: IconType;
  export const FiPhone: IconType;
  export const FiMail: IconType;
  export const FiMapPin: IconType;
  export const FiFacebook: IconType;
  export const FiInstagram: IconType;
  export const FiTwitter: IconType;
}

declare module 'react-icons' {
  export interface IconType extends React.FC<SVGAttributes<SVGElement>> {}
} 