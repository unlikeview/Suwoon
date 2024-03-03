import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug' //  주소창 마지막에 #debug 붙이면 디버깅창 나타남

        if(this.active)
        {
            this.ui = new dat.GUI() 
        }
    }
}