import React from "react";
import "react-table/react-table.css";
import {connect} from "react-redux";
import {getOrderList, submitOrderDetails} from "./orderListAction";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Header } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import moment from 'moment/moment';
import { Label } from 'semantic-ui-react';
import OrderDetails from '../orderDetails/OrderDetails';
import Visibility from '@material-ui/icons/Visibility';
import {orderDetailObj} from "../orderDetails/util/orderDetailObj";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
        fontSize: '15px'
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    title: {
        flex: '0 0 auto',
        borderBottom: '2px solid #7080904a',
        margin: '0 20px 0 20px',
        paddingTop: '10px',
    }
});

const tableHeaders = [
    {header: 'Coffee', accessor: 'coffeeName'},
    {header: 'Method', accessor: 'brewMethod'},
    {header: 'Number of Cases', accessor: 'numberOfCases'},
    {header: 'Packets per Case', accessor: 'packetsPerCase'},
    {header: 'Ship Date', accessor: 'shipDate'},
    {header: 'Order', accessor: 'orderId'},
    {header: 'View', accessor: 'orderId'},
];

class _OrderList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            openDialog: false,
            errorMsg: '',
            orderDetailObj,
            page: 0,
            rowsPerPage: 25,
            orderBy: {header: 'Ship Date', accessor: 'shipDate'},
            order: 'asc'
        };
    }

    async componentDidMount() {
        try {
            await this.props.getOrderList();
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
        return moment(new Date()).format('DD');
    }
    getHeader = () => {
        return (
            <Grid container spacing={24} style={{'marginBottom': '20px'}} className='appHeader'>
                <Grid item xs={3} sm={2}>
                    <Label size={'huge'}>
                        <div>
                            {this.getCurrentMonth()}
                        </div>
                        <div style={{'margin':'5px','textAlign':'center'}}>
                            {this.getCurrentDate()}
                        </div>
                    </Label>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Header as='h2'>Perfectly Ground Work Orders</Header>
                </Grid>
                <Grid item xs={4} sm={4} style={{'textAlign': 'right'}}>
                    <Button variant="outlined" color="blue" className='createNewOrder' onClick={() => this.handleDialogOpenClose(true)}>
                        CREATE ORDER
                    </Button>
                </Grid>
            </Grid>
        );
    };

    handleOrderView = (orderId) => {
                    this.props.orderList.map((data,i) => {
                        if(data.orderId === orderId) {
                            this.setState({orderDetailObj: {...orderDetailObj ,...data} });
                            this.handleDialogOpenClose(true);
                        }
                        return '';
                    })
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleOrderSubmit = async () => {
        try {
            await this.props.submitOrderDetails(this.state.orderDetailObj);
            this.setState({errorMsg:''});
        }catch (e) {
            console.log(e);
            this.setState({errorMsg: e.response.data.error || e});
        }finally {
            if(!this.state.errorMsg)
                this.handleDialogOpenClose(false);
        }
    };

    handleOrderDetailsChange = (event) => {
        let orderDtlObj = this.state.orderDetailObj;
        if(event.target.type === "checkbox")
            this.setState({orderDetailObj: {...orderDtlObj, [event.target.name]: event.target.checked}});
        else
            this.setState({orderDetailObj: {...orderDtlObj, [event.target.name]: event.target.value}});
    };

    render() {
        const { orderList=[], classes={} } = this.props;
        const { rowsPerPage, page, orderBy, order, errorMsg } = this.state;
        return (
            <div className={classes.root}>
                {this.getHeader()}
                <OrderDetails handleOrderSubmit={this.handleOrderSubmit} openDialog={this.state.openDialog} handleDialogOpenClose={this.handleDialogOpenClose}
                              handleOrderDetailsChange={this.handleOrderDetailsChange} orderDetails={this.state.orderDetailObj} errorMsg={this.state.errorMsg}/>

                { orderList.length === 0 ? <Typography variant="h5"> No Orders </Typography> :
                    <Paper className={classes.root}>
                    
                        <Typography variant="h6" style={{color: 'red'}}> {errorMsg} </Typography>
                        <div className={classes.title}>
                                <Typography variant="h6" style={{color: '#2185d0'}}>
                                    ORDERS
                                </Typography>
                        </div>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <TableHead>
                                    <TableRow>
                                        {
                                            tableHeaders.map(({header, accessor},i) =>
                                                <TableCell key={i}>
                                                    <Typography variant="subtitle2" style={{fontWeight:'bold'}}> {header} </Typography>
                                                </TableCell>)
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .sort((t1,t2)=>{
                                            const accessor = orderBy.accessor;
                                            let diff = t1[accessor]-t2[accessor];
                                            if(isNaN(diff)) {
                                                diff = t1[accessor]<t2[accessor]? -1: 1;
                                            }
                                            return order==='asc'? diff: -diff;
                                        })
                                        .map(order => (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={order.orderId}
                                                >
                                                    {
                                                        tableHeaders.map((h,i) => {
                                                            let value = order[h.accessor];
                                                            return h.header.toLowerCase() === "view" ?
                                                            <TableCell key={i} className='viewOrder' onClick={() => this.handleOrderView(order.orderId)} orderid={order.orderId}><Visibility style={{color: '#2185d0',cursor:'pointer'}}/>
                                                            </TableCell>
                                                                :
                                                            <TableCell key={i}>{h.accessor === "shipDate" && order.priority === true ?  <span> {value} <span style={{fontSize:'25px'}}>*</span> </span> :
                                                                value}</TableCell>
                                                        })
                                                    }
                                                </TableRow>
                                        ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            count={orderList.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Paper>
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
    getOrderList,
    submitOrderDetails
}

export const OrderListOrig = _OrderList;

const OrderList = withStyles(styles)(_OrderList);

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
