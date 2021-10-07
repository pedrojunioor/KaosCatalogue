import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { submitUserAction } from '../../../redux/actions/user/UserActions'
import './UseForm.scss'



const UseFormFunc = props => {

    const { handleSubmit } = props

    const submit = (data, submitUserAction) => {
        submitUserAction(data)
    }


    const [campo1, setCampo1] = useState({
            title: "CAMPO",
            options: ["C1OP1", "C1OP2", "C1OP3"]}
            )



    function mountSelect(campo) {
        return campo.map((c,i) => {
            return <div>
                <label>
                    {c.title}
                </label>
                <Field className="select-input" name="campo1" component="select">
                    <option />
                    <option value={c.options[i]}>{c.options[i]}</option>
                </Field>
            </div>
        })
    }


    return (
        <form onSubmit={handleSubmit((fields) => submit(fields, submitUserAction))}>
            <div>
                <label>
                    CAMPO 1
                </label>
                <Field className="select-input" name="campo1" component="select">
                    <option />
                    <option value="C1OP1">C1OP1</option>
                    <option value="C1OP2">C1OP2</option>
                    <option value="C1OP3">C1OP3</option>
                </Field>
            </div>
            <div>
                <label>
                    CAMPO 2
                </label>
                <Field className="select-input" name="campo2" component="select">
                    <option />
                    <option value="C2OP1">C2OP1</option>
                    <option value="C2OP2">C2OP2</option>
                    <option value="C2OP3">C2OP3</option>
                </Field>
            </div>
            <div>
                <label>
                    CAMPO 3
                </label>
                <Field className="select-input" name="campo3" component="select">
                    <option />
                    <option value="C3OP1">C3OP1</option>
                    <option value="C3OP2">C3OP2</option>
                    <option value="C3OP3">C3OP3</option>
                </Field>
            </div>
            <div>
                <label>
                    CAMPO 4
                </label>
                <Field className="select-input" name="campo3" component="select">
                    <option />
                    <option value="C4OP1">C4OP1</option>
                    <option value="C4OP2">C4OP2</option>
                    <option value="C4OP3">C4OP3</option>
                </Field>
            </div>
            <div>
                <label>
                    CAMPO 5
                </label>
                <Field className="select-input" name="campo3" component="select">
                    <option />
                    <option value="C5OP1">C5OP1</option>
                    <option value="C5OP2">C5OP2</option>
                    <option value="C5OP3">C5OP3</option>
                </Field>
            </div>

           {/* { mountSelect(campo1)} */}
            <div>
                <button type="submit">SUBMIT</button>
            </div>

        </form>
    )
}


const UseForm = (reduxForm({
    form: 'formUser'
}))(UseFormFunc)

const mapStateToProps = state => ({

})


export default connect(mapStateToProps, { submitUserAction })(UseForm)