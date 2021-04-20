import * as actionTypes from "./actionTypes";
import axios from "../../axios";


export const eventLoading = ()=>{
    return {
        type: actionTypes.EVENT_LOADING,
    }
}

export const createNewEvent = (sid, token, event)=>{
    return (dispatch) =>{
        const requestURL = "create_event/";
        const data = {
            "title" : event.eventTitle,
            "description" : event.eventDescription,
            "details" : event.eventDetails,
            "date_time" : event.eventDate + " " + event.eventTime + ":00",
            "open_to_all" : event.eventType === "MemberSpecific" ? "False" : "True",
            "image_url" : event.eventImgURL,
            "student_id" : sid,
            "token" : token
        };
        console.log(data)
        axios.post(requestURL, data)
        .then((res)=>{
            console.log(res)
            dispatch({type : actionTypes.EVENT_CREATE_SUCCESS})
        })
        .catch((err)=>{
            console.log(err)
            dispatch({type : actionTypes.EVENT_CREATE_FAILED})
        })
    }
}

export const updateEvent = (sid, token, event, id)=>{
    return (dispatch)=>{
        const requestURL = "update_event/"+id+"/";
        const data = {
            "title" : event.eventTitle,
            "description" : event.eventDescription,
            "details" : event.eventDetails,
            "date_time" : event.eventDate + " " + event.eventTime + ":00",
            "open_to_all" : event.eventType === "MemberSpecific" ? "False" : "True",
            "image_url" : event.eventImgURL,
            "student_id" : sid,
            "token" : token
        };
        axios.put(requestURL, data)
        .then((res)=>{
            console.log(res)
            dispatch({
                type : actionTypes.EVENT_UPDATE_SUCCESS
            })
        })
        .catch((err)=>{
            console.log(err)
            dispatch({
                type : actionTypes.EVENT_UPDATE_FAILED
            })
        })
    }
}

// EVENT DISPLAY
export const displayEvents = (sid, token)=>{
    return dispatch =>{
        dispatch(eventLoading)
        const requestURL = "event_display/";
        const data = {
            "student_id" : sid,
            "token" : token,
        };
        axios
        .post(requestURL, data)
        .then((res)=>{
            console.log(res.data);
            dispatch(displayEventsSuccess(res.data));
        })
        .catch((err)=>{
            console.log(err);
            dispatch(displayEventsFailure(err));
        })
    }
}

export const displayEventsSuccess = data=>{
    return {
        type: actionTypes.EVENTS_DISPLAY_SUCCESS,
        events: data,
    }
}

export const displayEventsFailure = error=>{
    return {
        type: actionTypes.EVENTS_DISPLAY_FAILURE,
        payload: error
    }
}

export const selectEvent=(id)=>{
    return dispatch=>{
        const requestURL = "get_event_via_id/";
        const data={
            "event_id": id
        };
        axios
        .post(requestURL, data)
        .then((res)=>{
            console.log(res.data);
            dispatch(selectEventSuccess(res.data));
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

export const selectEventSuccess=data=>{
    return {
        type: actionTypes.SELECT_EVENT,
        selectedEvent: data,
    }
}

// EVENT REGISTRATION
export const registerEvent = (event)=>{
    return dispatch =>{
        dispatch(eventLoading)
        axios
        .post("", event)
        .then(res => {
            dispatch(registerEventSuccess(res))
        })
        .catch(error => {
            dispatch(registerEventFailure(error))
        })
    }
}

export const registerEventSuccess = events=>{
    return {
        type: actionTypes.EVENT_REGISTRATION_SUCCESS,
        payload: events
    }
}

export const registerEventFailure = error=>{
    return {
        type: actionTypes.EVENT_REGISTRATION_FAILURE,
        payload: error
    }
}


// DISPLAY REGISTERED EVENTS
export const displayRegisteredEvents = (sid, token)=>{
    return dispatch =>{
        dispatch(eventLoading)
        const requestURL="interested_participated_events/";
        const data={
            student_id: sid,
            interested: false,
            token: token,
        }
        axios
        .post(requestURL, data)
        .then(res => {
            console.log(res.data);
            dispatch(displayRegisteredEventsSuccess(res.data));
        })
        .catch(error => {
            dispatch(displayRegisteredEventsFailure(error))
        })
    }
}

export const displayRegisteredEventsSuccess = data=>{
    return {
        type: actionTypes.DISPLAY_REGISTERED_EVENTS_SUCCESS,
        events: data
    }
}

export const displayRegisteredEventsFailure = error=>{
    return {
        type: actionTypes.DISPLAY_REGISTERED_EVENTS_FAILURE,
        payload: error
    }
}

// ADD EVENT TO INTERESTED
export const interested = (event)=>{
    return dispatch =>{
        dispatch(eventLoading)
        axios
        .post("", event)
        .then(res => {
            dispatch(interestedSuccess(res))
        })
        .catch(error => {
            dispatch(interestedFailure(error))
        })
    }
}

export const interestedSuccess = events=>{
    return {
        type: actionTypes.EVENT_INTERESTED_SUCCESS,
        payload: events
    }
}

export const interestedFailure = error=>{
    return {
        type: actionTypes.EVENT_INTERESTED_FAILURE,
        payload: error
    }
}

//DISPLAY INTERESTED EVENTS
export const displayInterestedEvents = (sid, token)=>{
    return dispatch =>{
        dispatch(eventLoading)
        const requestURL="interested_participated_events/";
        const data={
            student_id: sid,
            interested: true,
            token: token,
        }
        axios
        .post(requestURL, data)
        .then(res => {
            console.log(res.data);
            dispatch(displayInterestedEventsSuccess(res.data));
        })
        .catch(error => {
            dispatch(displayInterestedEventsFailure(error))
        })
    }
}

export const displayInterestedEventsSuccess = data=>{
    return {
        type: actionTypes.DISPLAY_INTERESTED_EVENTS_SUCCESS,
        events: data
    }
}

export const displayInterestedEventsFailure = error=>{
    return {
        type: actionTypes.DISPLAY_INTERESTED_EVENTS_FAILURE,
        payload: error
    }
}

// POST COMMENT
export const postComment = (comment)=>{
    return dispatch =>{
        dispatch(eventLoading)
        axios
        .post("", comment)
        .then(res => {
            dispatch(postCommentSuccess(res))
        })
        .catch(error => {
            dispatch(postCommentFailure(error))
        })
    }
}

export const postCommentSuccess = comment=>{
    return {
        type: actionTypes.POST_COMMENT_SUCCESS,
        payload: comment
    }
}

export const postCommentFailure = error=>{
    return {
        type: actionTypes.POST_COMMENT_FAILURE,
        payload: error
    }
}

//DISPLAY COMMENTS
export const displayComments = ()=>{
    return dispatch =>{
        dispatch(eventLoading)
        axios
        .get('')
        .then(res => {
            const comments = res.data
            dispatch(displayCommentsSuccess(comments))
        })
        .catch(error => {
            dispatch(displayCommentsFailure(error))
        })
    }
}

export const displayCommentsSuccess = comments=>{
    return {
        type: actionTypes.DISPLAY_COMMENTS_SUCCESS,
        payload: comments
    }
}

export const displayCommentsFailure = error=>{
    return {
        type: actionTypes.DISPLAY_COMMENTS_FAILURE,
        payload: error
    }
}