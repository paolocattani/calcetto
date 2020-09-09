import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition, SizeProp, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  color?: string;
  size?: SizeProp;
}

interface AbstractIconProps extends IconProps {
  prefix: IconPrefix;
  iconName: IconName;
}

const SOLID = 'fas';
const REGULAR = 'far';

// Wrapper per icone FontAwesome
const Icon: React.FC<AbstractIconProps> = ({ size, prefix, iconName, color }) => (
  <FontAwesomeIcon color={color} size={size} icon={findIconDefinition({ prefix, iconName })} />
);

// Regular
export const TrashIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={REGULAR} iconName="trash-alt" />
);
export const SaveIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={REGULAR} iconName="save" />
);

// Solid
export const LogoutIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="sign-out-alt" />
);
export const UserIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="user" />
);
export const MaleIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="male" />
);
export const LanguageIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="language" />
);
export const HomeIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="home" />
);
export const BroomIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="broom" />
);
export const RightArrowIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="arrow-alt-circle-right" />
);
export const LeftArrowIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="arrow-alt-circle-left" />
);
export const TimesIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="times" />
);
export const ToggleOn: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="toggle-on" />
);
export const ToggleOff: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="toggle-off" />
);
export const PlusIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="plus" />
);
export const TrophyIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="trophy" />
);
export const DoubleRightIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="angle-double-right" />
);
export const BanIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix={SOLID} iconName="ban" />
);
