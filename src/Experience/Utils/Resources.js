import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import EventEmitter from "./EventEmitter.js";
import { gsap } from 'gsap';



export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super();


        this.sources = sources; 
        //setup
        this.items = {}
        this.toLoad = this.sources.length; 
        this.loaded = 0; 


        this.setLoadingManager();
        this.setLoaders();
        this.startLoading();

        
    }

    setLoadingManager()
    {
        const overlayGeometry = new THREE.PlaneGeometry(2,2,1,1)
        const overlayMaterial = new THREE.ShaderMaterial({
            transparent : true,
            uniforms:
            {
                uAlpha : {value : 1}
            },
            vertexShader : `
            void main()
            {
                gl_Position = vec4(position,1.0);
            }
            `,
            fragmentShader : `
            uniform float uAlpha;
            void main()
            {
                gl_FragColor = vec4(0.0,0.0,0.0,uAlpha);
            }
            `
        })
        this.overlay = new THREE.Mesh(overlayGeometry,overlayMaterial)
        this.overlay.renderOrder = 1;
      

        const loadingBarElement = document.querySelector('.loading-bar')

         this.loadingManager = new THREE.LoadingManager(
            () =>
            {
                window.setTimeout(()=>
                {
                    gsap.to(overlayMaterial.uniforms.uAlpha,{duration : 3, value : 0})
                    loadingBarElement.classList.add('ended')
                    loadingBarElement.style.transform = ''
                },500)
            },
            (itemUrl,itemsLoaded,itemsTotal) =>
            {
                const progressRatio = itemsLoaded/itemsTotal;
                loadingBarElement.style.transform = `scaleX(${progressRatio})`
            }
        )
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.dracoLoader = new DRACOLoader(this.loadingManager);
        this.loaders.dracoLoader.setDecoderPath('draco/')
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader) // x
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager);
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}
