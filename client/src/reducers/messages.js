const messages = (state = [], action) => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}