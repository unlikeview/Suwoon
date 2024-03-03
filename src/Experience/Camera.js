import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls.js'
import Experience from './Experience.js'
import EventEmitter from "./Utils/EventEmitter.js";

export default class Camera extends EventEmitter
{
    constructor()
    {
         super();

        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.debug = this.experience.debug;


        this.mouse = 3;
        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

        this.speed = 0;
        this.position = 0;
        this.rounded = null;
        this.dir = null;

        window.addEventListener('wheel', (e) => {
            this.dir = Math.sign(e.deltaY);
            this.speed += e.deltaY*0.0008;

        })

        this.setInstance();
        this.setOrbitControls();
        //this.setFirstPersonControls();
        //this.scroll();
    }
    

    setInstance()
    {
        this.camViewDistance = 
        {
            zNear : 0.1,
            zFar : 1000,
            fov : 107
        }
        this.instance = new THREE.PerspectiveCamera( this.camViewDistance.fov, this.sizes.width / this.sizes.height,  this.camViewDistance.zNear,  this.camViewDistance.zFar)
        this.instance.position.set(0,0,5);
        this.scene.add(this.instance);

        if(this.debug.active)
        {
            this.debugFolder.add( this.camViewDistance, 'zNear').min(0).max(10).step(0.001)
            this.debugFolder.add( this.camViewDistance, 'zFar').min(0).max(100).step(0.001)
            this.debugFolder.add( this.camViewDistance, 'fov').min(0).max(150).step(0.1)
        }

        /**
         * mouse
         */
        
     
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance,this.canvas);
        this.controls.autoRotate = false;  // 이걸했는데 왜 중앙 기준으로 계속 돌지...?
        this.controls.enabledDamping = true;
    }

    setFirstPersonControls()
    {
        this.controls = new FirstPersonControls(this.instance,this.canvas);
        //this.controls.movementSpeed = 1;
        this.controls.activeLook = false;
        this.controls.lookSpeed = 0.01;
        this.controls.constrainVertical = true;
    }

    resize()
    {
        this.instance.aspect = this.sizes.width/this.sizes.height
        this.instance.updateProjectionMatrix()
        console.log('resize on the camera')
    }

  
    scroll()
    {
        this.position += this.speed; 
        this.speed *= 0.5;
        this.rounded = Math.round(this.position);
        let diff = (this.rounded - this.position);
        this.position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.001; //  이 부분이 있어야 특정 부분에서 자연스럽게 멈추는 애니메이션 효과를 줄 수 있음
        this.instance.position.z = 10 + this.position;
        //console.log(this.rounded)
        
           //Event 생성
           if(this.rounded <= -9)
           {
               this.trigger('show')  //모빌 등장 신호 
           }

    }

    update()
    {
        //this.controls.update(0.1)
        // this.controls.enableRotate = false; // 오빗컨트롤 막아줌 
        this.scroll();

        this.instance.fov = this.camViewDistance.fov;
        this.instance.near = this.camViewDistance.zNear;
        this.instance.far = this.camViewDistance.zFar;
        this.instance.updateProjectionMatrix();  //카메라 업데이트시 반드시필요 
    }
}