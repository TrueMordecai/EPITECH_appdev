const Global = () => { }

export default Global;

Global.var = 10;

Global.func = () => {
    Global.var += 1;
    return Global.var
}