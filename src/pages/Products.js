import React from 'react';
import { connect } from 'react-redux'
import { helpers } from '../../CommonFunctions'
import {actions} from '../logic/actions/actions'
import { getFormattedProducts } from '../logic/actions/selector'
import { configuration } from '../../configuration';
import "./style.css"
import SortIcon from '../components/SortIcon';
import Loader from '../components/Loader/Loader';
class Products extends React.Component {

    adsKey = {}
    prevKey = 0
    constructor(props) {
        super(props);
        this.state={
            page:1
        }
    }

    componentDidMount(){
         window.addEventListener('scroll', this.onScroll, false)
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        const { loading, extra } = this.props
        let elem = document.getElementById("prod");
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - configuration.OFFSET_HEIGHT && !loading && extra) {
            this.setState(prevState => ({ page: prevState.page + 1 }), () => this.onLoadMoreProducts(this.state.page))
        }
    }

    
    onGetProducts = (page, sort) => {
        this.props.dispatch(actions.getProducts(sort || this.props.sort, page))
    }


    onLoadMoreProducts = (page, sort) => {
        this.props.dispatch(actions.loadMoreProducts(sort || this.props.sort, page))
    }


    onSortChange = val => {
        const { sort, loading } = this.props
        if (sort !== val && !loading) {
            this.setState({ page: 1 })
            this.adsKey = {}
            this.prevKey = 0
            this.onGetProducts(1, val)
        }
    }

    renderAds = key => {
        let rdKey = this.adsKey[key]
        if (!rdKey) {
            rdKey = helpers.randomAdsKey(this.prevKey)

            this.prevKey = rdKey
            this.adsKey[key] = rdKey
        }
        return (
            <tr>
                <td colSpan={5}>
                    <center><img src={"/ads/?r=" + rdKey} /></center>
                </td>
            </tr>
        )
    }


    render() {
        const { loading, data, extra, sort } = this.props;
        return (
            <div>
                <h1>Products</h1>
                <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
                {loading && <Loader/>}
                <div className="box" id="prod">
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                        <tr>
                            <th scope="col"><a onClick={() => this.onSortChange('id')}>Id <SortIcon/></a></th>
                            <th scope="col"><a onClick={() => this.onSortChange('size')}>Size <SortIcon/></a></th>
                            <th scope="col">Face</th>
                            <th scope="col"><a onClick={() => this.onSortChange('price')}>Price <SortIcon/></a></th>
                            <th scope="col">Date</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        {
                            data.map((p, index) => (
                                <tbody key={index}>
                                    {index && index % configuration.ADS_PER_ROW === 0 ? this.renderAds(p.id) : null}
                                    <tr>
                                        <td>{p.id}</td>
                                        <td>{p.size}</td>
                                        <td style={{ fontSize: p.size }}>{p.face}</td>
                                        <td>{p.price}</td>
                                        <td>{p.date}</td>
                                    </tr>
                                </tbody>
                            ))
                        }
                        {
                        !extra &&
                        <tbody>
                            <tr>
                                <td colSpan={5}>
                                  <center>  <p>~ end of catalogue ~</p></center>
                                </td>
                                
                            </tr>
                        </tbody>
                    }
                    </table>
                </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => ({
    ...state.products,
    data: getFormattedProducts(state)
})

export default connect(mapStateToProps)(Products)
