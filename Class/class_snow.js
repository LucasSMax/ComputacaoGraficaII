class Snow
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
        this.camera.setPosition(new BABYLON.Vector3(10, 150, -50));
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
        this.scene.fogColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        this.scene.fogDensity = 0.001;
    }

    createGround()
    {
        this.groundTexture = new BABYLON.Texture("textures/snow/snow.jpg", this.scene);
        this.groundTexture.vScale = this.groundTexture.uScale = 4.0;

        this.groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        this.groundMaterial.diffuseTexture = this.groundTexture;
        this.groundMaterial.diffuseTexture.uScale = 4;
        this.groundMaterial.diffuseTexture.vScale = 4;

        this.ground = BABYLON.Mesh.CreateGround("ground", 1024, 1024, 32, this.scene, false);
        this.ground.position.y = 0.5;
        this.ground.material = this.groundMaterial;
    }

    loadScene()
    {
        BABYLON.SceneLoader.Append("textures/snow/", "snow.glb", this.scene, function (scene) {});
    }

}