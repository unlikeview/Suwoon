import * as THREE from 'three'
import Experience from "../Experience.js";

export default class Helper
{
    constructor(len)
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;
        this.helper = new THREE.AxesHelper(len);
        //this.scene.add(this.helper);

              //Debug
         if(this.debug.active)
         {
            this.debugFolder = this.debug.ui.addFolder('Helper')
            this.debugFolder.add(this.helper, 'visible').name('helperVisible');
         }

    }
}