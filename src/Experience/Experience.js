import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from './Camera.js';
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import Helper from './World/Helper.js'
import Raycaster from './Raycaster.js'

import sources from './sources.js' // class가 아님 
import sources_2 from './sources_2.js'

let instance = null

//실행하는 것의 main 파일임
export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance;
        }
        instance = this;

        console.log('웹시작');
        window.experience = this; 
        
        this.canvas = canvas

        //Setup
        this.debug = new Debug();
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.scene.add(this.resources.overlay)
        this.helper = new Helper(2);
        
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();
        this.raycaster = new Raycaster();
        window.addEventListener('click',this.raycaster.clickRay);
        window.addEventListener('mousemove',this.raycaster.hoverRay);



        //resize trigger event
        this.sizes.on('resize', () => {  // Sizes.js에서 this.trigger와 연결
            this.resize();
        })
        // time tick event
        this.time.on('tick', ()=> 
        {
            this.update()
        })

    }

    resize()
    {
        console.log('resizing')
        this.camera.resize()
        this.renderer.resize()
    }

    update()   // tick 기능 대신함 
    {
        this.camera.update()
        this.raycaster.update()
        this.world.update()
        this.renderer.update()
    }


    destroy() //페이지 넘어갈때 필수 
    {
       // this.sizes.off('resize')
        //this.time.off('tick')
        this.camera.off('show')

        // 씬을 쭉 훑으면서 필요없는 부분 지우기 
        this.scene.traverse((child)=>
        {
            if(child)
            {
                if(child instanceof THREE.Mesh)
                {
                    child.geometry.dispose()
                    
                    for(const key in child.material)
                    {
                        const value = child.material[key]
                        
                        if(value && typeof value.dispose === 'function')
                        {
                            value.dispose();
                        }
                    }
                }
                // if(child.type === 'Mesh' || child.type === 'Group')
                // {
                //     this.scene.remove(child);
                // }
            }
        })

        this.scene.children.forEach(object => {
            if(object !== this.camera && object !== this.renderer) {
                this.scene.remove(object);
            }
        });

        // this.camera.controls.dispose();
       //this.renderer.instance.dispose();

        if(this.debug.active)
        {
            this.debug.ui.destroy();
        }
    }

    newSetup()
    {
        this.resources = new Resources(sources_2);
        this.scene.add(this.resources.overlay)
    }
}