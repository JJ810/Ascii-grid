import React, { Component } from "react";
import { connect } from 'react-redux'
import {actions} from '../logic/actions/actions'
import Loader from "../components/Loader/Loader";
import Product from "../pages/Products"
import { configuration } from "../../configuration";
class BaseLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page:1,
            waiting:true
        }
    }
    componentDidMount() {
        this.onGetProducts(this.state.page)
        const {data} = this.props;
        this.setState({waiting:false})
    }



    onGetProducts = (page, sort) => {
        this.props.dispatch(actions.getProducts(sort || this.props.sort, page))
    }

    

    render() {
        const {loading} = this.props;
        const {waiting} = this.state;
        
        return (
              <div>
                {waiting && <Loader/>}
                {!waiting && (
                   
                    <Product
                        {...this.props}
                        {...this.state}
                    />
                    
                )}
            </div>
            
        );
    }
};
const mapStateToProps = state => {
    return {
        ...state.products
    }
};

const mapDispatchToProps = dispatch => {
    return { 
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);

