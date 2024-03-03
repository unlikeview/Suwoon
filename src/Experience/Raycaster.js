import EventEmitter from "./Utils/EventEmitter.js";
import * as THREE from 'three'
import Experience from "./Experience.js";
import { gsap } from 'gsap';

export default class Raycaster
{

    constructor()
    {
        this.experience = new Experience();
        this.helper = this.experience.helper;
        // //모델 정의
        // this.mobileModel = this.experience.world.mobile
        this.mouse = new THREE.Vector2();

        this.world = this.experience.world; 
        
        this.sceneReady = false;

    }

    hoverRay(e)
    {
        this.pointer = this.experience.raycaster.mouse
        this.pointer.x = (e.clientX / window.innerWidth) *2 -1;
        this.pointer.y = -(e.clientY/window.innerHeight) * 2 + 1;
        this.raycaster = new THREE.Raycaster();
        this.raycaster.setFromCamera(this.pointer, this.experience.camera.instance);

       // const objectToTest = [object1,object2,object3]
        this.currentIntersect = null;

        const intersects = this.raycaster.intersectObjects(this.experience.scene.children);
        
        if(intersects.length)
        {
            if(!currentIntersect)
            {
            // console.log('mouse enter')
            }
            currentIntersect = intersects[0]

            if(currentIntersect)
            {
                //console.log(this.currentIntersect)
                switch(currentIntersect.object.name)
                {
                   
                    case "가은님씬_1":
                        console.log('가은님1')

                        

                        let tempMaterial = new THREE.ShaderMaterial({
                            vertexShader:`
                                void main()
                                {
                                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                                }
                            `,
                            fragmentShader: `
                                void main()
                                {
                                    gl_FragColor = vec4(0.0,0.0,1.0,1.0);
                                }
                            `
                        })
                        this.currentIntersect.object.material = tempMaterial;
                        break;
    
                    case "정현님씬_1":
                        console.log('정현님1')
                        console.log(this.currentIntersect.object.position)
                        var vector = new THREE.Vector3();
                        vector.set(this.currentIntersect.object.position.x,this.currentIntersect.object.position.y,this.currentIntersect.object.position.z);
                        vector.project(this.experience.camera.instance);

                        var widthHalf = window.innerWidth/2;
                        var heightHalf = window.innerHeight/2;
                        this.result = {
                            x : (vector.x * widthHalf) + widthHalf,
                            y : (vector.y * heightHalf) + heightHalf
                        }

                        console.log("Mesh Position on screen", this.result);


                        let tempMaterial2 = new THREE.ShaderMaterial({
                            vertexShader:`
                                void main()
                                {
                                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                                }
                            `,
                            fragmentShader: `
                                void main()
                                {
                                    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
                                }
                            `
                        })
                        this.currentIntersect.object.material = tempMaterial2;
                        break;
    
                    case "용호당씬_1":
                        console.log('제 씬1입니다')
                        

                        let tempMaterial3 = new THREE.ShaderMaterial({
                            vertexShader:`
                                void main()
                                {
                                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                                }
                            `,
                            fragmentShader: `
                                void main()
                                {
                                    gl_FragColor = vec4(0.0,1.0,0.0,1.0);
                                }
                            `
                        })
                        this.currentIntersect.object.material = tempMaterial3;
                        break;
                }
            }

        }
        else
        {
            if(currentIntersect)
            {
                console.log('mouse leave')           
            }
            currentIntersect = null;
        }
    }

    clickRay(e)
    {
      // console.log(this.currentIntersect.object);

        if(this.currentIntersect)
        {
            switch(this.currentIntersect.object.name)
            {
               
                case "가은님씬_1":
                    console.log(this.currentIntersect.object.position)
                    console.log(this.currentIntersect.object.rotation)
                    console.log(this.experience.camera.instance.position)
                    console.log('가은님씬으로 이동합니다')
                    break;

                case "정현님씬_1":
                    console.log(this.currentIntersect.object.position)
                    console.log(this.currentIntersect.object.rotation)
                    console.log('정현님씬으로 이동합니다')
                    break;

                case "용호당씬_1":
                    console.log(this.currentIntersect.object.position)
                    console.log(this.currentIntersect.object.rotation)
                    console.log(this.currentIntersect.object)
                    
                    this.experience.destroy();
                    this.experience.newSetup();

                    console.log('제 씬입니다')
                    break;
            }
        }
    
    }
    
     /**
     * Points of interest
     */
  //0.04765403918373032, y: -0.8122366234204671, z: 0.16828364165242643
    points = [
        {
            
            position: new THREE.Vector3(0,0,0),
            element: document.querySelector('.point-0')
        }
    ]


    update() //되는거 확인함
    {
     if(this.sceneReady)
     {
        if(this.mobileModel)
        {
         console.log('yes');
        }
 
         //point 순회
         for(const point of this.points)
         {
            const raycaster = new THREE.Raycaster();
            const screenPosition = point.position.clone()
            screenPosition.project(this.experience.camera.instance)
            raycaster.setFromCamera(screenPosition,this.experience.camera.instance)
            const intersects = raycaster.intersectObjects(this.experience.scene.children, true)
 
            if(intersects.length === 0)
            {
              point.element.classList.add('visible');
            }
            else
            {
              const intersectionDistance = intersects[0].distance + 0.5 // 임의값으로 distance 조절함
              const pointDistance = point.position.distanceTo(this.experience.camera.instance.position)
              //console.log(intersectionDistance);
              //point.element.classList.add('visible');
              if(intersectionDistance < pointDistance)
              {
                 point.element.classList.remove('visible');
              }
              else
              {
                 point.element.classList.add('visible');
              }
            }
 
            const translateX = screenPosition.x * this.experience.sizes.width*0.5
            const translateY = - screenPosition.y * this.experience.sizes.height*0.5
            point.element.style.transform = `translateX(${translateX}px) translate(${translateY}px)`
            //console.log(this.experience.sizes.width)
         }
     }
    }
}
