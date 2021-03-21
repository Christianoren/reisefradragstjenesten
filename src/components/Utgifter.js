import React from 'react';
import TextField from '@material-ui/core/TextField';

export const Utgifter = ({ onChange, value }) => {
    return (
        <div className="paper" style={{ margin: '20px 0 15px 20px'}}>
            <TextField
                id="standard-basic"
                label="Utgifter"
                value={value}
                type="number"
                name="utgifter"
                onChange={onChange}
                style={{ marginRight: '20px' }}
            />
        </div>
    );
};
