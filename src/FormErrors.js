import React from 'react'

export const FormErrors = ({formErrors}) =>
    <p className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0){
                return (
                    <p className="help is-danger" key={i}> {formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </p>