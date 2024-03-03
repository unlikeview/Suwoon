import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter
{
    constructor()
    {
        super();

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;
        
        window.requestAnimationFrame(() => {
            this.tick();
        })
    }

    tick()
    {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;  //앱 시작 후 흐른 시간 체크 가능

        this.trigger('tick');
        
        window.requestAnimationFrame(() => {
            this.tick();
        })
    }
}
