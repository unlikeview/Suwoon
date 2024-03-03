import EventEmitter from "./EventEmitter";

//화면 창 조절 할때 일어나는 구간 모음. 
export default class Sizes extends EventEmitter{
    constructor()
    {   
        super();
        //setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio,2);

        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio,2);

            this.trigger('resize');
        
        })
    }
}