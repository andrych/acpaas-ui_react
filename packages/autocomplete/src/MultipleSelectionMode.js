import type {IMode, Item} from "./types";
import * as React from 'react';

export class MultipleSelectionMode implements IMode {
  component;

  constructor(component: React.Component) {
    this.component = component;
  }

  select(item: Item): void {
    if (this.component.state.selection.findIndex(s => s.value === item.value) > -1)
      return;

    const selection = this.component.state.selection;
    selection.push(item);
    this.component.setState({
      ...this.component.state,
      selection
    });
    this.component.props.onSelection && this.component.props.onSelection(selection.map(i => i.value));
    this.component.formControl.setValue('');
    this.component.closePane();
  }

  unselect(item: Item): void {
    const selection = this.component.state.selection;
    const index = selection.findIndex(s => s.value === item.value);
    if (index > -1) {
      selection.splice(index, 1);
    }
    this.component.setState({
      ...this.component.state,
      selection
    });
    this.component.props.onSelection && this.component.props.onSelection(selection.map(i => i.value));
  }
}
