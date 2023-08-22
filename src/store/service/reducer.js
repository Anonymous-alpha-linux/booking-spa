import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SERVICE,
    POST_SERVICE,
    POST_SERVICE_SUCCESS,
    POST_SERVICE_FAILED,
    PUT_SERVICE,
    PUT_SERVICE_SUCCESS,
    PUT_SERVICE_FAILED,
    DELETE_SERVICE,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAILED,
} from './actionType';

const INIT_STATE = {
    service: [],
    error: null,
    loading: false,
};

const Service = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_SERVICE:
                    return {
                        ...state,
                        service: action.payload.result,
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_SERVICE:
                    return {
                        ...state,
                        service: action.payload.result,
                    };

                default:
                    return state;
            }
        case POST_SERVICE_SUCCESS:
            switch (action.payload.actionType) {
                case POST_SERVICE:
                    return {
                        ...state,
                        service: action.payload.result,
                    };
                default:
                    return state;
            }
        case POST_SERVICE_FAILED:
            switch (action.payload.actionType) {
                case POST_SERVICE:
                    return {
                        ...state,
                        service: action.payload.result,
                    };
                default:
                    return state;
            }
        case PUT_SERVICE_SUCCESS:
            switch (action.payload.actionType) {
                case PUT_SERVICE:
                    return {
                        ...state,
                        service: action.payload.result,
                    };
                default:
                    return state;
            }
        case PUT_SERVICE_FAILED:
            switch (action.payload.actionType) {
                case PUT_SERVICE:
                    return {
                        ...state,
                        service: action.payload.result,
                    };
                default:
                    return state;
            }
        default:
            return state;
    }
};

export default Service;
