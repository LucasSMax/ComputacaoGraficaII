class Earth
{
    constructor()
    {
        this.scene = new BABYLON.Scene(engine);
        this.createBasicObj();
        this.createWater();
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
        this.camera.setPosition(new BABYLON.Vector3(10, 150, -30));
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
        this.waterMaterial.addToRenderList(this.skybox);
    }

    createWater()
    {
        this.waterMaterial = new BABYLON.WaterMaterial("waterMaterial", this.scene, new BABYLON.Vector2(512, 512));
        this.waterMaterial.bumpTexture = new BABYLON.Texture("textures/waterbump.png", this.scene);
        this.waterMaterial.windForce = 10;
        this.waterMaterial.waveHeight = 0.1;
        this.waterMaterial.bumpHeight = 0.1;
        this.waterMaterial.waveLength = 0.1;
        this.waterMaterial.waveSpeed = 100.0;
        this.waterMaterial.colorBlendFactor = 0;
        this.waterMaterial.windDirection = new BABYLON.Vector2(1, 1);
        this.waterMaterial.colorBlendFactor = 0;
        this.waterMaterial.waterColor = new BABYLON.Color3(0, 0.4, 0.85);
        this.waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 512, 512, 32, this.scene, false);
        this.waterMesh.material = this.waterMaterial;
    }

    createGround()
    {
        this.groundTexture = new BABYLON.Texture("textures/sand2.jpg", this.scene);
        this.groundTexture.vScale = this.groundTexture.uScale = 4.0;

        this.groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        this.groundMaterial.diffuseTexture = this.groundTexture;
        this.groundMaterial.diffuseTexture.uScale = 100;
        this.groundMaterial.diffuseTexture.vScale = 100;

        this.ground = BABYLON.Mesh.CreateGround("ground", 512, 512, 32, this.scene, false);
        this.ground.position.y = -1;
        this.ground.material = this.groundMaterial;
        this.waterMaterial.addToRenderList(this.ground);
    }

    loadScene()
    {
        BABYLON.SceneLoader.Append("textures/mountain/", "mountain.glb", this.scene, function (scene) {});
    }

}