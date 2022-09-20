import * as React from 'react';
import { connect } from 'react-redux';

interface ComponentNameProps {};

interface ComponentNameState {};

class ComponentName extends React.Component<ComponentNameProps, ComponentNameState> {
    
    public render(): JSX.Element {
        return (<span>ComponentName</span>);
    }
}

export default connect()(ComponentName);
