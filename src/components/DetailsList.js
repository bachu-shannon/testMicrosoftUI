import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {getSelectedList} from '../actions/SelectionListAction';
import {loadMore} from '../actions/DetailsListAction';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';

initializeIcons(undefined, {disableWarnings: true});

class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionDetails: '',
            hasMore: true
        };
        this._selection = new Selection({
            onSelectionChanged: () => this.setState({selectionDetails: this.pushToSelectedList()})
        });
        this.scrollFunction = this.scrollListener.bind(this);
    }

    componentDidMount() {
        this.attachScrollListener();
    }

    targetElement() {
        return ReactDOM.findDOMNode(this);
    }

    scrollListener() {
        const items = this.props.itemsStore.items;
        const itemsLength = items.length;
        const limit = this.props.itemsStore.limit;
        const currentPage = this.props.itemsStore.currentPage;
        const el = this.targetElement();
        const elPosBottom = el.getBoundingClientRect().bottom;
        const scrolledBlock = el.getElementsByClassName('ms-DetailsList')[0];
        if (scrolledBlock !== undefined) {
            const scrolledBlockHeight = scrolledBlock.offsetHeight;
            const scrolledBlockPosBottom = scrolledBlock.getBoundingClientRect().bottom;
            if (scrolledBlockPosBottom - (scrolledBlockHeight / this.props.itemsStore.limit) < elPosBottom) {
                (itemsLength > currentPage * limit) ? this.props.loadMore() : this.detachScrollListener();
            }
        }
    }

    attachScrollListener() {
        const el = this.targetElement();
        el.addEventListener('scroll', this.scrollFunction, true);
        this.scrollListener();
    }

    detachScrollListener() {
        const el = this.targetElement();
        el.removeEventListener('scroll', this.scrollFunction, true);
    }

    pushToSelectedList() {
        const itemsSore = this.props.itemsStore.items;
        const selectedList = [];
        const arraySelectId = Object.keys(this._selection._exemptedIndices);
        let arraySelectIdLength = arraySelectId.length;
        for (let i = 0; arraySelectIdLength > i; i++) {
            selectedList.push(itemsSore[arraySelectId[i]]);
        }
        this.props.getSelectedList(selectedList);
    }

    renderDetailItems() {
        const items = [];
        let _limit = this.props.itemsStore.limit;
        const _currentPage = this.props.itemsStore.currentPage;
        _limit *= _currentPage;
        this.props.itemsStore.items.map(item => {
            if (items.length < _limit) {
                items.push({
                    key: item.id,
                    value: item.id,
                    name: item.name
                });
            }
        });

        let _columns = [
            {
                key: 'column1',
                name: 'Id',
                fieldName: 'value',
                minWidth: 50,
                maxWidth: 75,
                isResizable: true,
                ariaLabel: 'Operations for value'
            },
            {
                key: 'column2',
                name: 'Name',
                fieldName: 'name',
                minWidth: 50,
                maxWidth: 75,
                isResizable: true,
                ariaLabel: 'Operations for name'
            }
        ];

        return (
            <DetailsList
                items={items}
                columns={_columns}
                setKey='set'
                layoutMode={DetailsListLayoutMode.fixedColumns}
                selection={this._selection}
            />
        )
    }

    render() {
        return <div className="details">
            <div className="details-list">{this.renderDetailItems()}</div>
        </div>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSelectedList: (list) => dispatch(getSelectedList(list)),
        loadMore: () => dispatch(loadMore())
    }
};

const mapStateToProps = (state) => {
    return {
        itemsStore: state.itemsStore
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);