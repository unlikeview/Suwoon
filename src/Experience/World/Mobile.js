import * as THREE from 'three'
import Experience from '../Experience.js'
import { gsap } from 'gsap';

export default class Mobile
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Mobile');
        }

        this.resource = this.resources.items.mobileBone;

        this.setModel();
        //this.setAnimation();
    }

    setModel()
    {
        this.model = this.resource.scene
        // this.model.scale.set(10,10,10)
        
        this.group = new THREE.Group();

        this.group.add(this.model)
        
        // this.model.position.y = 5;
        // this.model.rotation.y = -(Math.PI/2)

        this.scene.add(this.group)
        this.group.scale.set(8,8,8);
        this.group.position.set(0,5,0);
        this.group.rotation.y = -(Math.PI/2)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
             
            }
        })
    }

    moveModel()
    {
        gsap.to(this.group.position,{
            y : 0,
            duration:2
        });
    }

    stopModel()
    {
        this.animation.actions.current.stop()
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.actions = {}

        this.animation.actions.hanging = this.animation.mixer.clipAction(this.resource.animations[0])

        this.animation.actions.current = this.animation.actions.hanging;
        this.animation.actions.current.play()
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001);
    }
}