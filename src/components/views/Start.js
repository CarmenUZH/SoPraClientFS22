import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */



const Start = () => {
    const history = useHistory();

    return (
        <BaseContainer>
            <div className="login container">
                <div className="login form">

                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => history.push(`/login`)}
                        >
                            Login
                        </Button>
                    </div>

                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => history.push(`/register`)}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Start;
