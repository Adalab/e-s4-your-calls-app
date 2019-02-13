import React, { Component } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import NewCall from './components/NewCall';
import CallHistory from './components/CallHistory';
import tick from './images/tick.png';
import { getData } from './services/getData';
import { getList } from './services/getList';
import './styles/App.scss';
import KEYS from './config';


class App extends Component {

  constructor(props){
    super(props);

    this.selectPersonRequested = React.createRef();

    this.state= {
      info: {
        addedBy: "",
        personRequested:"",
        name: "",
        company:"",
        position:"",
        otherInfo:"",
        email:"",
        telephone: 0,
        action:"",
        message:"",    
      },
      errorIncomingData:"hidden",
      errorCallAction: "hidden",
      errorPerson: "hidden",
      succesMessage: "hidden",
      errorMessage: "hidden",
      callAgainClass: "",
      callBackClass: "",
      redialCheck: false,
      callBackCheck: false,
      
      //ESTADOS PARA EL HISTORICO//

      results: []
      
  }

  

    this.getWhoCalls = this.getWhoCalls.bind(this);
    this.getRequestedEmployee = this.getRequestedEmployee.bind(this);
    this.getName = this.getName.bind(this);
    this.getCompany = this.getCompany.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getOtherInfo = this.getOtherInfo.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPhone = this.getPhone.bind(this);
    this.getCallAction = this.getCallAction.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.isEmptyOrNot = this.isEmptyOrNot.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.deselectOption = this.deselectOption.bind(this);
    this.showList = this.showList.bind(this);

  }

  getWhoCalls(event) {
    const { info } = this.state;
    const newInfo = { ...info, addedBy: event.currentTarget.value };
    this.setState({ info: newInfo });
  }

  getRequestedEmployee(event) {
    const { info } = this.state;
    const newInfo = { ...info, personRequested: event.currentTarget.value };
    this.setState({ info: newInfo });
  }

  getName(event) {
    const { info } = this.state;
    const newInfo = { ...info, name: event.currentTarget.value };
    this.setState({ info: newInfo });
  }
  
  getCompany(event) {
    const { info } = this.state;
    const newInfo = { ...info, company: event.currentTarget.value };
    this.setState({ info: newInfo });
  }

  getPosition(event) {
    const { info } = this.state;
    const newInfo = { ...info, position: event.currentTarget.value };
    this.setState({ info: newInfo });
  }

  getOtherInfo(event) {
    const { info } = this.state;
    const newInfo = { ...info, otherInfo: event.currentTarget.value };
    this.setState({ info: newInfo });
  }

  getEmail(event) {
    const { info } = this.state;
    const newInfo = { ...info, email: event.currentTarget.value };
    this.setState({ info: newInfo });
  }

  getPhone(event) {
    const { info } = this.state;
    const newInfo = { ...info, telephone: event.currentTarget.value };
    this.setState({ info: newInfo });
  }

getCallAction(event) {
  const { info } = this.state;
  const newInfo = { ...info, action: event.currentTarget.value };
  let state = {
    info: newInfo,
    callAgainClass: '',
    callBackClass: '',
    redialCheck:false,
    callBackCheck:false
  };

  if (event.currentTarget.id === 'redial'){
     if(!this.state.redialCheck) {
      state = {
      info: newInfo,
      callAgainClass: 'selectedClass',
      callBackClass: '',
      redialCheck:true,
      callBackCheck:false
      };
    }
  
  }else {
    if (!this.state.callBackCheck){
      state = { 
        info: newInfo, 
        callAgainClass: '',
        callBackClass: 'selectedClass',
        redialCheck:false,
        callBackCheck:true

      };
    }
  }
  this.setState(state);
}


  getMessage(event) {
    const { info } = this.state;
    const newInfo = { ...info, message: event.currentTarget.value };
    this.setState({ info: newInfo });
  }

  preventSubmission(event) {

    event.preventDefault();
  }

  sendInfo() {
    const info = this.state.info;
    getData(info)
              .then(response => console.log('Success:', JSON.stringify(response)))
              .then(this.setState({
                  succesMessage:""}))
              .catch(error => console.error('Error:', error));
  }


  sendForm(event){
    event.preventDefault();
    this.isEmptyOrNot();
   
  }

  isEmptyOrNot(){
    const incomingInfo = this.state.info;

      if (incomingInfo.personRequested === ""){
        this.setState({
          errorPerson: ""
        });

      } else if (incomingInfo.name === "" && incomingInfo.company === "" && incomingInfo.position === "" && incomingInfo.telephone === 0 && incomingInfo.email === "" && incomingInfo.otherInfo === ""){
      this.setState({
        errorIncomingData: "",
        errorPerson: "hidden"
      });

      } else if (incomingInfo.message === ""){
      
      this.setState({
        errorIncomingData: "hidden",
        errorCallAction:"",
        errorPerson: "hidden",
        errorMessage:""
        
      });


    } else {
      this.setState({
        errorIncomingData: "hidden",
        errorCallAction:"hidden",
        errorPerson: "hidden",
        errorMessage:"hidden"
      }); 

      this.sendInfo();
      this.sendSlackInfo();
    }
  }
  


  deselectOption(){

    const addedBy= this.state.info.addedBy;
   
    if(addedBy!==""){
      const optionsArray= this.selectPersonRequested.current.getElementsByTagName("option");

      for(let i=0; i<optionsArray.length; i++){

        if(optionsArray[i].label.includes(addedBy)){
          optionsArray[i].disabled = true;
          optionsArray[i].style.display="none";
        }else{
          optionsArray[i].disabled = false;
          optionsArray[i].style.display="block";
        }

      }
      
    }

  }


  makeMessage(){

    let message=`${this.state.info.personRequested}, te acaban de llamar y te han dejado el *siguiente mensaje*: \n${this.state.info.action} \n${this.state.info.message}`;

    if ((this.state.info.name!==''|| this.state.info.position!=='' || this.state.info.company!=='' || this.state.info.otherInfo!==''|| this.state.info.email!=='' )&& this.state.info.telephone===0){
      return message=  `${this.state.info.personRequested}, *te acaba de llamar*: \n
      ${this.state.info.name} \n${this.state.info.position} \n${this.state.info.company}  \n${this.state.info.email} \n${this.state.info.otherInfo} \n *Su mensaje ha sido* \n${this.state.info.action} \n${this.state.info.message}`;
    }
    else if (this.state.info.name!==''|| this.state.info.position!=='' || this.state.info.company!=='' || this.state.info.otherInfo!==''|| this.state.info.email!=='' || this.state.info.telephone!==0){
      return message=  `${this.state.info.personRequested}, *te acaba de llamar*: \n
      ${this.state.info.name} \n${this.state.info.position} \n${this.state.info.company} \n${this.state.info.telephone} \n${this.state.info.email} \n${this.state.info.otherInfo} \n *Su mensaje ha sido* \n${this.state.info.action} \n${this.state.info.message}`;
      
    }else{

      return message;
    }
  }

  sendSlackInfo(){
    
    const message = this.makeMessage();
    const key = KEYS.SLACK_KEY;

    const settings = {
      url: `https://slack.com/api/chat.postMessage?token=${key}&channel=%23your-calls-app&text=${message}&pretty=1`,
      method: 'POST',
      body: {}
    }

    fetch(settings.url, {
      method: settings.method,
      body: JSON.stringify(settings.body),
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  showList() {
    getList()
    .then(results => {
 
                this.setState({
                  results: results
                })
  })};


  
  render() {
    return (
      <div className="App">
        <Header />

        <main className="main">
          <div className="form__wrapper">
      
            <Menu />

            <NewCall preventSubmission={this.preventSubmission} getWhoCalls={this.getWhoCalls} errorPerson={this.state.errorPerson} getRequestedEmployee ={this.getRequestedEmployee} errorIncomingData={this.state.errorIncomingData} getName={this.getName} getCompany={this.getCompany} getPosition={this.getPosition} getOtherInfo={this.getOtherInfo} getEmail={this.getEmail} getPhone={this.getPhone} errorCallAction={this.state.errorCallAction} getCallAction={this.getCallAction} getMessage={this.getMessage} errorMessage={this.state.errorMessage} sendForm={this.sendForm} deselectOption={this.deselectOption} selectPersonRequested ={this.selectPersonRequested} callBackClass={this.state.callBackClass} callAgainClass={this.state.callAgainClass} redialCheck={this.state.redialCheck} callBackCheck={this.state.callBackCheck}/>
            <CallHistory actionShowList={this.showList} results={this.state.results}/>
          </div>
          
          <div className={`modal ${this.state.succesMessage}`}> <img src={tick}alt="tick" className="tick"></img>La llamada a {this.state.info.personRequested} se ha registrado correctamente y ya se ha notificado.</div> 
        </main>
      </div>
    );
  }
}

export default App;
