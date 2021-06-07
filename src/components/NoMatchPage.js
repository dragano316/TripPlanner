import React, {Component} from 'react';

class NoMatchPage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div style={{textAlign: 'center', margin: '2rem 0'}}>
                404 does not exist
            </div>
        );
    }
}


export default NoMatchPage;
