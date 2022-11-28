import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 导入fbx
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { Object3D, Sphere, Sprite, Vector3 } from "three";
import { LensflareElement, Lensflare } from 'three/examples/jsm/objects/Lensflare';

// 右上角控制器
const gui = new dat.GUI();

const canvas = document.getElementById('main');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//绘制句柄的准备如下/*renderer*/
var renderer = new THREE.WebGLRenderer({ canvas,antialias: true, alpha: true });
//renderer.shadowMap.enabled = true; //辅助线
renderer.shadowMapSoft = true; //柔和阴影
renderer.physicallyCorrectLights = true;
renderer.setClearColor(0xffffff, 1);
//创建场景和摄像机
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1 ,1000);
camera.position.set(500,0,0);//摄像机位置
camera.lookAt(new THREE.Vector3(0,0,0));//看向远点
scene.add(camera);

const light = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
scene.add( light );
const hemisphereLight = new THREE.HemisphereLight(
  0xffffff,
  0x444444,
  1
);
scene.add(hemisphereLight);

// 创建轨道控制器

const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
/*
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
*/


function change_info(message, title){
  scene.remove(lstmsg);
  var msg = makeTextSprite( message, {"title":title} );
  msg.position.set(70,0,120);
  scene.add(msg);
  lstmsg = msg;
  //console.log(`add${message}`)
}

CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
  if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
    return;
  }

  var context = this;
  var canvas = context.canvas;

  if (typeof maxWidth == 'undefined') {
    maxWidth = (canvas && canvas.width) || 300;
  }
  if (typeof lineHeight == 'undefined') {
    lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
  }

  // 字符分隔为数组
  var arrText = text.split('');
  var line = '';

  context.fillStyle = "green";
  // 调试用，查看画布大小
  context.strokeRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = "black";

  for (var n = 0; n < arrText.length; n++) {
    var testLine = line + arrText[n];
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = arrText[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
};

function makeTextSprite( message, parameters ){
  if ( parameters === undefined ) parameters = {};

  var fontface = parameters.hasOwnProperty("fontface") ? 
    parameters["fontface"] : "Arial";
  fontface="Consolas";
  var title = parameters.hasOwnProperty("title") ? 
    parameters["title"] : config["default_msg"];

  var fontsize = parameters.hasOwnProperty("fontsize") ? 
    parameters["fontsize"] : 24;

  var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
    parameters["borderThickness"] : 4;

  var borderColor = parameters.hasOwnProperty("borderColor") ?
    parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

  var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
    parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

  var lineHeight = parameters.hasOwnProperty("lineHeight") ?
    parameters["lineHeight"] : 25;

  //var canvas = document.createElement('canvas');

  const canvas = document.getElementById('msg');
  var context = canvas.getContext('2d');

  canvas.width = 450;
  // get size data (height depends only on font size)
  context.font = fontsize + "px " + fontface;
  var metrics = context.measureText( message );

  var textWidth = metrics.width;

  // background color
  context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
    + backgroundColor.b + "," + backgroundColor.a + ")";

  context.lineWidth = borderThickness;

  // text color
  context.fillStyle = "rgba(0, 0, 0, 1.0)";

  lines = Math.ceil(textWidth / canvas.width);
  canvas.height = (2+lines)*(lineHeight+2);

  context.font = "Bold " + fontsize + "px " + fontface;
  context.fillText( title, borderThickness, borderThickness+lineHeight);
  context.font = fontsize + "px " + fontface;
  context.wrapText( message, borderThickness, borderThickness+2*lineHeight, canvas.width-2*borderThickness, lineHeight);

  // canvas contents will be used for a texture
  var texture = new THREE.Texture(canvas) 
  texture.needsUpdate = true;

  var spriteMaterial = new THREE.SpriteMaterial( 
    { map: texture} );
  var sprite = new THREE.Sprite( spriteMaterial );
  //console.log(`100x${100*canvas.height/canvas.width}`);
  sprite.scale.set(100,100*canvas.height/canvas.width,1);
  return sprite;	
}

function render() {
  controls.update();

  setTimeout(()=>{
    renderer.render(scene,camera)
  },20)

  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});




var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();

var progress = 0;
var cameraPathIndex = 0;

var cameraCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z),
    new THREE.Vector3(250, 0, 0)
  ],
)      

const point = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);


var rotateFlag = true;

let interactPoint = [];
const interactGeometry1 = new THREE.SphereGeometry( 8, 15, 16 );
const interactMaterial1 = new THREE.MeshPhongMaterial( { color: 0xffff00, opacity:1,transparent:true,emissive:0xffff00} );
const interactMaterial2 = new THREE.MeshPhongMaterial( { color: 0x000000, opacity:1,transparent:true,emissive:0x000000} );

const config = require("./config.json");
var keys = config["keypoint"]
for(var i=0; i <  keys.length; i++){
  const sphere = new THREE.Mesh( interactGeometry1, interactMaterial1 );
  sphere.position.set(keys[i]["pos"]["x"],keys[i]["pos"]["y"],keys[i]["pos"]["z"])
  interactPoint.push(sphere)
}

//console.log(keys);

var lightProgress = 1;
var lightOver = false;

function interactLight(){
  requestAnimationFrame(interactLight);
  for(var i = 0; i < interactPoint.length; i++){
    if(!lightOver){
      interactPoint[i].material.opacity = lightProgress;
      lightProgress -= 0.001;
      if(lightProgress < 0.1){
        lightOver = true;
      }
    }else{
      interactPoint[i].material.opacity = lightProgress
      lightProgress += 0.001;
      if(lightProgress > 0.5){
        lightOver = false;
      }
    }
  }


}

interactLight();


var group = new THREE.Object3D();
var stomach = new THREE.Object3D();

var mesh = new THREE.Mesh();
let rotateObj = new Set();
var rotateOver = false;
// 导入模型
const fbxLoader = new FBXLoader();
const path = require('../../public/stomach.fbx');
const obj1 = fbxLoader.load(
  path,
  function (object) {

    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material.side = THREE.DoubleSide;
      }
    });


    mesh = object.children[0].clone();

    const textureLoader = new THREE.TextureLoader();
    var imgPath = require('../assets/images/1.jpg');
    const textureNormal = textureLoader.load(imgPath,function(){
      renderer.render(scene,camera);
    });
    mesh.material.emissive = new THREE.Color(1, 1, 1);
    mesh.material.emissiveIntensity = 1;
    mesh.material.map = textureNormal;
    mesh.material.emissiveMap = mesh.material.map;
    mesh.position.set(0,0,0);
    mesh.name = 'stomach';

    scene.add(mesh);

    var msg = makeTextSprite( "", {"title":config["default_msg"]} );
    msg.position.set(70,0,120);
    scene.add(msg);
    lstmsg=msg;

    function changePivot(obj){
      let center = new THREE.Vector3();
      obj.geometry.computeBoundingBox();
      obj.geometry.boundingBox.getCenter(center);
      let wrapper = new THREE.Object3D();
      wrapper.position.set(center.x, center.y, center.z);
      obj.position.set(-center.x, -center.y, -center.z);
      wrapper.add(obj);
      scene.add(wrapper);
      return wrapper;
    }

    //加载外部模型成功后，筛选出需要选择的物体，并且存入数组。
    scene.children.forEach(item => {
      if (item.name.includes('stomach') ) {
        rotateObj.add(changePivot(item))
      }
    })


        let group=new THREE.Group();
    function rotateFbx(){

      if (rotateObj) {
        /*
        rotateObj.forEach(item => {

          item.rotation.y += 0.005;
          if(item.rotation.y > Math.PI*2){
            item.rotation.y = 0;
          }

        })
        */
        for(var x of rotateObj){
          group.add(x);
        }

          group.rotation.y += 0.005;
          if(group.rotation.y > Math.PI*2){
            group.rotation.y = 0;
          }
        scene.add(group);
      }

    }


    function rotateStop(){

      if(!rotateFlag){
        if (rotateObj) {
          rotateObj.forEach(item => {
            if(group.rotation.y <= Math.PI*2){
              group.rotation.y+=0.1;
            }else{
              rotateOver = true;
              for(var i = 0; i < interactPoint.length; i++){
                scene.add(interactPoint[i]);
              }
            }
          })

        }

      }

    }

    function move(){
      requestAnimationFrame(move);
      if(rotateFlag) rotateFbx();
      if(!rotateOver)rotateStop();
    }

    move();

    function click(event){
      pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera( pointer, camera );

      // calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects(scene.children);

      if(intersects.length > 0){

        rotateFlag = false;

        for(let i=0; i < interactPoint.length; i++){
          let flag=false;
          for(let j=0;j < intersects.length; j++)
            if(intersects[j].object == interactPoint[i]){
              console.log("Geting information of " + i );
              change_info(keys[i]["desc"],keys[i]["name"])
              flag=true;
              break;
            }
          if(flag){
            interactPoint[i].material = interactMaterial2;
            //console.log(`rotateObj=${typeof rotateObj}`)
            rotateObj.add(interactPoint[i])
            for(let j=0;j<interactPoint.length; j++)if(j!=i){
              interactPoint[j].material = interactMaterial1;
              if(rotateObj.has(interactPoint[j])){
                //console.log(`${j} GG`)
                rotateObj.delete(interactPoint[j]);
              }
            }

          }
        }
      }

    }

    window.addEventListener('click', click);
    window.requestAnimationFrame(click);

  }
)

function cameraMove(){

  // if(progress >= 0.5){
  // 	// const pointBox = new THREE.Vector3(point.x * (progress - 0.0005*10), point.y* (progress - 0.0005*10), point.z* (progress - 0.0005*10));
  // 	// camera.position.set(pointBox.x, pointBox.y, pointBox.z);
  // 	// progress -= 0.0005*10;


  // }
  if (cameraPathIndex < 500) {
    requestAnimationFrame(cameraMove);     
    cameraPathIndex += 5;
  }
  const curveIndex = cameraPathIndex / 1000;

  //取相机路径上当前点的坐标
  const tmpCameraPosition = new Vector3(cameraCurve.getPointAt(curveIndex).x, cameraCurve.getPointAt(curveIndex).y, cameraCurve.getPointAt(curveIndex).z) //curveIndex取值0~1
  //设置相机坐标为在相机路径上当前点的位置
  camera.position.set(
    tmpCameraPosition.x,
    tmpCameraPosition.y,
    tmpCameraPosition.z
  )
  controls.enabled = false;

  camera.lookAt(new THREE.Vector3(0, 0, 0)) //相机看向原点

}
var lstmsg;

var buttonFunction = new function(){
  this.cameraInit = function(){
    function cameraInitFunction(){
      if(cameraPathIndex > 0){
        requestAnimationFrame(cameraInitFunction);
        cameraPathIndex -=5;
      }
      const curveIndex = cameraPathIndex / 1000;

      const tmpCameraPosition = new Vector3(cameraCurve.getPointAt(curveIndex).x, cameraCurve.getPointAt(curveIndex).y, cameraCurve.getPointAt(curveIndex).z) //curveIndex取值0~1
      //设置相机坐标为在相机路径上当前点的位置
      camera.position.set(
        tmpCameraPosition.x,
        tmpCameraPosition.y,
        tmpCameraPosition.z
      )
      controls.enabled = true;
      rotateFlag = true;   
    }
    rotateOver = false;
    for(var i = 0; i < interactPoint.length; i++)
      if(interactPoint[i].material==interactMaterial1)
        scene.remove(interactPoint[i]);

    //change_info("","")
    cameraInitFunction();

  }
}

gui.add(buttonFunction, 'cameraInit').name("返回预览");

function clickOn(event){
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera( pointer, camera );

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children);

  if(intersects.length > 0){
    // console.log(intersects, 'intersects');
    cameraMove();
    // console.log(mesh.name);
    // console.log(group);
    // console.log(rotateObj[0].name);
  }
}

window.addEventListener('click', clickOn);
window.requestAnimationFrame(clickOn);
