import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

interface IconType {
  size?: SizeProp;
}
export const TrashIcon: React.FC<IconType> = ({ size }) => (
  <FontAwesomeIcon
    size={size || undefined}
    icon={findIconDefinition({
      prefix: 'far',
      iconName: 'trash-alt'
    })}
  />
);

export const SaveIcon: React.FC<IconType> = ({ size }) => (
  <FontAwesomeIcon
    size={size || undefined}
    icon={findIconDefinition({
      prefix: 'far',
      iconName: 'save'
    })}
  />
);

export const ToggleOn: React.FC<IconType> = ({ size }) => (
  <FontAwesomeIcon
    size={size || undefined}
    icon={findIconDefinition({
      prefix: 'fas',
      iconName: 'toggle-on'
    })}
  />
);

export const ToggleOff: React.FC<IconType> = ({ size }) => (
  <FontAwesomeIcon
    size={size || undefined}
    icon={findIconDefinition({
      prefix: 'fas',
      iconName: 'toggle-off'
    })}
  />
);

export const RightArrowIcon: React.FC<IconType> = ({ size }) => (
  <FontAwesomeIcon
    size={size || undefined}
    icon={findIconDefinition({
      prefix: 'far',
      iconName: 'arrow-alt-circle-right'
    })}
  />
);

export const PlusIcon: React.FC<IconType> = ({ size }) => (
  <FontAwesomeIcon
    size={size || undefined}
    icon={findIconDefinition({
      prefix: 'fas',
      iconName: 'plus'
    })}
  />
);
