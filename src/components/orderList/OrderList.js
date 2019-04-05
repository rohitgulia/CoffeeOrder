import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {connect} from "react-redux";
import {getOrderList} from "./orderListAction";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Header } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import moment from 'moment';
import { Label } from 'semantic-ui-react';
import OrderDetails from '../orderDetails/OrderDetails';
import Visibility from '@material-ui/icons/Visibility';
import {orderDetailObj} from "../orderDetails/util/orderDetailObj";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class _OrderList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            openDialog: false,
            errorMsg: '',
            orderDetailObj
        };
    }

    componentDidMount() {
        try {
            this.props.getOrderList();
        }catch (e) {
            this.setState({errorMsg:'Error occured!!'});
        }
    }
    handleDialogOpenClose = (isOpen) => {
        this.setState({ openDialog: isOpen });
        if(!isOpen)
            this.setState({orderDetailObj: orderDetailObj});
    }
    getCurrentMonth = () => {
        return moment(new Date()).format('MMM');
    }
    getCurrentDate = () => {
        return new Date().getDay();
    }
    getHeader = () => {
        return (
            <Grid container spacing={24} style={{'margin-bottom': '20px'}}>
                <Grid item xs={3} sm={2}>
                    <Label size={'huge'}>
                        <div>
                            {this.getCurrentMonth()}
                        </div>
                        <div style={{'margin':'5px','text-align':'center'}}>
                            {this.getCurrentDate()}
                        </div>
                    </Label>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Header as='h2'>Perfectly Ground Work Orders</Header>
                </Grid>
                <Grid item xs={4} sm={4} style={{'text-align': 'right'}}>
                    <Button variant="outlined" color="blue" onClick={() => this.handleDialogOpenClose(true)}>
                        CREATE ORDER
                    </Button>
                </Grid>
            </Grid>
        );
    };

    handleOrderView = (state, rowInfo, column, instance) => {
        return {
            onClick: () => {
                if(column.Header === "View") {
                    this.setState({orderDetailObj: {...orderDetailObj ,...rowInfo.original} });
                    this.handleDialogOpenClose(true);
                }
            }
        }
    }

    render() {
        const { orderList, classes } = this.props;
        return (
            <div className={classes.root}>
                {this.getHeader()}
                <OrderDetails openDialog={this.state.openDialog} handleDialogOpenClose={this.handleDialogOpenClose} orderDetails={this.state.orderDetailObj}/>

                {this.state.errorMsg ? this.state.errorMsg :
                    <ReactTable
                        noDataText="No orders available"
                        data={orderList}
                        columns={[
                            {
                                columns: [
                                    {
                                        Header: "Coffee",
                                        accessor: "coffeeName"
                                    },
                                    {
                                        Header: "Method",
                                        accessor: "brewMethod"
                                    },
                                    {
                                        Header: "Number of Cases",
                                        accessor: "numberOfCases"
                                    },
                                    {
                                        Header: "Packets per Case",
                                        accessor: "packetsPerCase"
                                    },
                                    {
                                        Header: "Ship Date",
                                        accessor: "shipDate"
                                    },
                                    {
                                        Header: "Order",
                                        accessor: "orderId"
                                    },
                                    {
                                        Header: "View",
                                        accessor: "orderId",
                                        Cell: row => (<Visibility style={{color: '#2185d0'}}/>)
                                    }
                                ]
                            }
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        getTdProps = {this.handleOrderView}
                    />
                }
                <br />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    getOrderList
}

const OrderList = withStyles(styles)(_OrderList);

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
