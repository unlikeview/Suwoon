import * as THREE from 'three'
import Experience from '../Experience.js'

export default class FirstScene
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;


        this.resource = this.resources.items.firstScene;

        this.setModel();
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(3,3,3)
        this.model.rotation.y = (Math.PI/2)
        this.model.position.z = 5;
        this.scene.add(this.model)
        

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }
}