import './form-input.styles.scss';
import React from 'react';


const FormInput=({handleChange,label,...otherProps})=>(
    <div className="group">
        <input className='form-input' onChange={handleChange} {...otherProps} />
        {
            //if there is label attribute, display label
            label ?
            //If there is input, the label will shrink to above. 
            (<label className={`${
                otherProps.value.length?'shrink':''
                }form-input-label`}
            >
                {label}
            </label>
        ):null}
    </div>
)

export default FormInput;