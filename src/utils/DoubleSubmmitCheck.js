export function DoubleSubmitCheck(doubleSubmitFlag, setDoubleSubmitFlag){
    if(doubleSubmitFlag){
        return doubleSubmitFlag;
    }else{
        setDoubleSubmitFlag(true);
        return false;
    }
}