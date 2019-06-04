import { combineReducers } from 'redux';


let initList = {
    status: 0,
    message: "",
    articles: [],
}

let initDetail = {
    detailStatus: 0,
    detailMessage: "",
    article: {},
}

const listReducer = (state = initList, action) => {
    switch (action.type) {
        case 'SUCCESS':
            state = action.payload;
            return state;
        case 'FAIL':
            return initList;
        default:
            return initList;
    }
}




const detailReducer = (state = initDetail, action) => {
    switch (action.type) {
        case 'DETAIL':
            return {
                detailStatus: 0,
                detailMessage: "",
                article: action.payload,
            };
        case 'FAIL':
            return initDetail;
        default:
            return initDetail;
    }

}

export const Reducer = combineReducers({
    listReducer,
    detailReducer
})
