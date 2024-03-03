import * as THREE from 'three'
import Experience from "../Experience.js";
import Environment from './Environment.js';
import Floor from './Floor.js'
import Fox from './Fox.js'
import FirstScene from './FirstScene.js';
import Mobile from './Mobile.js'

import Yonghodang from './Yonghodang.js';

export default class World {
    constructor(name)
    { 
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        switch(name){
            case 'mobile' : 
                this.resources.on('ready', () =>
                {
                    //this.floor = new Floor();
                    //this.fox = new Fox();
                    this.firstScene = new FirstScene();
                    this.environment = new Environment();
                    this.mobile = new Mobile();
                    //this.mobile.moveModel(); //추후 지울것
        
                    this.experience.raycaster.sceneReady = true; //모든게 로드될 시 html 레이캐스팅 가능하게
                });
        
                this.camera.on('show', () =>
                {
                    if(this.mobile)
                    {
                    // this.mobile.update()
        
                        if(this.mobile.group.position.y > 0 )
                        {
                            this.mobile.moveModel();
                        }else{
                            return;
                        }
                    }
        
                    console.log(this.experience.raycaster.sceneReady);
                });

                break; 

            case 'yonghodang' : 
                this.resources.on('ready', () =>
                {
                    //this.floor = new Floor();
                    //this.fox = new Fox();
                    this.yonghodang = new Yonghodang();
        
                    this.experience.raycaster.sceneReady = true; //모든게 로드될 시 html 레이캐스팅 가능하게
                });

                break; 
        }
       
    }

    update()
    {
        // if(this.fox)
        // this.fox.update()   
    }

}