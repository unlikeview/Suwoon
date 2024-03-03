export default 
[
    // Environment Map Textures
    {
        name : 'environmentMapTexture',
        type : 'cubeTexture',
        path :
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ] 
    },
    // World Sphere
    {
        name : 'worldSphereTexture_1',
        type : 'texture',
        path : 'textures/worldSphereTexture/scene_1.jpg'
    },
    {
        name : 'worldSphereTexture_2',
        type : 'texture',
        path : 'textures/worldSphereTexture/scene_2.jpg'
    },

    // Textures 
    {
        name : 'grassColorTexture',
        type : 'texture',
        path : 'textures/dirt/color.jpg'
    },
    {
        name : 'grassNormalTexture',
        type : 'texture',
        path : 'textures/dirt/normal.jpg'
    },

    //Models
    {
        name : 'foxModel',
        type : 'gltfModel',
        path : 'models/Fox/glTF/Fox.gltf'
    },
    {
        name : 'firstScene',
        type : 'gltfModel',
        path : 'models/1stScene/1st_Scene2.glb'
    },
    {
        name : 'mobileBone',
        type : 'gltfModel',
        path : 'models/Mobile/mobile_0301.glb' 
    },
]