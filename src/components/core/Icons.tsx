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

// Wrapper per icone FontAwesome
const Icon: React.FC<AbstractIconProps> = ({ size, prefix, iconName, color }) => (
  <FontAwesomeIcon color={color} size={size} icon={findIconDefinition({ prefix, iconName })} />
);

// Regular
export const TrashIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix="far" iconName="trash-alt" />
);
export const SaveIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix="far" iconName="save" />
);
export const RightArrowIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} prefix="fas" iconName="arrow-alt-circle-right" />
);

// Solid
export const ToggleOn: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix="fas" iconName="toggle-on" />
);
export const ToggleOff: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix="fas" iconName="toggle-off" />
);
export const PlusIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix="fas" iconName="plus" />
);
export const TrophyIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix="fas" iconName="trophy" />
);
export const DoubleRightIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix="fas" iconName="angle-double-right" />
);
export const BanIcon: React.FC<IconProps> = ({ size, color }) => (
  <Icon size={size} color={color} prefix="fas" iconName="ban" />
);
