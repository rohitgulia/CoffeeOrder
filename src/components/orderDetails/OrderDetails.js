import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {connect} from "react-redux";
import {orderDetailObj, coffeeNameList, methodNameList, packetsPerCaseList} from "./util/orderDetailObj";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { TextArea } from 'semantic-ui-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Message } from 'semantic-ui-react';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const styles = theme => ({
    form: {
        display: 'flex'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 220,
    },
    textArea: {
        width: '100%'
    },
    pullToLeft: {
        justifyContent: 'flex-start !important'
    }
});

class _OrderDetails extends Component {

    handleClose = () => {
        this.props.handleDialogOpenClose(false);
    };

    handleOrderDetailsChange = event => {
        this.props.handleOrderDetailsChange(event);
    };

    handleOrderSubmit = event => {
        event.preventDefault();
        this.props.handleOrderSubmit();
    };

    render() {
        const { fullScreen, openDialog, classes, errorMsg, orderDetails } = this.props;
        return(
            <div>
                <Dialog
                    fullWidth={true}
                    fullScreen={fullScreen}
                    maxWidth={'md'}
                    open={openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >

                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Perfectly Ground Work Orders
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Instructional text would go here - Lorem ipsum
                        </DialogContentText>
                        <form className={classes.form} onSubmit={this.handleOrderSubmit}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl className={classes.formControl} required >
                                        <InputLabel htmlFor="coffeeName">Coffee name</InputLabel>
                                        <Select
                                            native
                                            required
                                            value={orderDetails.coffeeName}
                                            onChange={this.handleOrderDetailsChange}
                                            inputProps={{
                                                name: 'coffeeName',
                                                id: 'coffeeName'
                                            }}
                                        >
                                            <option value="" />

                                            {coffeeNameList.map((data,i) => {
                                                return <option key={i} value={data}>{data}</option>
                                            })}
                                        </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl className={classes.formControl} required>
                                        <InputLabel htmlFor="brewMethod">Brew method</InputLabel>
                                        <Select
                                            native
                                            required
                                            value={orderDetails.brewMethod}
                                            onChange={this.handleOrderDetailsChange}
                                            inputProps={{
                                                name: 'brewMethod',
                                                id: 'brewMethod',
                                            }}
                                        >
                                            <option value="" />
                                            {methodNameList.map((data,i)=> {
                                                return <option key={i} value={data}>{data}</option>
                                            })}
                                        </Select>
                                        </FormControl>
                                    </Grid>


                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} required>
                                        <TextField
                                            id="shipDate"
                                            label="Ship date"
                                            required
                                            name="shipDate"
                                            type="date"
                                            value={orderDetails.shipDate}
                                            onChange={this.handleOrderDetailsChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} required>
                                        <TextField
                                            id="numberOfCases"
                                            label="Number of cases"
                                            required
                                            name="numberOfCases"
                                            value={orderDetails.numberOfCases}
                                            onChange={this.handleOrderDetailsChange}
                                            type="number"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl className={classes.formControl} required>
                                        <InputLabel htmlFor="packetsPerCase">Packets per case</InputLabel>
                                        <Select
                                            native
                                            required
                                            value={orderDetails.packetsPerCase}
                                            onChange={this.handleOrderDetailsChange}
                                            inputProps={{
                                                name: 'packetsPerCase',
                                                id: 'packetsPerCase',
                                            }}
                                        >
                                            <option value="" />
                                            {packetsPerCaseList.map((data,i)=> {
                                                return <option key={i} value={data}>{data}</option>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <TextArea placeholder='Add note' className={classes.textArea} name="notes" onChange={this.handleOrderDetailsChange} value={orderDetails.notes}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={orderDetails.priority === 'true' || orderDetails.priority === true}
                                                    onChange={this.handleOrderDetailsChange}
                                                    name='priority'
                                                    value='priority'
                                                />
                                            }
                                            label="Priority"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <Button color="primary" variant="contained" autoFocus type="submit">
                                            Submit work order
                                        </Button>
                                        {errorMsg ?
                                            <Message negative>
                                            <Message.Header>{errorMsg}</Message.Header>
                                        </Message> : ''}
                                    </Grid>
                        </Grid>

                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

_OrderDetails.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {state}
}

const __OrderDetails = withStyles(styles)(_OrderDetails)

const OrderDetails = withMobileDialog()(__OrderDetails);

export default connect(mapStateToProps, null)(OrderDetails);