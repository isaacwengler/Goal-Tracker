import axios from 'axios';

import { GET_GOALS, DELETE_GOAL, ADD_GOAL, COMPLETE_GOAL, GET_ERRORS } from './types';

// GET GOALS 
export const getGoals = () => dispatch => {
    axios.get('/api/goals/')
        .then(res => {
            dispatch({
                type: GET_GOALS,
                payload: res.data
            });
        }).catch(err => {
            const errors = {
                msg: "Log in to view goals",
                status: err.response.status,
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
}


// DELETE GOAL

export const deleteGoal = (id) => dispatch => {
    axios.delete(`/api/goals/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_GOAL,
                payload: id
            });
        }).catch(err => console.log(err));
}

// ADD GOAL

export const addGoal = (goal) => dispatch => {
    axios.post("/api/goals/", goal)
        .then(res => {
            dispatch({
                type: ADD_GOAL,
                payload: res.data
            });
        }).catch(err => {
            const errors = {
                msg: "Goal is required",
                status: err.response.status,
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
}

// COMPLETE GOAL

export const completeGoal = (id, goal, status) => dispatch => {
    const modify = {
        id: id,
        name: goal,
        complete: status
    }
    axios.put(`/api/goals/${id}/`, modify)
        .then(res => {
            dispatch({
                type: COMPLETE_GOAL,
                payload: modify
            });
        }).catch(err => console.log(err));
}

// RETURN ERRORS
const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}