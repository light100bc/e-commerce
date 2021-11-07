//functions(actions) that will tigger the reducer
//call the action in the component
export const setCurrentUser=user=>(
    {
        type:'SET_CURRENT_USER',
        payload:user
    }
);

