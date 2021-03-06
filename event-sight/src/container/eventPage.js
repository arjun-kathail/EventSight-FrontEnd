import React, {useEffect} from "react";
import {Row, Col} from "reactstrap";
import EventInfo from "../components/eventInfo";
import CommentSection from "../components/commentSection";
import EventPageButtons from "../components/buttons2";

import {connect} from "react-redux";
import * as eventActions from "../store/actions/eventActions";

const EventPage = (props)=>{

    useEffect(()=>{
        props.selectEvent(props.match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[props.showAlert])

      // if(props.showAlert){
      //   setTimeout(()=>{
      //     props.hideAlert()
      //   }, 3500)
      // }
    return <div style={{
        width : "100%"
    }}>
        <Row>
            {props.selectedEvent && <Col lg="8"><EventInfo event={props.selectedEvent}/></Col>}
            <Col lg="4">
            {props.selectedEvent && props.role !== "Admin" && <Row><EventPageButtons event={props.selectedEvent} /></Row>}
            {props.selectedEvent && <Row><CommentSection event={props.selectedEvent} /></Row>}
                </Col>
        </Row>
    
    </div>;
}

const mapStateToProps = (state) => {
    return {
      loading: state.event.loading,
      showAlert : state.event.showAlert,
      AlertText : state.event.AlertText,
      AlertColor : state.event.AlertColor,
      selectedEvent: state.event.selectedEvent,
      sid : state.user.sid,
      token : state.user.token,
      role : state.user.role
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      selectEvent: (id)=>dispatch(eventActions.selectEvent(id)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(EventPage);