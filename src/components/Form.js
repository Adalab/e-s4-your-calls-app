import React, { Component } from 'react';



class Form extends Component {


    // constructor(props) {
    //     super(props);

    //     this.redialButton = React.createRef();

    //     this.callBack = React.createRef();

    //     this.fakeClick = this.fakeClick.bind(this);
    //     this.fakeClickCallBack = this.fakeClickCallBack.bind(this);
    // }

    // fakeClick() {
    //     this.redialButton.current.click();
    // }

    // fakeClickCallBack() {
    //     this.callBack.current.click();
    // }



    render() {

        const { preventSubmission, getWhoCalls, errorPerson, getRequestedEmployee, errorIncomingData, getName, getCompany, getPosition, getOtherInfo, getEmail, getPhone, getCallAction, getMessage, errorMessage, deselectOption, selectPersonRequested, redialCheck, callBackCheck} = this.props;
        return (
            <form method="post" onSubmit={preventSubmission} className="registration__form" >

                <fieldset className="form-section addedBy">
                    <div className="formUp">
                        <div className="main__addedBy">
                            <h2 className="main__addedBy--title">¿Quién atendió la llamada?</h2>
                            <select className="main__employees" onChange={getWhoCalls}>
                                <option value="Elige un empleado">Elige un empleado</option>
                                <option value="Carlos">Carlos</option>
                                <option value="Pepa">Pepa</option>
                            </select>
                        </div>

                        <div className="main__personRequested">
                            <h2 className="main__personRequested-title">¿Por quién preguntaban?</h2>
                            <p className={`error-msg ${errorPerson}`}>Debes seleccionar un empleado</p>
                            <select className="main__employees" onChange={getRequestedEmployee} onClick={deselectOption} ref={selectPersonRequested}required>
                                <option className="option" value="Elige un empleado" >Elige un empleado</option>
                                <option value="Carlos" >Carlos</option>
                                <option value="Pepa">Pepa</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <div className="incoming-data__container">
                    <fieldset className="form-section incoming-data">

                        <h2 className="incoming-data__title">¿Quién llamó?</h2>
                        <p className={`error-msg ${errorIncomingData}`}>Debes rellenar al menos uno de los campos</p>

                        <div className="incoming-data__fieldsContainer">

                            <div className="incoming-data__name">
                                <label htmlFor="name" className="incoming-data__name--label label" aria-label="nombre">Nombre</label>
                                <input id="name" type="text" className="incoming-data__name--input incoming-data__input" placeholder="Nombre" onKeyUp={getName} />
                            </div>

                            <div className="incoming-data__company">
                                <label htmlFor="company" className="incoming-data__company--label label" aria-label="empresa">Empresa</label>
                                <input id="company" type="text" className="incoming-data__company--input incoming-data__input" placeholder="Empresa" onKeyUp={getCompany} />
                            </div>

                            <div className="incoming-data__position">
                                <label htmlFor="position" className="incoming-data__position--label label" aria-label="cargo">Cargo</label>
                                <input id="position" type="text" className="incoming-data__position--input incoming-data__input" placeholder="Cargo" onKeyUp={getPosition} />
                            </div>

                            <div className="incoming-data__other-info">
                                <label htmlFor="other-info" className="incoming-data__other-info--label label" aria-label="otro detalle">Otro detalle</label>
                                <input id="other-info" type="text" className="incoming-data__other-info--input incoming-data__input" placeholder="Otro detalle" onKeyUp={getOtherInfo} />
                            </div>

                            <div className="incoming-data__email">
                                <label htmlFor="email" className="incoming-data__email--label label" aria-label="email">Email</label>
                                <input id="email" type="email" className="incoming-data__email--input incoming-data__input" placeholder="Email" onKeyUp={getEmail} />
                            </div>

                            <div className="incoming-data__mobile">
                                <label htmlFor="mobile" className="incoming-data__mobile--label label" aria-label="teléfono">Teléfono</label>
                                <input id="mobile" type="tel" className="incoming-data__mobile--input incoming-data__input" placeholder="Teléfono" onKeyUp={getPhone} />
                            </div>
                        </div>

                    </fieldset>

                    <fieldset className="form-section message">
                        <h2 className="message__title">¿Qué mensaje dejó?</h2>
                        {/* <p className={`error-msg ${errorCallAction}`}>Debes seleccionar una de las opciones.</p> */}

                        <div className="call-container__wrapper">
                            <div className="call-container__radios">
                                <div className="call__container">
                                    <label htmlFor="redial" className={`callAction_selection label fake-redial-button ${this.props.callAgainClass}`}>Llamará de nuevo<input id="redial" type="checkbox" checked={redialCheck} value="Llamará de nuevo" className="callAction__selection--redial" placeholder="Llamará de nuevo" name="call" onChange={getCallAction} ref={this.redialButton}></input></label>
                                </div>
                                <div className="call__container">
                                    <label htmlFor="call-back" className={`callAction_selection label fake-CallBack-button ${this.props.callBackClass}`}>Devolver la llamada<input id="call-back" type="checkbox" checked={callBackCheck}value="Devolver la llamada" className="callAction__selection--call-back" placeholder="Devolver la llamada" name="call" onChange={getCallAction} ref={this.callBack}></input></label>
                                </div>
                            </div>
                                <div className="message_container">
                                    <label htmlFor="message" className="message__label label">Mensaje personalizado</label>
                                    <textarea name="message" id="message" className="message__input" placeholder="Mensaje personalizado" onKeyUp={getMessage}></textarea>
                                    <p className={`error-msg ${errorMessage}`}>Debes rellenar el campo del mensaje.</p>
                                </div>
                        </div>

                     
                    </fieldset>
                </div>


            </form>

        );
    }

}

export default Form;





