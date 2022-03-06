import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const StartGuard = props => {
    if (localStorage.getItem('tem')) {

        return props.children;
    }
    // if user is not the one from the token
    return <Redirect to="/game"/>;
};

StartGuard.propTypes = {
    children: PropTypes.node
}