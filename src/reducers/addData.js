const initialState ={
    emailEmployee : ''
}

export default function taskManager(state=initialState, action)
{
    switch(action.type)
    {
        case "ADD": {
            
            return state;
        }
        
        default: return state;
    }
}