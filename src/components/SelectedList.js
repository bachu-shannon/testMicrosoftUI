import React from 'react';
import {connect} from 'react-redux';
import {List} from 'office-ui-fabric-react/lib/List';

class SelectedList extends React.Component {
    renderCell(item) {
        return (
            <div data-is-focusable={true}>
                <span>{item.id}</span> <span>{item.name}</span>
            </div>
        )
    }

    render() {
        return (
            <div className="selected-list">
                <h2>Selected List</h2>
                <List
                    items={this.props.selectionStore.list}
                    onRenderCell={this.renderCell}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectionStore: state.selectionStore
    }
};

export default connect(mapStateToProps)(SelectedList);