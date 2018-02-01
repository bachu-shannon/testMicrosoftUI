import React from "react";
import {connect} from 'react-redux';
import DetailsList from '../components/DetailsList';
import SelectedList from '../components/SelectedList';
import Scroll from '../components/Scroll';
import {getDetailsRequest} from '../actions/DetailsListAction';

class App extends React.Component {
    componentDidMount() {
        this.props.getDetailsList();
    }

    render() {
        return (
            <div>
                <DetailsList/>
                {(this.props.selectionStore.list.length !== 0) ? <SelectedList/> : ''}
                <Scroll/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailsList: () => dispatch(getDetailsRequest())
    }
};

const mapStateToProps = (state) => {
    return {
        selectionStore: state.selectionStore,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);