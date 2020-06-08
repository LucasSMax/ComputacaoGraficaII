class Vulcan
{
    constructor()
    {
        this.scene = new BABYLON.Scene(engine);
        this.createBasicObj();
        this.createSkyBox();
        this.createGround();
        this.loadScene();
    }

    getScene()
    {
        return this.scene;
    }

    createBasicObj()
    {
        this.light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);

        this.camera = new BABYLON.ArcRotateCamera("Camera", 0,0,0, BABYLON.Vector3.Zero(), this.scene);
        this.camera.setPosition(new BABYLON.Vector3(10, 10, -10));
        this.camera.attachControl(canvas, true);
    }

    createSkyBox()
    {
        this.skybox = BABYLON.Mesh.CreateBox("skyBox", 5000.0, this.scene);
        this.skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        this.skyboxMaterial.backFaceCulling = false;
        this.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/TropicalSunnyDay", this.scene);
        this.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        this.skyboxMaterial.disableLighting = true;
        this.skybox.material = this.skyboxMaterial;

        this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogColor = new BABYLON.Color3(0.9, 0.5, 0.5);
        this.scene.fogDensity = 0.001;
    }

    createGround()
    {
        this.groundTexture = new BABYLON.Texture("textures/vulcan/vulcan.jpg", this.scene);
        this.groundTexture.vScale = this.groundTexture.uScale = 4.0;

        this.groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        this.groundMaterial.diffuseTexture = this.groundTexture;
        this.groundMaterial.diffuseTexture.uScale = 10;
        this.groundMaterial.diffuseTexture.vScale = 10;

        this.ground = BABYLON.Mesh.CreateGround("ground", 1024, 1024, 32, this.scene, false);
        this.ground.position.y = 0.5;
        this.ground.material = this.groundMaterial;
    }

    loadScene()
    {
        BABYLON.SceneLoader.Append("textures/vulcan/", "vulcao.glb", this.scene, function (scene) {});
        this.lava = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: 5, height: 5}, scene);
        this.lava.position.y = 10.6;
        this.lava.position.x = 2.99;
        this.lava.position.z = 5.49;
        this.lava.rotation.x = Math.PI / 2;
        this.lava.scaling.x = 4.2;
        this.lava.scaling.y = 5;

        this.lavaTexture = new BABYLON.Texture("textures/vulcan/lava1.jpg", this.scene);
        this.groundTexture.vScale = this.groundTexture.uScale = 4.0;

        this.lavaMaterial = new BABYLON.StandardMaterial("lavaMaterial", this.scene);
        this.lavaMaterial.diffuseTexture = this.lavaTexture;
        this.lavaMaterial.diffuseTexture.uScale = 1;
        this.lavaMaterial.diffuseTexture.vScale = 1;

        this.lava.material = this.lavaMaterial;
    }

}