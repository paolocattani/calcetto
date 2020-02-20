import React, { Component } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

export class OrganizationChartDemo extends Component<{}, { data: any }> {
  constructor() {
    super({});
    this.state = {
      data: [
        {
          label: 'F.C Barcelona',
          expanded: true,
          children: [
            {
              label: 'F.C Barcelona',
              expanded: true,
              children: [
                {
                  label: 'Chelsea FC'
                },
                {
                  label: 'F.C. Barcelona'
                }
              ]
            },
            {
              label: 'Real Madrid',
              expanded: true,
              children: [
                {
                  label: 'Bayern Munich'
                },
                {
                  label: 'Real Madrid'
                }
              ]
            }
          ]
        }
      ]
    };
  }

  nodeTemplate(node: any) {
    return (
      <div>
        <div className="node-header">{node.label}</div>
        <div className="node-content">
          <img
            alt={'alt'}
            src={
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhatrabbits.com%2Fen%2Frandom-image%2F&psig=AOvVaw3VD3g57vwemM9u2icQ-9Gk&ust=1582217202429000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjSs8SI3ucCFQAAAAAdAAAAABAO'
            }
            style={{ width: '32px' }}
          />
          <div>{'name'}</div>
        </div>
      </div>
    );
  }

  render() {
    return <OrganizationChart value={this.state.data} nodeTemplate={this.nodeTemplate}></OrganizationChart>;
  }
}
